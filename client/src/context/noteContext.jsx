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
          "http://localhost:3000/api/notes"
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
