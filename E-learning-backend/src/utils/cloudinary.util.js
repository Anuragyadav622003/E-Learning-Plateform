import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises'; 

cloudinary.config({
  cloud_name: "djmfydkpl",
  api_key: 857628151944543,
  api_secret: "ueuznKHnYNSpsrRvwJsF7AP_hZY"
});

const uploadOnCloud = async (file_path) => {
  try {
    if (!file_path) return null;

   
    const response = await cloudinary.uploader.upload(file_path, { resource_type: 'auto' });
    // console.log("File is uploaded on Cloudinary");

    // Remove the file using fs.promises.unlink
    await fs.unlink(file_path);
    return response;

  } catch (error) {
    console.error('Failed to upload file to Cloudinary:', error);

    // Attempt to delete the file even if the upload fails
    try {
      await fs.unlink(file_path);
    } catch (unlinkError) {
      console.error('Failed to delete the file:', unlinkError);
    }
    
    return null;
  }
};
export {uploadOnCloud};