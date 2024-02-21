// ProfileFeed.jsx

import React from "react";

const ProfileFeed = ({ video, thumbnail, caption }) => {
  return (
    <div className="flex flex-col justify-center items-center p-2 cursor-pointer">
      <video
        src={video}
        poster={thumbnail} 
        
        alt="ProfileFeed"
        className="rounded-lg w-[500px] h-[250px] border bg-black"
      ></video>
      <p className="font-bold underline text-center">{caption}</p>
    </div>
  );
};

export default ProfileFeed;
