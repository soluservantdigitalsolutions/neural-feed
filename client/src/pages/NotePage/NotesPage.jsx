import React, { useContext } from "react";
import { NoteContext } from "../../context/noteContext";
import NotePreview from "../../components/NotesPreview/NotePreview";

const NotesPage = () => {
  const { notes } = useContext(NoteContext);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {notes?.map((note) => (
        <NotePreview key={note._id} note={note} />
      ))}
    </div>
  );
};

export default NotesPage;
