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
// import {useAuthState} from "react-firebase-hooks"
// import {Auth, Provider} from "../../../firebase.config"

const Home = () => {
  // const auth = useAuthState(Auth)
  // console.log(auth);
  const [isHover, setIsHover] = useState(false);
  const [videoIsPlaying, setvideoIsPlaying] = useState(false);
  const [isVideoMuted, setisVideoMuted] = useState(false);
  const [video, setVideo] = useState([]);
  const [username, setUsername] = useState("");
  const [caption, setCaption] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/upload/feeds")
      .then((response) => {
        setVideo(response.data.feeds);
        console.log(video);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   const feedTitle =
  //  (
  //       books.map((book, k) => <img book={book} key={k} />)
  //     );

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
      {video.map((feed) => (
        <div className="VideoDiv flex flex-col gap-3 w-full justify-between items-center">
          <div className="VideoMetaDataDiv flex gap-5 justify-start ">
            <div className="ProfileImageDiv ">
              <img
                key={feed.id}
                src={UserProfileImage}
                alt=""
                className="w-10 transition "
                // loading="true"
              />
            </div>
            <div className="UserNameAndDetailsDiv">
              <div className="UsernameDiv">
                <h1
                  key={feed.id}
                  className="font-bold"
                >
                  {feed.username}
                </h1>
              </div>
              <div className="VideoCaptionDiv">
                <p key={feed.id}>{feed.caption}</p>
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
              key={feed.id}
              src={feed.video}
              className="w-80 rounded transition max-w-lg"
              ref={videoRef}
              // onClick={onVideoPress}
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
          <div className="  userReaction flex flex-col gap-1  text- top-52  w-47 p- justify-center items-center  ">
            <div className=" statisticsDiv flex gap-20  text- top-52  w-47 p-5 justify-center items-center">
              <div className="GradHats flex flex-col justify-center items-center">
                <FaHandsHelping className="cursor-pointer text-5xl p-3 border rounded-full bg-slate-200" />
                <span>1M</span>
              </div>
              <div className="GradHats flex flex-col justify-center items-center">
                <FaComments className=" cursor-pointer text-5xl p-3 border rounded-full bg-slate-200" />
                <span>488</span>
              </div>
              <div className="GradHats flex flex-col justify-center items-center">
                <FaGraduationCap className=" cursor-pointer text-5xl p-3  rounded-full bg-slate-200 " />
                <span>477k</span>
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
      ))}
    </div>
  );
};

export default Home;
