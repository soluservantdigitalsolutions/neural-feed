import axios from "axios";

const API = axios.create({
  baseURL: "https://neural-feed-backend-2yg8.onrender.com/api",
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

export const getFeed = async (id) => {
  const response = await API.get(`/upload/feeds/${id}`);
  return response.data.singleFeed;
};

export const getRandomFeeds = async () => {
  const response = await API.get("/upload/random");
  return response.data.randomFeeds;
};

export const getFeedOwnerData = async (id) => {
  const response = await API.get(`/users/${id}`);
  return response.data.user;
};

export const getFeedOwner = async (userId) => {
  const response = await API.get(`/upload/feeder/${userId}`);
  return response.data.feedOwner.admissions;
};

export const updateAttendance = async (id) => {
  const response = await API.put(
    `/upload/feeds/attendances/${id}`,
    {},
    { withCredentials: true }
  );
  return response.data;
};

export const enrollUser = async (userId) => {
  const response = await API.put(
    `/users/enroll/${userId}`,
    {},
    { withCredentials: true }
  );
  return response.data;
};

export const dropoutUser = async (userId) => {
  const response = await API.put(
    `/users/dropout/${userId}`,
    {},
    { withCredentials: true }
  );
  return response.data;
};

export const submitAnswer = async (selectedOption, feedId) => {
  const response = await API.post(
    "/upload/updateComprehensionAndHats",
    { selectedOption, feedId },
    { withCredentials: true }
  );
  return response.data;
};