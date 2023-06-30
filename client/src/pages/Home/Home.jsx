import React, { useEffect, useState } from "react";
import UserProfileImage from "../../assets/user (1).png";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import TestVideo from "../../assets/Are You Using This EQ Trick- Left and Right Channel EQ.mp4";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { useRef } from "react";
import testVideo2 from "../../assets/Fl studio 11 trick- how to use your own headphone with mic to record you voice on fl studio 11.mp4";
import axios from "axios";
import { FaGraduationCap } from "react-icons/fa";
import { CiStreamOn } from "react-icons/ci";
import { FaComments } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";

const Home = () => {
  const [isHover, setIsHover] = useState(false);
  const [videoIsPlaying, setvideoIsPlaying] = useState(false);
  const [isVideoMuted, setisVideoMuted] = useState(false);
  const [video, setVideo] = useState();
  const [username, setUsername] = useState("");
  const [caption, setCaption] = useState("");

  useEffect(() => {
    const getFeeds = async () => {
      try {
        const feeds = await axios.get(
          "https://neural-feed-backend.vercel.app/api/upload/feeds"
        );
        console.log(feeds);
        setVideo(feeds.data.feeds[0].video);
        setUsername(feeds.data.feeds[0].username);
        setCaption(feeds.data.feeds[0].caption);
      } catch (err) {
        console.log(err.message);
      }
    };
    getFeeds();
  }, []);

  const videoRef = useRef(null);

  const onVideoPress = () => {
    if (videoIsPlaying) {
      videoRef?.current?.pause();
      setvideoIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setvideoIsPlaying(true);
    }
  };

  const onMuteButtonPress = () => {
    if (isVideoMuted) {
      // videoRef?.current?.muted;
      setisVideoMuted(false);
    } else {
      // !videoRef?.current?.muted;
      setisVideoMuted(true);
    }
  };

  return (
    <div className="flex flex-col gap-10 justify-center border p-5 ">
      <div className="VideoDiv flex flex-col gap-3 w-full justify-between items-center">
        <div className="VideoMetaDataDiv flex gap-5 justify-start ">
          <div className="ProfileImageDiv ">
            <img
              src={UserProfileImage}
              alt=""
              className="w-10 transition "
              // loading="true"
            />
          </div>
          <div className="UserNameAndDetailsDiv">
            <div className="UsernameDiv">
              <h1 className="font-bold">{username}</h1>
            </div>
            <div className="VideoCaptionDiv">
              <p>{caption}</p>
            </div>
          </div>
          <div className="EnrollButtonDiv flex items-center justify-center">
            <SecondaryButton SecondaryButtonText="Enroll" />
          </div>
        </div>
        <div
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          className="VideoFileDiv flex justify-center items-center rounded flex-col"
        >
          <img
            src={video}
            className="w-80 rounded transition max-w-lg"
            ref={videoRef}
            // onClick={onVideoPress}
            loop
            // autoPlay

            // controls
          ></img>
          {isHover && (
            <div className="absolute text-white cursor-pointer transition">
              {videoIsPlaying ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className=" text-2xl lg:text-4xl transition" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className=" text-2xl lg:text-4xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={onMuteButtonPress}>
                  <HiVolumeOff className=" text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onMuteButtonPress}>
                  <HiVolumeUp className=" text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
        <div className="  userReaction flex flex-col gap-1  text- top-52  w-47 p- justify-center items-center  ">
          <div className=" statisticsDiv flex gap-20  text- top-52  w-47 p-5 justify-center items-center">
            <div className="GradHats flex flex-col justify-center items-center">
              <FaHandsHelping className="cursor-pointer text-5xl p-3 border rounded-full bg-slate-200" />
              <span>1M</span>
            </div>
            <div className="GradHats flex flex-col justify-center items-center">
              <FaComments className=" cursor-pointer text-5xl p-3 border rounded-full bg-slate-200" />
              <span>457</span>
            </div>
            <div className="GradHats flex flex-col justify-center items-center">
              <FaGraduationCap className=" cursor-pointer text-5xl p-3  rounded-full bg-slate-200 " />
              <span>4.7k</span>
            </div>
          </div>
          <div className="ViewsDiv ">
            <div className="viewsNumber flex flex-col justify-center items-center">
              <CiStreamOn className="text-3xl" />
              <span>1,334,489</span>
            </div>
          </div>
        </div>
        {/* <br /> */}
        <hr className="text-black border w-48 border-black m-5" />
      </div>
    </div>
  );
};

export default Home;
