import axios from "axios";

export const enrollUser = async (userId) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/users/enroll/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
