import axios from 'axios';

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'Somnath21');
  formData.append('cloud_name', 'dsf35gixc');

  try {
    const { data } = await axios.post(
      'https://api.cloudinary.com/v1_1/dsf35gixc/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
      
    return { url: data?.secure_url };
  } catch (error) {
    console.log('Error on upload:', error);
  }
};

