// SearchResult.jsx
import React from "react";

const SearchResult = ({ results }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Search Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {results.feeds.map((feed, index) => (
          <div key={index} className="border p-4 rounded">
            {/* Display feed details */}
          </div>
        ))}
        {results.notes.map((note, index) => (
          <div key={index} className="border p-4 rounded">
            {/* Display note details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
