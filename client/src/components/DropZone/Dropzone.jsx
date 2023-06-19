import React from "react";
import { RiVideoUploadFill } from "react-icons/ri";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import "./DropZone.css";

const Dropzone = () => {
  return (
    <div className="UploadCardSpaceDiv border-dashed border-green-600 bg-slate-100 cursor-pointer hover:bg-green-100 transition flex flex-col justify-center text-center p-5 border">
      <div className="UploadIconDiv flex flex-col justify-center items-center text-center">
        <RiVideoUploadFill className="text-5xl text-center " />
        <h1>Click to Upload</h1>
      </div>
      {/* <div className="InstructionalDiv">
        <p>Or Drag and Drop your Video File</p>
      </div> */}
      <div className="flex justify-center">
        <div className="UploadButtonDiv flex justify-center items-center">
          <input
            type="file"
            name=""
            id=""
            className=" inputfile file:bg-green-600 file:rounded file:border-none  text-center file:justify-center file:items-center"
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
