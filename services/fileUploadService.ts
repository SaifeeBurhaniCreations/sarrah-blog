export const FileUploadService = {
  uploadImage: async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Simulate network upload delay
      setTimeout(() => {
        if (!file) {
          reject("No file provided");
          return;
        }

        // Create a fake URL for the uploaded file
        // In a real app, this would be an S3 or Cloudinary URL returned from backend
        const objectUrl = URL.createObjectURL(file);
        console.log(`FileUploadService: Uploaded ${file.name}, generated URL: ${objectUrl}`);
        resolve(objectUrl);
      }, 1500);
    });
  }
};