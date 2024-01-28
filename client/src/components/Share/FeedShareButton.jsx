import React from "react";
import { BsShareFill } from "react-icons/bs";
const FeedShareButton = ({ feed }) => {
  const handleShare = async () => {
    const feedUrl = `https://neuralfeed.onrender.com/feeds/${feed._id}`; // replace with your actual feed URL
    try {
      await navigator.clipboard.writeText(feedUrl);
      alert("Feed link copied to clipboard");
    } catch (err) {
      console.error("Failed to copy feed link: ", err);
    }
  };

  return (
    <button
      className="border flex p-2  rounded bg-green-500 gap-2.5 text-white"
      onClick={handleShare}
    >
      <BsShareFill className="text-2xl" /> Share
    </button>
  );
};

export default FeedShareButton;
