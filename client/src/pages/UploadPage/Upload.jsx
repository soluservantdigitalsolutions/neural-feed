import { useEffect } from "react";
import Dropzone from "../../components/DropZone/Dropzone";
import SubmitBtn from "../../components/SubmitButton/SubmitBtn";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import { useState } from "react";
import axios from "axios";
import UploadVideo from "../../utils/upload";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useSelector } from "react-redux";
const Upload = () => {
  const [caption, setCaption] = useState("");
  const [test, setTest] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [answer, setAnswer] = useState("");
  const [success, setSuccess] = useState("");
  const [options, setOptions] = useState({
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
  });
  const [feedPreview, setFeedPreview] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const userData = currentUser.user;
  console.log("Upload.CurrentUser", userData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(options);
  }, [options]);

  useEffect(() => {
    // Revoke the old feed preview Blob URL
    return () => URL.revokeObjectURL(feedPreview);
  }, [feedPreview]);

  const navigate = useNavigate();

  console.log(videoFile);
  console.log(caption);
  console.log(test);

  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();
    const url = await UploadVideo(videoFile);
    setFeedPreview(url);

    try {
      await axios.post(
        "https://neural-feed-backend.onrender.comapi/upload/feeds",
        {
          userId: userData._id,
          username: userData.username,
          profileImage: userData.profileImage,
          video: url,
          caption: caption,
          test: test,
          answer: answer,
          options: {
            A: options.optionA,
            B: options.optionB,
            C: options.optionC,
            D: options.optionD,
          },
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setSuccess("Video Uploaded Sucessfully");
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <BarLoader
          width={100}
          height={25}
          color="#38a169"
        />
      </div>
    );

  return (
    <div
      className="  MainFormCard border p-5 rounded flex justify-center  flex-col gap-2.5 shadow-xl m-5 "
      style={
        {
          // position: 'absolute',
          // top: '50%',
          // left: '50%',
          // transform: 'translate(-50%, -50%)',
        }
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="UploadTitle ">
          <h1 className="text-xl font-bold">Upload Your Neural Feed</h1>
        </div>
        <div className="UploadVideoDiv flex flex-col lg:flex-row gap-5">
          <div className="VideoDropZoneDiv flex   ">
            {feedPreview ? (
              <>
                <video
                  src={feedPreview}
                  className=" rounded transition  h-full flex self-center justify-center items-center"
                  controls
                ></video>
              </>
            ) : (
              <>
                <Dropzone
                  onChange={(e) => {
                    const file = e.target.files[0];
                    console.log(setVideoFile(file));
                    setFeedPreview(URL.createObjectURL(file));
                  }}
                />
              </>
            )}
          </div>
          <div className="VideoUploadDetailsDiv w-full flex flex-col gap-5">
            <div className="captionDiv">
              <h1 className="Caption font-semibold">Caption</h1>
              <input
                type="text"
                name="caption"
                id=""
                onChange={(e) => setCaption(e.target.value)}
                className="  outline-none border rounded p-3 w-full"
              />
            </div>
            <div className="captionDiv">
              <h1 className="Caption font-semibold">Test</h1>
              <input
                type="text"
                name="test"
                id=""
                onChange={(e) => setTest(e.target.value)}
                className="  outline-none border rounded p-3 w-full"
              />
            </div>
            <div className="captionDiv">
              <h1 className="Caption font-semibold">Answer</h1>
              <input
                type="text"
                name="answer"
                id=""
                onChange={(e) => setAnswer(e.target.value)}
                className="  outline-none border rounded p-3 w-full"
              />
            </div>
            <div className="captionDiv">
              <h1 className="Caption font-semibold">Option A</h1>
              <input
                type="text"
                name="answer"
                id=""
                onChange={(e) =>
                  setOptions({
                    ...options,
                    optionA: e.target.value,
                  })
                }
                className="  outline-none border rounded p-3 w-full"
              />
            </div>
            <div className="captionDiv">
              <h1 className="Caption font-semibold">Option B</h1>
              <input
                type="text"
                name="answer"
                id=""
                onChange={(e) =>
                  setOptions({
                    ...options,
                    optionB: e.target.value,
                  })
                }
                className="  outline-none border rounded p-3 w-full"
              />
            </div>
            <div className="captionDiv">
              <h1 className="Caption font-semibold">Option C</h1>
              <input
                type="text"
                name="answer"
                id=""
                onChange={(e) =>
                  setOptions({
                    ...options,
                    optionC: e.target.value,
                  })
                }
                className="  outline-none border rounded p-3 w-full"
              />
            </div>
            <div className="captionDiv">
              <h1 className="Caption font-semibold">Option D</h1>
              <input
                type="text"
                name="answer"
                id=""
                onChange={(e) =>
                  setOptions({
                    ...options,
                    optionD: e.target.value,
                  })
                }
                className="  outline-none border rounded p-3 w-full"
              />
            </div>
            <div className="ActionButtonsDiv flex gap-2 ">
              {/* <div className="border rounded border-green-600 flex justify-center items-center font-semibold">
              <button className="text-green-600 text-lg p-1">Discard</button>
            </div> */}
              <SecondaryButton SecondaryButtonText="Discard" />
              <SubmitBtn ButtonText="Feed" />
            </div>
          </div>
        </div>
      </form>
      {success && (
        <div className="  bg-green-300 border-2 border-green-500 ">
          {success}
        </div>
      )}
    </div>
  );
};

export default Upload;
