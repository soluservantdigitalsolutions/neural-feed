import React from "react";
import testVideo from "../../assets/Are You Using This EQ Trick- Left and Right Channel EQ.mp4";

const FeedPosts = ({ video, title, feeder, attendances, time }) => {
  return (
    <div className=" flex gap-2 mb-2.5 cursor-pointer">
      <div className=" h-[100px]  w-[100px] bg-black rounded-lg ">
        <video
          src={video}
          className="w-full h-full rounded-md object-cover"
        ></video>
      </div>
      <div className="videoDetails">
        <h1 className="font-bold">{title}</h1>
        <p>{feeder}</p>
        <p>
          {attendances} <span>attendances</span>
          <span className="items-center">
            <b> . </b>
          </span>
          <span>{time}</span>
        </p>
      </div>
    </div>
  );
};

export default FeedPosts;
