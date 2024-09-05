import { asyncHandler } from "../utils/AsyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { BlogPost } from "../models/blogsPost.models.js";
import mongoose, { isValidObjectId, Mongoose } from "mongoose";

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


    return res.status(201)
        .json(new ApiResponse(
            201,
            postCreate,
            "blogs Upload succesfully!")
        );

});


const deletePost = asyncHandler(async (req, res) => {

    const { PostId } = req.params;

    if (!PostId || !isValidObjectId(PostId)) {
        throw new ApiError(
            401,
            "Invalid PostId",
        );
    }


    if (!req.user?._id) {

        throw new ApiError(
            401,
            "you aren't authorized users to delete this post",
        );
    }

    const deletePost = await BlogPost.findByIdAndDelete(PostId);

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
            "post cann't update",
        );
    }


    return res.status(200).json(
        new ApiError(
            200,
            postUpdate,
            "post update succesfully!",
        )
    );

})

export {
    uploadPost,
    deletePost,
    updatePost,
}