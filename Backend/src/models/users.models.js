
import mongoose, { Schema } from "mongoose"

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            index: true,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,//store in cloudinary

        }
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);
