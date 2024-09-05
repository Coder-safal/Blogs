import mongoose, { isValidObjectId, mongo } from "mongoose";
import { ApiError } from "../utils/ApiError.utils";
import { asyncHandler } from "../utils/AsyncHandler.utils";
import { Like } from "../models/likes.models.js";
import { ApiResponse } from "../utils/ApiResponse.utils";

const tooglePostLike = asyncHandler(async (req, res) => {

    const { PostId } = req.params;
    if (!req.user) {
        throw new ApiError(401, "You aren't authorized users!");
    }

    if (!PostId || !isValidObjectId(PostId)) {
        throw new ApiError(401, "Invalid postId!");
    }

    const postLikeExists = await Like.findOne({ likeBy: req.user?._id, post: PostId });

    if (postLikeExists) {
        const details = await Like.findByIdAndDelete(postLikeExists?._id);
        return res.status(201).json(
            new ApiResponse(
                201,
                details,
                "video like remove susscesfully",
            )
        );
    }

    const likeDetails = await Like.create({
        post: new mongoose.Types.ObjectId(PostId),
        likeBy: new mongoose.Types.ObjectId(req.user?._id),
    });


    if (!likeDetails) {
        throw new ApiError(500, "Internal error");
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            likeDetails,
            "video like succesfully!",
        )
    );
})

const toogleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!req.user) {
        throw new ApiError(401, "You aren't authorized users!");
    }

    if (!commentId || !isValidObjectId(commentId)) {
        throw new ApiError(401, "Invalid commentId!");
    }


    const commentexists = await Like.findOneAndDelete(
        {
            _id: new mongoose.Types.ObjectId(commentId),
            likeBy: new mongoose.Types.ObjectId(req.user?._id),
        }
    );

    if (!commentexists) {

        const createDetails = await Like.create({
            likeBy: req.user?._id,
            comment: commentId,
        });

        return res.status(201).json(
            new ApiResponse(
                201,
                createDetails,
                "comment like Succesfully"
            )
        );
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            commentexists,
            "comment unlike Succesfully"
        )
    );

})


const countPostLike = asyncHandler(async (req, res) => {

    const { postId } = req.params;

    if (!postId || isValidObjectId(postId)) {
        throw new ApiError(401, "Invalid post Id");
    }

    const totalPostLike = await Like.find({ _id: postId });

    if (!totalPostLike) {
        throw new ApiError(500, "Internal Errors while counting like!");
    }

    return res.status(200).json(
        200,
        {
            totalLike: totalPostLike.length,
        },
        "Post like count succesfully!",
    );
});
const countCommentLike = asyncHandler(async (req, res) => {

    const { commentId } = req.params;

    if (!commentId || isValidObjectId(commentId)) {
        throw new ApiError(401, "Invalid post Id");
    }

    const totalCommentLike = await Like.find({ _id: commentId });

    if (!totalCommentLike) {
        throw new ApiError(500, "Internal Errors while counting like!");
    }

    return res.status(200).json(
        200,
        {
            totalLike: totalCommentLike.length,
        },
        "Comment like count succesfully!",
    );
});

export {
    tooglePostLike,
    toogleCommentLike,
    countPostLike,
    countCommentLike,
}