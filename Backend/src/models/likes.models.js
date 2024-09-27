
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
        likeBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true,
    },
)

export const Like = mongoose.model("Like", likeSchema);