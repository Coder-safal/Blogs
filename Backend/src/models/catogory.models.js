
import mongoose, { Schema } from "mongoose";

const catogorySchema = new Schema(
    {
        description: {
            type: String,
            required: true,

        },
        type: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true
    }
);

export const Catogory = mongoose.model("Catogory", catogorySchema);