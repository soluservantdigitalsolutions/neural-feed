import axios from "axios";

export const enrollUser = async (userId) => {
  try {
    const response = await axios.put(
      `https://neural-feed-backend.onrender.com/api/users/enroll/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
