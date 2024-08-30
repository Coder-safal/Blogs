import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Upload an image
const uploadOncloudinary = async function (localpath) {
    try {
        if (!localpath) {
            return null;
        }
        const uploadResult = await cloudinary.uploader
            .upload(localpath,
                {
                    resource_type: "image",
                }
            )
        console.log("File is uploded in cloudinary succesfully:  ", uploadResult.url)

        // fs.unlinkSync(localpath);
        return uploadResult.url;
    } catch (error) {
        fs.unlinkSync(localpath);
        throw error;
    }
}


export { uploadOncloudinary };

