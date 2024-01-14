import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { useDropzone } from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {  richTextEditorModules } from "../../utils/modules";

const NoteUpload = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tests, setTests] = useState([
    { question: "", options: { A: "", B: "", C: "", D: "" }, answer: "" },
  ]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [hasImage, setHasImage] = useState(false);

  const addTest = () => {
    setTests([
      ...tests,
      { question: "", options: { A: "", B: "", C: "", D: "" }, answer: "" },
    ]);
  };

  const updateTest = (index, updatedTest) => {
    const updatedTests = tests.map((test, i) =>
      i === index ? updatedTest : test
    );
    setTests(updatedTests);
  };

  const removeTest = (index) => {
    const newTests = [...tests];
    newTests.splice(index, 1);
    setTests(newTests);
  };
  const navigate = useNavigate();

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setImage(acceptedFiles[0]);
      setPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
      setHasImage(true);
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
    formData.append("tests", JSON.stringify(tests));

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
      navigate("/notes");
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
          {tests.map((test, index) => (
            <div key={index} className="border mt-20 p-5 rounded-md shadow-md">
              <h1
                className={`Caption font-semibold text-center text-2xl text-green-600`}
              >
                Test {index + 1}
              </h1>
              <input
                type="text"
                placeholder="Question..."
                value={test.question}
                onChange={(e) =>
                  updateTest(index, { ...test, question: e.target.value })
                }
                className="  outline-none border rounded p-3 w-full"
              />
              <h1 className={`Caption font-semibold`}>Option A</h1>
              <input
                type="text"
                value={test.options.A}
                onChange={(e) =>
                  updateTest(index, {
                    ...test,
                    options: { ...test.options, A: e.target.value },
                  })
                }
                className="  outline-none border rounded p-3 w-full"
              />
              <h1 className={`Caption font-semibold`}>Option B</h1>
              <input
                type="text"
                value={test.options.B}
                onChange={(e) =>
                  updateTest(index, {
                    ...test,
                    options: { ...test.options, B: e.target.value },
                  })
                }
                className="  outline-none border rounded p-3 w-full"
              />
              <h1 className={`Caption font-semibold`}>Option C</h1>
              <input
                type="text"
                value={test.options.C}
                onChange={(e) =>
                  updateTest(index, {
                    ...test,
                    options: { ...test.options, C: e.target.value },
                  })
                }
                className="  outline-none border rounded p-3 w-full"
              />
              <h1 className={`Caption font-semibold`}>Option D</h1>
              <input
                type="text"
                value={test.options.D}
                onChange={(e) =>
                  updateTest(index, {
                    ...test,
                    options: { ...test.options, D: e.target.value },
                  })
                }
                className="  outline-none border rounded p-3 w-full"
              />
              <h1 className={`Caption font-semibold`}>Answer</h1>
              <input
                type="text"
                value={test.answer}
                onChange={(e) =>
                  updateTest(index, { ...test, answer: e.target.value })
                }
                className="  outline-none border rounded p-3 w-full"
              />
              <button
                type="button"
                className="border bg-red-600 mt-2 text-white rounded-md p-2.5"
                onClick={() => removeTest(index)}
              >
                Remove Test
              </button>
            </div>
          ))}
          <button
            type="button"
            className="border bg-green-600 text-white rounded-md p-2.5"
            onClick={addTest}
          >
            Add Test
          </button>
          <div className="captionDiv mt-10">
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
            {!hasImage ? (
              <div
                {...getRootProps()}
                className="dropzone border h-52 flex items-center justify-center"
              >
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            ) : (
              <>
                <img src={previewUrl} alt="Preview" />
                <button
                  onClick={() => setHasImage(false)}
                  className="border p-2.5 bg-green-600 text-white rounded w-full "
                >
                  Change Photo
                </button>
              </>
            )}
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
