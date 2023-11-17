/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux/es";
import Test from "../../components/TestDropdown/Test";
import SubmitBtn from "../../components/SubmitButton/SubmitBtn";
import { updateEnrollments, updateHats } from "../../redux/userSlice";
import Alert from "../../components/Alert/Alert";
import { FcIdea } from "react-icons/fc";
import { MdCoPresent } from "react-icons/md";
import { addAttendance } from "../../redux/feedSlice";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";

const Home = ({ type }) => {
  const [isHover, setIsHover] = useState({});
  const [videoIsPlaying, setVideoIsPlaying] = useState({});
  const [isVideoMuted, setIsVideoMuted] = useState({});
  const [video, setVideo] = useState([]);
  const [username, setUsername] = useState("");
  const [caption, setCaption] = useState("");
  const [enroll, setEnroll] = useState({});
  const [play, setPlay] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const userData = currentUser.user;
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "" });
  const updatedFeeds = useSelector((state) => state.feed.feeds);
  const dispatch = useDispatch();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const fetchFeeds = async () => {
      setLoading(true);
      try {
        await axios
          .get(`https://neural-feed-backend.onrender.com/api/upload/random`)
          .then((response) => {
            setVideo(response.data.randomFeeds);
          });
        setLoading(false);
      } catch (err) {
        setLoading(false);

        console.log(err);
      }
    };
    fetchFeeds();
  }, []);

  const handleEnroll = async (id) => {
    // Optimistically update state
    setLoading(true);

    try {
      const response = await axios.put(
        `https://neural-feed-backend.onrender.com/api/users/enroll/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setEnroll((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
      dispatch(updateEnrollments(response.data.updatedUser.enrollments));
      currentUser.user.enrollments = response.data.updatedUser.enrollments;
      console.log("Enrollment Successful");
    } catch (err) {
      setLoading(false);
      console.log(err);
      console.log("Enrollment failed");

      // Revert state if request failed
      setEnroll((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    }
  };

  const handleDropOut = async (id) => {
    // Prevent feed owner from dropping out themselves
    if (currentUser.user._id === id) {
      console.log("Feed owner cannot drop out themselves.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `https://neural-feed-backend.onrender.com/api/users/dropOut/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setEnroll((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
      dispatch(updateEnrollments(response.data.updatedUser.enrollments));
      currentUser.user.enrollments = response.data.updatedUser.enrollments;
      console.log("Dropout Successful");
    } catch (err) {
      setLoading(false);
      console.log(err);
      console.log("Dropout failed");
    }
  };

  //   const feedTitle =
  //  (
  //       books.map((book, k) => <img book={book} key={k} />)
  //     );

  const videoRefs = useRef({});

  const onVideoPress = (id) => {
    if (videoIsPlaying[id]) {
      videoRefs.current[id]?.pause();
    } else {
      videoRefs.current[id]?.play();
    }
    setVideoIsPlaying((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const onMuteButtonPress = (id) => {
    if (isVideoMuted[id]) {
      if (videoRefs.current[id]) {
        videoRefs.current[id].muted = true;
      }
    } else {
      if (videoRefs.current[id]) {
        videoRefs.current[id].muted = false;
      }
    }
    setIsVideoMuted((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleAnswerSubmit = async (feed) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://neural-feed-backend.onrender.com/api/upload/updateComprehensionAndHats",
        {
          selectedOption: selectedOption,
          feedId: feed._id,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);

      if (response.data.message === "Updated successfully!") {
        // Do something after successful update
        openModal();
        dispatch(updateHats(response.data.updatedUser.hats));
        setAlert({ show: true, message: "Your answer is correct!" });

        console.log(
          "Question answered Correctly",
          response.data.updatedUser.hats
        );
      } else {
        // Handle case when selected option does not match the feed answer

        openModal();

        console.log("Answer provided is incorrect");
        setAlert({
          show: true,
          message: "Your answer is incorrect. Please try again.",
        });
      }
    } catch (err) {
      setLoading(false);
      // Handle error
      console.log(err);
    }
  };

  const handleAttendance = async (id) => {
    // Make a request to the server to update the attendances
    try {
      const response = await axios.put(
        `https://neural-feed-backend.onrender.com/api/upload/feeds/attendances/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(addAttendance({ feedId: id, userId: currentUser.user._id }));
    } catch (error) {
      console.error("Error updating attendances:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <BarLoader
          width={100}
          height={25}
          color="#38a169"
        />
      </div>
    );

  return (
    <div className="flex flex-col gap-10 justify-center border p-5  ">
      {video.map((feed) => (
        <div
          key={feed._id}
          className="VideoDiv flex flex-col gap-3 w-full justify-between items-center ">
          <div className="VideoMetaDataDiv flex gap-5 justify-start ">
            <div className="ProfileImageDiv ">
              <img
                src={feed.profileImage ? feed.profileImage : UserProfileImage}
                alt=""
                className="w-10 h-10 rounded-full object-cover transition cursor-pointer "
                // loading="true"
              />
            </div>
            <div className="UserNameAndDetailsDiv">
              <Link to={`/profile/${feed.username}`}>
                <div className="UsernameDiv cursor-pointer">
                  <h1 className="font-bold">{feed.username}</h1>
                </div>
              </Link>
              <Link to={`/feeds/${feed._id}`}>
                <div className="VideoCaptionDiv cursor-pointer underline font-bold">
                  <p>{feed.caption}</p>
                </div>
              </Link>
            </div>
            <div className="EnrollButtonDiv flex items-center justify-center">
              {currentUser.user.enrollments.includes(feed.userId) ? (
                <div className="LoginButtonDiv border rounded bg-green-600 flex justify-center items-center font-bold">
                  <button
                    onClick={() => {
                      handleDropOut(feed.userId);
                    }}
                    className="text-white text-lg p-1 hover:bg-green-600 transition hover:text-white active:bg-green-700 cursor-pointer">
                    Enrolled
                  </button>
                </div>
              ) : (
                <SecondaryButton
                  onClick={() => {
                    handleEnroll(feed.userId);
                  }}
                  SecondaryButtonText="Enroll"
                />
              )}
            </div>
          </div>
          <div
            onMouseEnter={() =>
              setIsHover((prevState) => ({ ...prevState, [feed._id]: true }))
            }
            onMouseLeave={() =>
              setIsHover((prevState) => ({ ...prevState, [feed._id]: false }))
            }
            className="VideoFileDiv flex justify-center items-center rounded flex-col">
            <div className=" md:flex items-end gap-2">
              <div className=" flex justify-center flex-col">
                <video
                  src={feed.video}
                  className="w-80 rounded transition max-w-lg self-center "
                  ref={(el) => (videoRefs.current[feed._id] = el)}
                  // onClick={onVideoPress}
                  loop
                  // autoPlay
                  controls
                  onPlay={() => handleAttendance(feed._id)} // Add this line
                ></video>
                <Test
                  question={feed.test}
                  optionA={feed.options.A}
                  optionB={feed.options.B}
                  optionC={feed.options.C}
                  optionD={feed.options.D}
                  onClickA={() => {
                    setSelectedOption(feed.options.A);
                  }}
                  onClickB={() => {
                    setSelectedOption(feed.options.B);
                  }}
                  onClickC={() => {
                    setSelectedOption(feed.options.C);
                  }}
                  onClickD={() => {
                    setSelectedOption(feed.options.D);
                  }}>
                  <SubmitBtn
                    onClick={() => handleAnswerSubmit(feed)}
                    ButtonText="Submit"
                    openModal={openModal}
                  />
                </Test>
              </div>
              <div className="flex flex-row gap-5 md:flex-col justify-start  border-b-2 md:border-none shadow-sm md:shadow-none items-center mb-10 ">
                <div className="flex md:flex-col items-baseline md:items-center gap-1">
                  <FcIdea className="text-2xl " />
                  <h1 className=" font-bold text--600">
                    {feed.comprehensions.length}
                  </h1>
                </div>
                <div className="flex md:flex-col items-baseline md:items-center gap-1">
                  <MdCoPresent className="text-3xl font-bold text-green-700 " />
                  <h1 className=" font-bold text--600">
                    {feed.attendances.length}
                  </h1>
                </div>
              </div>
            </div>

            {/* {isHover[feed._id] && (
              <div className="absolute text-white cursor-pointer transition">
                <button onClick={() => onVideoPress(feed._id)}>
                  {videoIsPlaying[feed._id] ? (
                    <BsFillPauseFill className=" text-2xl lg:text-4xl transition" />
                  ) : (
                    <BsFillPlayFill className=" text-2xl lg:text-4xl" />
                  )}
                </button>
                <button onClick={() => onMuteButtonPress(feed._id)}>
                  {isVideoMuted[feed._id] ? (
                    <HiVolumeOff className=" text-2xl lg:text-4xl" />
                  ) : (
                    <HiVolumeUp className=" text-2xl lg:text-4xl" />
                  )}
                </button>
              </div>
            )} */}
          </div>
          {alert.show && (
            <Alert
              isOpen={isOpen}
              openModal={openModal}
              closeModal={closeModal}
              message={alert.message}
            />
          )}

          {/* <div className="  userReaction flex flex-col gap-1  text- top-52  w-47 p- justify-center items-center  ">
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
          </div> */}
          {/* <br /> */}
          <hr className="text-black border w-48 border-black m-5" />
        </div>
      ))}
    </div>
  );
};

export default Home;
