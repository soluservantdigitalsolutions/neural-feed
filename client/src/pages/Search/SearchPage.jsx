// SearchPage.jsx
import React, { useState } from "react";
import axios from "axios";
import SearchResult from "../../components/SearchResults/SearchResults";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState({ feeds: [], notes: [] });
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const feedsResponse = await axios.get(
        `https://neural-feed-backend-2yg8.onrender.com/api/upload/feeds/search?q=${searchQuery}`
      );
      const notesResponse = await axios.get(
        `https://neural-feed-backend-2yg8.onrender.com/api/notes/search?q=${searchQuery}`
      );
      setSearchResults({
        feeds: feedsResponse.data,
        notes: notesResponse.data,
      });
      console.log(searchResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      console.log(searchQuery);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search for feeds and notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <SearchResult results={searchResults} />
      )}
    </div>
  );
};

export default SearchPage;
