
import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        post: {
            type: Schema.Types.ObjectId,
            ref: "BlogPost",
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        likes: {
            type: Number,
            default: 0,
        },
        description: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);