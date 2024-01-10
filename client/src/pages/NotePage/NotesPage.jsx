import React, { useContext } from "react";
import { NoteContext } from "../../context/noteContext";
import NotePreview from "../../components/NotesPreview/NotePreview";
import SkeletonLoader from "../../components/SkeletonLoader/SkeletonLoader";

const NotesPage = () => {
  const { notes, loading } = useContext(NoteContext);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {loading
        ? Array.from({ length: 10 }).map((_, i) => <SkeletonLoader key={i} />)
        : notes?.map((note) => <NotePreview key={note._id} note={note} />)}
    </div>
  );
};
export default NotesPage;
