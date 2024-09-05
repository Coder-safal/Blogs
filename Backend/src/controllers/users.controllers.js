
import { asyncHandler } from "../utils/AsyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { User } from "../models/users.models.js";
import jwt from "jsonwebtoken";

import { uploadOncloudinary } from "../middlewares/uploadOnCloudinary.js";

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
        console.log(req.cookies);
        const refresh = req.cookies.refreshToken;

        if (!refresh) {
            throw new ApiError(400, "Incorrect refreshToken");
        }

        const refreshToken = await jwt.verify(refresh, process.env.REFRESH_TOKEN_SECRET);

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

    const existUser = await User.findOne({
        $or: [
            // { email },
            { userName },
        ]
    });


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

export {
    registerUsers,
    loginUser,
    verifyJwt,
    changePassword,
    logoutUser,
};