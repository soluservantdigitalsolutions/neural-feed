import React from "react";
import Dropzone from "../../components/DropZone/Dropzone";
import FormInput from "../../components/formInput/FormInput";
import SubmitBtn from "../../components/SubmitButton/SubmitBtn";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import { useState } from "react";
import axios from "axios";
import UploadVideo from "../../utils/upload";

const Upload = () => {
  const [caption, setCaption] = useState("");
  const [test, setTest] = useState("");
  const [videoFile, setVideoFile] = useState("");
  console.log(videoFile);
  console.log(caption);
  console.log(test);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await UploadVideo(videoFile);

    try {
      await axios.post(
        "http://localhost:3000/api/upload/feeds",
        {
          video: url,
          caption: caption,
          test: test,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

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
        <div className="UploadVideoDiv flex gap-5">
          <div className="VideoDropZoneDiv">
            <Dropzone
              onChange={(e) => {
                console.log(setVideoFile(e.target.files[0]));
              }}
            />
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
                name="Test"
                id=""
                onChange={(e) => setTest(e.target.value)}
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
    </div>
  );
};

export default Upload;
