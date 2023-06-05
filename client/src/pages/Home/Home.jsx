import React, { useState } from 'react';
import UserProfileImage from '../../assets/user (1).png';
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton';
import TestVideo from '../../assets/Are You Using This EQ Trick- Left and Right Channel EQ.mp4';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import {HiVolumeUp, HiVolumeOff} from "react-icons/hi"
import { useRef } from 'react';

const Home = () => {
  const [isHover, setIsHover] = useState(false);
  const [videoIsPlaying, setvideoIsPlaying] = useState(false);
  const [isVideoMuted, setisVideoMuted] = useState(false);

  const videoRef = useRef(null)

  const onVideoPress = () =>{
    if (videoIsPlaying) {
      videoRef?.current?.pause();
      setvideoIsPlaying(false)
    } else {
      videoRef?.current?.play();
      setvideoIsPlaying(true)
    }
  }
  
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
    <div className="flex justify-center border p-5 ">
      <div className="VideoDiv flex flex-col gap-3">
        <div className="VideoMetaDataDiv flex gap-5">
          <div className="ProfileImageDiv">
            <img
              src={UserProfileImage}
              alt=""
              className="w-10"
            />
          </div>
          <div className="UserNameAndDetailsDiv">
            <div className="UsernameDiv">
              <h1 className="font-bold">testuser</h1>
            </div>
            <div className="VideoCaptionDiv">
              <p>This is a test Video Caption</p>
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
          <video
            src={TestVideo}
            className="w-80 rounded transition"
            ref={videoRef}
            onClick={onVideoPress}
            loop
            // autoPlay

            // controls
          ></video>
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
      </div>
    </div>
  );
};

export default Home;
