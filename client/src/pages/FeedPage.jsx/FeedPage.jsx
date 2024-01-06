import React, { useEffect } from "react";
import testVideo from "../../assets/Are You Using This EQ Trick- Left and Right Channel EQ.mp4";
import testImage from "../../assets/user (1).png";
import { useState } from "react";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import ShareButton from "../../components/Share/ShareButton";
import Test from "../../components/TestDropdown/Test";
import SubmitBtn from "../../components/SubmitButton/SubmitBtn";
import DOMPurify from "dompurify";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addAttendance } from "../../redux/feedSlice";
import { updateEnrollments, updateHats } from "../../redux/userSlice";
import Alert from "../../components/Alert/Alert";
import TestPage from "../TestPage/TestPage";
import TestButton from "../../components/TestButton/TestButton";

const FeedPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState(false);
  const [feed, setFeed] = useState(null);
  const [feeder, setFeeder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [video, setVideo] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "" });
  const [attendance, setAttendance] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [feedOwner, setFeedOwner] = useState(null);
  const dispatch = useDispatch();
  const toggleExpanded = () => {
    setIsExpanded((prevIsExpanded) => !prevIsExpanded);
  };

  const { id } = useParams();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const getFeed = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/upload/feeds/${id}`
        );
        setLoading(false);
        setFeed(res.data.singleFeed);
      } catch (err) {
        setLoading(false);

        console.log(err);
      }
    };
    getFeed();
  }, [id]);

  useEffect(() => {
    const fetchFeeds = async () => {
      setLoading(true);
      try {
        await axios
          .get(`http://localhost:3000/api/upload/random`)
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
  useEffect(() => {
    const getFeedOwnerData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/users/${id}`);
        setFeedOwner(res.data.user);
      } catch (err) {
        console.log(err);
      }
    };
    if (feed) {
      getFeedOwnerData();
    }
  }, [feed]);

  useEffect(() => {
    const getFeedOwner = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `http://localhost:3000/api/upload/feeder/${feed?.userId}`
        );

        setLoading(false);
        setFeeder(res.data.feedOwner.admissions);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    getFeedOwner();
  }, [feed]);

  const handleAttendance = async () => {
    // Make a request to the server to update the attendances
    try {
      const response = await axios.put(
        `http://localhost:3000/api/upload/feeds/attendances/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      setAttendance(response.data);

      dispatch(addAttendance({ feedId: id, userId: currentUser.user._id }));
    } catch (error) {
      setLoading(false);

      console.error("Error updating attendances:", error);
    }
  };

const handleEnroll = async (id) => {
  // Optimistically update state
  setLoading(true);
  setEnrollmentStatus(true);

  try {
    const response = await axios.put(
      `http://localhost:3000/api/users/enroll/${feed?.userId}`,
      {},
      {
        withCredentials: true,
      }
    );
    setLoading(false);
    // Append the new enrollment to the existing enrollments
    dispatch(updateEnrollments([...currentUser.user.enrollments, id]));
    console.log("Enrollment Successful");

    // Update feeder state
    setFeeder([...feeder, currentUser?.user._id]);
  } catch (err) {
    setLoading(false);
    console.log(err);
    console.log("Enrollment failed");

    // Revert state if request failed
    setEnrollmentStatus(false);
  }
};
const handleDropout = async (id) => {
  // Optimistically update state
  setLoading(true);
  setEnrollmentStatus(false);

  try {
    const response = await axios.put(
      `http://localhost:3000/api/users/dropout/${feed?.userId}`,
      {},
      {
        withCredentials: true,
      }
    );
    setLoading(false);
    dispatch(updateEnrollments(response.data.updatedUser.enrollments));
    console.log("User Dropped out Unfortunately");

    // Update feeder state
    setFeeder(feeder.filter((user) => user !== currentUser?.user._id));
  } catch (err) {
    setLoading(false);
    console.log(err);
    console.log("Dropout failed");

    // Revert state if request failed
    setEnrollmentStatus(true);
  }
};
  const handleAnswerSubmit = async (feed) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/upload/updateComprehensionAndHats",
        {
          selectedOption: selectedOption,
          feedId: feed._id,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.message === "Updated successfully!") {
        // Do something after successful update
        openModal();
        dispatch(updateHats(response.data.updatedUser.hats));
        setAlert({ show: true, message: "Your answer is correct!" });
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
      // Handle error
      console.log(err);
    }
  };
  if (loading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <BarLoader width={100} height={25} color="#38a169" />
      </div>
    );

  return (
    <div className="flex  justify-center  h-screen  px-2.5">
      <div className=" w-screen">
        <div className="border-8 border-black h-[50%] bg-black rounded-lg ">
          <video
            src={feed?.video || ""}
            className="w-full h-full rounded-md"
            controls
            onPlay={() => handleAttendance()} // Add this line
          ></video>
        </div>
        <div className=" border-red-500  flex flex-col gap-2.5">
          <p className="font-bold text-2xl text-slate-800">
            {feed?.caption || ""}
          </p>
          <div className="feedOwnerInfoDiv flex justify-between">
            <div className="feedOwnerInfoDiv flex gap-2.5 items-center">
              <img
                src={feed?.profileImage || ""}
                alt="profileImage"
                className="w-10 h-10  rounded-full object-cover transition cursor-pointer "
              />
              <Link to={`/profile/${feed?.username}`}>
                <div className="text-slate-600 cursor-pointer">
                  <p className="font-semibold text-sm">
                    {feed?.username || ""}
                  </p>
                  <p className="text-sm">
                    {feeder?.length}
                    <span className="font-extrabold"> Admissions</span>
                  </p>
                </div>
              </Link>
            </div>
            <div className="enrollAndShareDiv flex">
              {feeder?.includes(currentUser?.user._id) ? (
                <div className="LoginButtonDiv border rounded bg-green-600 flex justify-center items-center font-bold">
                  <button
                    onClick={() => {
                      handleDropout();
                    }}
                    className="text-white text-lg p-1 hover:bg-green-600 transition hover:text-white active:bg-green-700 cursor-pointer"
                  >
                    Enrolled
                  </button>
                </div>
              ) : (
                <SecondaryButton
                  onClick={() => {
                    handleEnroll();
                  }}
                  SecondaryButtonText="Enroll"
                />
              )}
              <div className="shareFeedDiv flex gap-3 items-center">
                <ShareButton feed={feed} />
              </div>
            </div>
          </div>
          <TestButton feedId={feed?._id} />
        </div>
        <div className="bg-gray-200 w-full border rounded-lg">
          <div className="attendances">
            <div className="text-sm font-bold text-gray-600 px-4 py-2">
              <span>{feed?.attendances.length}</span>
              <span className="text-sm font-normal text-gray-600 ">
                attendances
              </span>{" "}
              . <span> {feed?.comprehensions.length} </span>
              <span className="font-normal"> comprehensions</span>
              {feed?.createdAt && (
                <p className="font-extrabold">
                  {new Date(feed.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}{" "}
              <div className=" flex justify-center items-center text-center self-center">
                <hr className="h-0.5 m-2 bg-black w-[100%] flex justify-center items-center text-center self-center" />
              </div>{" "}
              <p className="font-normal">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      isExpanded
                        ? feed?.description
                        : feed?.description.substring(0, 100)
                    ),
                  }}
                />
                <button
                  onClick={toggleExpanded}
                  className="text-green-600 font-bold text-lg"
                >
                  {isExpanded ? "Show less" : "Show more..."}
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className=" flex justify-center items-center text-center self-center">
          <hr className="h-1 m-5 bg-black w-[50%] flex justify-center items-center text-center self-center" />
        </div>
        <div className="FeedPosts">
          {video.map((post) => (
            <Link key={post._id} to={`/feeds/${post._id}`}>
              <FeedPosts
                video={post?.video}
                title={post?.caption}
                feeder={post?.username}
                time={moment(post?.createdAt).fromNow()}
                attendances={post?.attendances.length}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
