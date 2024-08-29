
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
        }
    },
    {
        timestamps: true,
    })