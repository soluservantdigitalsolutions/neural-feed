import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { richTextEditorModules } from "../../utils/modules";

const NoteUpload = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
    },
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", tags);
    formData.append("image", image);

    try {
      await axios.post(
        "http://localhost:3000/api/notes/create-note",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <BarLoader width={100} height={25} color="#38a169" />
      </div>
    );

  return (
    <div className="MainFormCard border p-5 rounded flex justify-center flex-col gap-2.5 shadow-xl m-5">
      <form onSubmit={handleSubmit}>
        <div className="UploadTitle">
          <h1 className="text-xl font-bold">Upload Your Note</h1>
        </div>
        <div className="UploadDetailsDiv w-full flex flex-col gap-5">
          <div className="captionDiv">
            <h1 className="Caption font-semibold">Title</h1>
            <input
              type="text"
              name="title"
              id=""
              onChange={(e) => setTitle(e.target.value)}
              className="outline-none border rounded p-3 w-full"
            />
          </div>
          <div className="captionDiv ">
            <h1 className="Caption font-semibold">Content</h1>
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={richTextEditorModules} // Pass the custom modules to ReactQuill
              className="outline-none h-screen  rounded p-3 w-full"
            />
          </div>
          <div className="captionDiv mt-20">
            <h1 className="Caption font-semibold">Tags</h1>
            <input
              type="text"
              name="tags"
              id=""
              onChange={(e) => setTags(e.target.value)}
              className="outline-none border rounded p-3 w-full"
            />
          </div>
          <div className="captionDiv">
            <h1 className="Caption font-semibold">Image</h1>
            <div
              {...getRootProps()}
              className="dropzone border h-52 flex items-center justify-center"
            >
              <input {...getInputProps()} />

              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </div>
          <div className="ActionButtonsDiv flex gap-2">
            <button
              type="submit"
              className="bg-green-600 text-white rounded-md p-2.5"
            >
              Upload Note
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NoteUpload;
