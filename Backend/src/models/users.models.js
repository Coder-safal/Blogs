
import mongoose, { Schema } from "mongoose"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {

    if (!this.isModified("password")) {
        return next();
    }

    this.password = await bcryptjs.hash(this.password, 10);//password encryption
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcryptjs.compare(password, this.password);//check password is correct or not
}

userSchema.methods.generateAccessToken = async function () {

    return await jwt.sign(
        {
            _id: this._id,
            userName: this.userName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIERY,
        });
}
userSchema.methods.generateRefreshToken = async function () {

    return await jwt.sign(
        {
            _id: this._id,
            userName: this.userName,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIERY,
        });
}


export const User = mongoose.model("User", userSchema);
