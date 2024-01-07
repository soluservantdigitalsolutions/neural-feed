import React from "react";

const NotePreview = ({ note }) => {
  return (
    <div className="p-4 border rounded shadow">
      <img
        src={note.imageUrl}
        alt={note.title}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <h2 className="text-xl font-bold mb-2">{note.title}</h2>
      <p className="text-gray-700">{note.content}</p>
    </div>
  );
};

export default NotePreview;
