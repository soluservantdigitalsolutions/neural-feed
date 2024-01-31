import React, { useEffect } from "react";
import { useState } from "react";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import { Link, useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import DOMPurify from "dompurify";
import FeedPosts from "../../components/FeedPosts/FeedPosts";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addAttendance } from "../../redux/feedSlice";
import { updateEnrollments, updateHats } from "../../redux/userSlice";
import TestButton from "../../components/TestButton/TestButton";
import {
  dropoutUser,
  enrollUser,
  getFeed,
  getFeedOwner,
  getFeedOwnerData,
  getRandomFeeds,
  submitAnswer,
  updateAttendance,
} from "../../api/api";
import FeedShareButton from "../../components/Share/FeedShareButton";

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
    const fetchFeed = async () => {
      setLoading(true);
      try {
        const feed = await getFeed(id);
        setFeed(feed);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, [id]);

  useEffect(() => {
    const fetchFeeds = async () => {
      setLoading(true);
      try {
        const randomFeeds = await getRandomFeeds();
        setVideo(randomFeeds);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeeds();
  }, []);

  useEffect(() => {
    const fetchFeedOwnerData = async () => {
      try {
        const feedOwnerData = await getFeedOwnerData(id);
        setFeedOwner(feedOwnerData);
      } catch (err) {
        console.log(err);
      }
    };
    if (feed) {
      fetchFeedOwnerData();
    }
  }, [feed]);

  useEffect(() => {
    const fetchFeedOwner = async () => {
      setLoading(true);
      try {
        const feedOwner = await getFeedOwner(feed.userId);
        setFeeder(feedOwner);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedOwner();
  }, [feed]);

  const handleAttendance = async () => {
    try {
      const response = await updateAttendance(id);
      setAttendance(response);
      dispatch(addAttendance({ feedId: id, userId: currentUser.user._id }));
    } catch (error) {
      console.error("Error updating attendances:", error);
    }
  };

  const handleEnroll = async (id) => {
    setLoading(true);
    setEnrollmentStatus(true);
    try {
      const response = await enrollUser(feed?.userId);
      setLoading(false);
      dispatch(updateEnrollments([...currentUser.user.enrollments, id]));
      setFeeder([...feeder, currentUser?.user._id]);
    } catch (err) {
      setLoading(false);
      console.log(err);
      setEnrollmentStatus(false);
    }
  };

  const handleDropout = async (id) => {
    setLoading(true);
    setEnrollmentStatus(false);
    try {
      const response = await dropoutUser(feed?.userId);
      setLoading(false);
      dispatch(updateEnrollments(response.data.updatedUser.enrollments));
      setFeeder(feeder.filter((user) => user !== currentUser?.user._id));
    } catch (err) {
      setLoading(false);
      console.log(err);
      setEnrollmentStatus(true);
    }
  };

  const handleAnswerSubmit = async (feed) => {
    try {
      const response = await submitAnswer(selectedOption, feed._id);
      if (response.message === "Updated successfully!") {
        openModal();
        dispatch(updateHats(response.updatedUser.hats));
        setAlert({ show: true, message: "Your answer is correct!" });
      } else {
        openModal();
        console.log("Answer provided is incorrect");
        setAlert({
          show: true,
          message: "Your answer is incorrect. Please try again.",
        });
      }
    } catch (err) {
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
                <FeedShareButton feed={feed} />
              </div>
            </div>
          </div>
          <TestButton contentType="feeds" feedId={feed?._id} />
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
