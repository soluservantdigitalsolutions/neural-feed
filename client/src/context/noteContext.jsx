import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(notes);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          "https://neural-feed-backend-2yg8.onrender.com/api/notes"
        );
        setNotes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch notes", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <NoteContext.Provider value={{ notes, loading }}>
      {children}
    </NoteContext.Provider>
  );
};
