import mongoose, { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.utils";
import { ApiError } from "../utils/ApiError.utils";
import { Comment } from "../models/comments.models";
import { ApiResponse } from "../utils/ApiResponse.utils";
import { BlogPost } from "../models/blogsPost.models";
// import { User } from "../models/users.models";


const postComment = asyncHandler(async (req, res, next) => {

    const { postId } = req.params;
    const { description } = req.body;

    if (!postId || !isValidObjectId(postId)) {
        throw new ApiError(401, "Invalid postId");
    }

    if (!req.user?._id) {
        throw new ApiError(401, "you aren't authorized users!");
    }

    if (!description) {
        throw new ApiError(401, "Description is required fields!");
    }

    const commentPost = await Comment.create({
        user: new mongoose.Types.ObjectId(postId),
        description,
        postId: new mongoose.Types.ObjectId(req.user?._id),
    });

    if (!commentPost) {
        throw new ApiError(500, "Internal errors on database while creating comments!")
    }

    const post = await BlogPost.findByIdAndUpdate(
        postId,
        {
            $push: {
                comment: commentPost?._id,
            }
        },
        { new: true },
    );
    if (!post) {
        throw new ApiError(401, "Error while comment id adding on blogPost!");
    }

    return res.status(201).json(
        new ApiResponse(
            201,
            commentPost,
            "Comment added succesfully!",
        )
    )
});

const deletePostComment = asyncHandler(async (req, res, next) => {

    const { commentId, postId } = req.params;

    if (!commentId || !isValidObjectId(commentId)) {
        throw new ApiError(401, "Invalid comment Id");
    }

    if (!req.user) {
        throw new ApiError(401, "you aren't authorized users!");
    }


    const commentexists = await findOneAndDelete({
        _id: commentId,
        user: req.user?._id,
    });

    if (!commentexists) {
        throw new ApiError(401, "Comment can't delete!");
    }
    const deleteCommentBlogPost = await BlogPost.findByIdAndUpdate(
        postId,
        {
            $pull: {
                comment: commentId,
            }
        },
        {
            new: true,
        }
    )


    if (!deleteCommentBlogPost) {
        throw new ApiError(500, "Comments can't delete  from blogPost!");
    }

    return res.status(200).json(
        new ApiResponse(200,
            commentexists,
            "comments delete succesfully!",
        )
    );

});

const getPostComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;


    if (!postId || isValidObjectId(postId)) {
        throw new ApiError(401, "Invalid post Id");
    }


    const allComments = await BlogPost.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(postId),
            }
        },
        {
            $lookup: {
                from: "Comment",
                localField: "comment",
                foreignField: "_id",
                as: "AllComments",
                pipeline: [
                    {
                        from: "User",
                        localField: "user",
                        foreignField: "_id",
                        as: "users",
                    },
                    {
                        $project: {
                            description: 1,
                            users: 1,
                            likes: 1,
                        }
                    }
                ]
            }
        },

    ]);

    if (!allComments) {
        throw new ApiError(500, "Internal errors")
    }

    return res.status(200).json(
        new ApiResponse(200, allComments, "All comments fetch succesfully!")
    );

});

const countpostComments = asyncHandler(async (req, res) => {

    const { postId } = req.params;


    if (!postId || isValidObjectId(postId)) {
        throw new ApiError(401, "Invalid post Id");
    }


    const totalComments = await Comment.find({ _id: postId });

    if (!totalComments) {
        throw new ApiError(401, "There is no comments");
    }

    return res.status(200).json(
        new ApiResponse(200, {
            totalComments: totalComments.likes,
        },
            "Total Comments Count succesfully!!",
        )
    )

});


export {
    deletePostComment,
    postComment,
    getPostComment,
    countpostComments,
}