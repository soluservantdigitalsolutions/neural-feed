import React, { useState } from "react";

const NotePreview = ({ note }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const maxLength = 900; // Adjust this number to control how much content is shown initially

  let contentToDisplay = note.content;
  if (!showFullContent && note.content.length > maxLength) {
    const lastSpaceIndex = note.content.lastIndexOf(" ", maxLength);
    contentToDisplay = note.content.slice(0, lastSpaceIndex) + "...";
    console.log(contentToDisplay);
  }

  return (
    <div className="p-4 border rounded shadow">
      <img
        src={note.imageUrl}
        alt={note.title}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <h2 className="text-xl font-bold mb-2">{note.title}</h2>
      {/* <p dangerouslySetInnerHTML={{ __html: contentToDisplay }}></p> */}

      {note.content.length > maxLength && !showFullContent && (
        <button
          className="border bg-green-600 p-2 text-white rounded font-bold"
          onClick={() => setShowFullContent(true)}
        >
          Feed More <span className="font-extrabold">. . .</span>
        </button>
      )}
    </div>
  );
};

export default NotePreview;
