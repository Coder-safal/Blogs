
import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
    {
        post: {
            type: Schema.Types.ObjectId,
            ref: "BlogPost",
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        },
    },
    {
        timestamps: true,
    },
)