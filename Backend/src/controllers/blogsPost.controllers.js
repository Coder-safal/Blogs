import { asyncHandler } from "../utils/AsyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { BlogPost } from "../models/blogsPost.models.js";
import mongoose, { isValidObjectId, Mongoose } from "mongoose";
import { Like } from "../models/likes.models.js";
import { Comment } from "../models/comments.models.js";

const uploadPost = asyncHandler(async (req, res) => {

    const { title, content } = req.body;

    if (!title || !content) {
        throw new ApiError(401, "Title and content is required fields");
    }

    if (!req.user) {
        throw new ApiError(401, "you aren't authorized users!");
    }

    const postCreate = await BlogPost.create({
        title,
        content,
        author: new mongoose.Types.ObjectId(req.user?._id),
    })

    if (!postCreate) {
        throw new ApiError(500, "Internal errors while upload on database!");
    }


    const postResponse = await BlogPost.aggregate([
        {
            $match: {
                _id: postCreate?._id,
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author",
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            userName: 1,
                            email: 1,
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                author: { $arrayElemAt: ["$author", 0] }
            }
        },
        {
            $project: {
                comments: 0,
            }
        }
    ]);

    // console.log(postResponse);

    return res.status(201)
        .json(new ApiResponse(
            201,
            postResponse[0],
            "blogs Upload succesfully!")
        );

});


const deletePost = asyncHandler(async (req, res) => {

    const { postId } = req.params;


    if (!postId || !isValidObjectId(postId)) {
        throw new ApiError(
            401,
            "Invalid postId",
        );
    }


    if (!req.user?._id) {

        throw new ApiError(
            401,
            "you aren't authorized users to delete this post",
        );
    }

    const resComment = await Comment.deleteMany({ post: postId });

    const resLike = await Like.deleteMany({ post: postId });

    console.log("resComment: ",resComment);
    console.log("resLike: ",resLike);

    const deletePost = await BlogPost.findByIdAndDelete(postId).select("-author -comment -_id")

    if (!deletePost) {
        throw new ApiError(
            401,
            "can't delete!",
        )
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            deletePost,
            "Post deleted succesfully!",
        )
    )


});

const updatePost = asyncHandler(async (req, res) => {

    const { postId } = req.params;
    const { title, description } = req.body;


    if (!postId || !isValidObjectId(postId)) {
        throw new ApiError(
            400,
            "Invalid postId",
        )
    }

    if (!req.user) {
        throw new ApiError(
            401,
            "you are not authorized users!",
        );
    }

    if (!title || !description) {
        throw new ApiError(
            401,
            "title and decription fields is required fields",
        );

    }

    const postUpdate = await BlogPost.findByIdAndUpdate(
        postId,
        {
            $set: {
                title,
                content: description,
            }
        },
        {
            new: true,
        }
    );


    if (!postUpdate) {
        throw new ApiError(
            401,
            "post can't update this post isn't exists!",
        );
    }


    return res.status(200).json(
        new ApiResponse(
            200,
            postUpdate,
            "post update succesfully!",
        )
    );

});

const getAllPost = asyncHandler(async (req, res) => {

    try {
        const posts = await BlogPost.find()
            .populate({
                path: 'author',
                select: "-password -refreshToken"
            })
            .exec();


        return res.status(200).json(
            new ApiResponse(200, posts, "All post fetch succesfully!")
        );
    } catch (error) {
        throw new ApiError(500, "Internal server Errors!!");
    }

})

export {
    uploadPost,
    deletePost,
    updatePost,
    getAllPost
}