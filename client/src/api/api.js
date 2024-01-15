import axios from "axios";

const API = axios.create({
  baseURL: "https://neural-feed-backend-2yg8.onrender.comapi",
  withCredentials: true,
});

export const registerUser = async (username, email, password, profileImg) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("profileImage", profileImg);

  const response = await API.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
