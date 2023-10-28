import { RiVideoUploadFill } from "react-icons/ri";

import "./DropZone.css";

const Dropzone = ({onChange}) => {
  return (
    <div className="UploadCardSpaceDiv w-full h-full border-dashed border-green-600 bg-slate-100 cursor-pointer  hover:bg-green-100 transition flex flex-col justify-center text-center p-5 border ">
      <label
        htmlFor="file"
        className=""
      >
        <div className="UploadIconDiv flex flex-col justify-center items-center text-center w-full h-full ">
          <RiVideoUploadFill className="text-5xl text-center " />
          <h1>Click to Upload</h1>
        </div>
        {/* <div className="InstructionalDiv">
        <p>Or Drag and Drop your Video File</p>
      </div> */}
        <div className=" justify-center hidden">
          <div className="UploadButtonDiv flex justify-center items-center">
            <input
              type="file"
              name="file"
              id="file"
              className=" inputfile  file:bg-green-600 file:rounded file:border-none  text-center file:justify-center file:items-center"
              style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
              onChange={onChange}
            />
          </div>
        </div>
      </label>
    </div>
  );
};

export default Dropzone;
