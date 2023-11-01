import React from "react";
import testVideo from "../../assets/Are You Using This EQ Trick- Left and Right Channel EQ.mp4";

const ProfileFeed = ({video, caption}) => {
  return (
    <div className=" flex flex-col justify-center items-center p-2 cursor-pointer ">
      <video
        src={video}
        alt="ProfileFeed"
        className="rounded-lg  w-[500px] h-[250px] border bg-black "
      ></video>
      <p className="font-bold underline text-center">{caption}</p>
    </div>
  );
};

export default ProfileFeed;
