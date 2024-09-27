import mongoose, { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { Comment } from "../models/comments.models.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { BlogPost } from "../models/blogsPost.models.js";
// import { User } from "../models/users.models";

// const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const postComment = asyncHandler(async (req, res, next) => {

    const { postId } = req.params;
    const { description } = req.body;

    if (!postId || !mongoose.isValidObjectId(postId)) {
        throw new ApiError(401, "Invalid postId");
    }

    if (!req.user?._id) {
        throw new ApiError(401, "you aren't authorized users!");
    }

    if (!description) {
        throw new ApiError(401, "Description is required fields!");
    }

    const commentPost = await Comment.create({
        user: new mongoose.Types.ObjectId(req.user?._id),
        description: description,
        post: new mongoose.Types.ObjectId(postId),
    });

    if (!commentPost) {
        throw new ApiError(500, "Internal errors on database while creating comments!")
    }

    const post = await BlogPost.findByIdAndUpdate(
        postId,
        {
            $push: {
                comments: commentPost?._id,
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
            $push: {
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

    if (!postId || !isValidObjectId(postId)) {
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
                from: "comments",
                localField: "comments",
                foreignField: "_id",
                as: "AllComments",
                pipeline: [
                    {
                        $lookup:
                        {
                            from: "users",
                            localField: 'user',
                            foreignField: "_id",
                            as: "users",
                            pipeline: [
                                {
                                    $project: {
                                        userName: 1,
                                        fullName: 1,
                                        email: 1,
                                        _id: 0,
                                        avatar: 1,
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            users: { $arrayElemAt: ["$users", 0] }

                        }
                    },
                    {
                        $project: {
                            user: 0,
                            _id: 0,
                            post: 0,
                            likes: 0,

                        }
                    }
                ],

            }
        },
        // {
        //     $addFields: {
        //         totalComments: { $size: +"$AllComments" } //to count total comments
        //     }
        // }

    ]);


    console.log("All comments: ", allComments);

    if (!allComments) {
        throw new ApiError(500, "Internal errors")
    }

    return res.status(200).json(
        new ApiResponse(200, allComments[0].AllComments, "All comments fetch succesfully!")
    );

});

const countpostComments = asyncHandler(async (req, res) => {

    const { postId } = req.params;


    if (!postId || !isValidObjectId(postId)) {
        throw new ApiError(401, "Invalid post Id");
    }


    const totalComments = await Comment.find({ post: postId });

    if (!totalComments) {
        throw new ApiError(401, "There is no comments");
    }


    return res.status(200).json(
        new ApiResponse(200, {
            totalComments: totalComments.length,
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