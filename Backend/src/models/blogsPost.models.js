
import mongoose, { Schema } from "mongoose";

const blogPostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        likes: {
            type: Schema.Types.ObjectId,
            ref: "Like",
        },
        comment: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            }
        ],
    },
    {
        timestamps: true,
    }
);


export const BlogPost = mongoose.model("BlogPost", blogPostSchema);