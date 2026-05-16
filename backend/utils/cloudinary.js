import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const uploadToCloudinary = async (fileBuffer, fileName) => {

    const sanitizedName = fileName.replace(/[^a-zA-Z0-9.]/g, "_");

    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'image',
                public_id: `profile_pics/${Date.now()}_${sanitizedName}`,
                folder: 'url-shortener/profile-pics'
            },
            (error, result) => {
                if (error) {
                    reject(`Upload failed: ${error.message}`);
                } else {
                    resolve(result.secure_url);
                }
            }
        );

        stream.end(fileBuffer);
    });
};

export default cloudinary;
