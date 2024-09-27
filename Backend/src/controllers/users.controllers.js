
import { asyncHandler } from "../utils/AsyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { User } from "../models/users.models.js";
import jwt from "jsonwebtoken";
import validator from "email-validator-rfc-5322";

import { uploadOncloudinary, deleteImageOnCloudinary } from "../middlewares/uploadOnCloudinary.js";
import { isValidObjectId } from "mongoose";
import { BlogPost } from "../models/blogsPost.models.js";



const generateAccessRefreshToken = async function (userId) {

    const findUser = await User.findById(userId);

    if (!findUser) {
        throw new ApiError(401, "UserId isn't correct");
    }

    const refreshToken = await findUser.generateRefreshToken();
    const accessToken = await findUser.generateAccessToken();

    if (!refreshToken || !accessToken) {
        throw new ApiError(500, "Something went wrong while generating Access and refresh Token!");
    }

    return { refreshToken, accessToken };
}


const verifyJwt = asyncHandler(async (req, res, next) => {

    try {
        // console.log(req.cookies);

        console.log("req.cookies: ", req.cookies);
        const refresh = req.cookies.refreshToken;

        console.log("refresh Token: ", refresh);

        if (!refresh) {
            throw new ApiError(401, "Incorrect refreshToken");
        }


        const refreshToken = await jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET);
        console.log("RefreshToken Incorrect!!", refreshToken);

        if (!refreshToken) {
            throw new ApiError(400, "Incorrect refreshToken");
        }

        const user = await User.findById(refreshToken?._id);

        if (!user) {
            throw new ApiError(400, "Users can't find!!");
        }

        req.user = user;

        next();
    } catch (error) {
        throw error;
    }
})

const registerUsers = asyncHandler(async (req, res, next) => {

    const { email, fullName, userName, password } = req.body;


    if ([email, fullName, userName, password].some((field) => field?.trim() === "")) {
        throw new ApiError(401, "All email,name,userName,password are required fields!");
    }

    // console.log("isValidEmail: ", validator.validate(email));

    if (!validator.validate(email)) {
        throw new ApiError(401, "Invalid email!");
    }

    const userExists = await User.findOne({
        $or: [
            { email: email },
            { userName: userName }
        ]
    });

    if (userExists) {
        throw new ApiError(401, "Users already exists!");
    }

    const imageAvatar = req.file?.path;

    const avatar = await uploadOncloudinary(imageAvatar);


    const createUser = await User.create({
        fullName,
        userName: userName,
        email: email,
        password: password,
        avatar: avatar || null,
    })

    if (!createUser) {

        throw new ApiError(500, "Users can't created!!");
    }

    const finduser = await User.findById(createUser?._id);
    return res.status(201).json(
        new ApiResponse(
            201,
            finduser,
            "users create succesfully!!",
        )
    )

})


const loginUser = asyncHandler(async (req, res, next) => {

    const { password, userName } = req.body;

    if (/* !(email && userName) */ !userName) {
        throw new ApiError(401, "userName or email is required fields!");
    }

    if (!password) {
        throw new ApiError(401, "Password is required fields!");
    }

    // if(isValidEmail(email)){
    //     throw new ApiError(401,"Invalid email!");
    // }

    const existUser = await User.findOne({
        $or: [
            // { email },
            { userName },
        ]
    });

    // console.log("existUsers: ", existUser);


    if (!existUser) {
        throw new ApiError(401, "users Doesn't exists!");
    }

    const isPasswordcorr = await existUser.isPasswordCorrect(password);

    if (!isPasswordcorr) {
        throw new ApiError(401, "Incorrect password!!");
    }

    // generate Access and Refresh Token
    const { refreshToken, accessToken } = await generateAccessRefreshToken(existUser?._id);

    const user = await User.findByIdAndUpdate(
        existUser?._id,
        {
            $set: {
                refreshToken: refreshToken
            }
        },
        {
            new: true,
        }
    ).select("-password -refreshToken");

    const options = { httpOnly: true, secure: true };
    return res.status(200).
        cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, user, "Login Succesfully!")
        );
});

const logoutUser = asyncHandler(async (req, res, next) => {

    if (!req.user) {
        throw new ApiError(401, "You are not Authorized Users!");
    }

    const refreshToken = req.cookies.refreshToken;

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: null,
            }
        },
        {
            new: true,
        }
    ).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                user,
                "user LogOut succesfully!!",
            )
        );

});

