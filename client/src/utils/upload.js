import axios from "axios";

const UploadVideo = async (video) => {
  const data = new FormData();
  data.append("file", video);
  data.append("upload_preset", "neural-feed");
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/ddhdyuktu/upload",
      data
    );
    const { url } = res.data;
    return url;
  } catch (error) {
    console.log(error);
  }
};

export default UploadVideo;