const changePassword = asyncHandler(async (req, res, next) => {

    const { oldpassword, newpassword } = req.body;

    if (!req.user) {
        throw new ApiError(401, "You aren't authorized users to change password!");
    }

    if (!oldpassword || !newpassword) {

        throw new ApiError(401, "Password is required fields!");
    }

    const user = await User.findById(req.user?.id);
    if (!user) {
        throw new ApiError(401, "User doesn't exists!");
    }
    const correctPassword = await user.isPasswordCorrect(oldpassword);

    console.log("Correct Password: ", correctPassword);

    if (!correctPassword) {
        throw new ApiError(401, "Incorrect Password!");
    }
    //  this doesn't tigger pre hooks
    // const updateUser = await User.findOneAndUpdate(
    //     user?._id,
    //     { $set: { password: newpassword } },
    //     { new: true }
    // );

    user.password = newpassword;

    await user.save();

    const updateUser = await User.findById(user._id).select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(200,
            updateUser,
            "update Password Succesfully!!",
        )
    );

});

const checkUserLogin = asyncHandler(async (req, res, next) => {

    if (!req.user) {
        throw new ApiError(401, "You are not login");
    }

    return res.status(202).json(
        new ApiResponse(202, req.user?.userName, "yes you are Login!")
    );

})

const updateAvatar = asyncHandler(async (req, res, next) => {


    if (!req.user && !isValidObjectId(req.user?._id)) {
        throw new ApiError(401, "You aren't valid users to update Avatar!");
    }

    const avatarLocalPath = req.file?.path; //single file path

    // console.log("Hello update avatar Check!!",req?.file.path);
    if (!avatarLocalPath) {
        throw new ApiError(401, "avatar is required Fields!");
    }

    const avatar = await uploadOncloudinary(avatarLocalPath);

    console.log(avatar);
    if (!avatar) {
        throw new ApiError(501, "Errors while uploading on cloudinary!");
    }

    const users = await User.findByIdAndUpdate(req.user?._id,
        {
            $set: {
                avatar,
            }
        },
        {
            new: true,
        }
    ).select("-password -refreshToken");

    if (!users) {
        throw new ApiError(500, "Internal serves Errors while uploding images!");
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            users,
            "Avtar update succesfully!!"
        )
    );

})

const getPublicIdFromUrl = (url) => {
    const parts = url.split('/'); // Split the URL by "/"
    const versionIndex = parts.findIndex(part => part.startsWith('v')); // Find the part that starts with "v"

    // The public_id is everything after the version, without the file extension
    const publicIdWithExtension = parts.slice(versionIndex + 1).join('/');
    const publicId = publicIdWithExtension.split('.').slice(0, -1).join('.');

    return publicId;
};

const deleteAvatar = asyncHandler(async (req, res) => {

    if (!req.user && !isValidObjectId(req.user?._id)) {
        throw new ApiError(401, "Unauthorized users!");
    }

    const users = await User.findById(req.user?._id);

    if (!users) {
        throw new ApiError(401, "User doesn't found");
    }

    if (!users.avatar) {
        throw new ApiError(401, "Avatar is empty to delete!");
    }

    const avatar_public_id = getPublicIdFromUrl(users?.avatar);

    if (!avatar_public_id) {
        throw new ApiError(401, "Public id can't found!");
    }
    const response = await deleteImageOnCloudinary(avatar_public_id);

    if (response.result === 'ok') {
        users.avatar = null;

        await users.save({ validateBeforeSave: false });
    }
    else {
        throw new ApiError(501, "Internal servers errors while images delete from Cloudinary!");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            response,
            "Delete images from cloudinary succesfully!",
        )
    )

});

const getYourAllPost = asyncHandler(async (req, res, next) => {

    if (!req.user) {
        throw new ApiError(401, "You are not authorized users!");
    }

    if (!req.user?._id && !isValidObjectId(req.user?._id)) {
        throw new ApiError(401, "Invalid user Id");
    }


    const allPost = await BlogPost.find({ author: req.user?._id }).populate({
        path: 'comments',
        populate: {
            path: "user",
            select: "-password -refreshToken",
        }
    }).select("-author")

    if (!allPost) {
        throw new ApiError(400, "Not found posts")
    }

    // console.log("allPost: ", allPost);

    return res.status(200).json(
        new ApiResponse(
            200,
            allPost,
            "Your all posts fetch succesfully!",
        )
    );

})


export {
    registerUsers,
    loginUser,
    verifyJwt,
    changePassword,
    logoutUser,
    checkUserLogin,
    updateAvatar,
    deleteAvatar,
    getYourAllPost,

};