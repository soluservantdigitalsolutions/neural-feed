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
  console.log("get feed param", id);

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
          `https://neural-feed-backend.onrender.com/api/upload/feeds/${id}`
        );
        setLoading(false);
        setFeed(res.data.singleFeed);
        console.log(feed);
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
          .get(`https://neural-feed-backend.onrender.com/api/upload/random`)
          .then((response) => {
            setVideo(response.data.randomFeeds);
            console.log(response.data.randomFeeds);
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
        const res = await axios.get(
          `https://neural-feed-backend.onrender.com/api/users/${id}`
        );
        setFeedOwner(res.data.user);
        console.log(feed);
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
          `https://neural-feed-backend.onrender.com/api/upload/feeder/${feed?.userId}`
        );

        setLoading(false);
        setFeeder(res.data.feedOwner.admissions);
        console.log(res);
        console.log(feeder);
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
        `https://neural-feed-backend.onrender.com/api/upload/feeds/attendances/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      setAttendance(response.data);
      console.log(attendance);
      console.log(response.data);

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
        `https://neural-feed-backend.onrender.com/api/users/enroll/${feed?.userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      console.log(response);
      // Create a new copy of the enrollments with the changes
      const updatedEnrollments = [...currentUser.user.enrollments, id];
      dispatch(updateEnrollments(updatedEnrollments));
      console.log("Enrollment Successful");
    } catch (err) {
      setLoading(false);
      console.log(err);
      console.log("Enrollment failed");

      // Revert state if request failed
      setEnrollmentStatus(false);
    }
    console.log(id);
  };
  const handleDropout = async (id) => {
    // Optimistically update state
    setLoading(true);
    setEnrollmentStatus(false);

    try {
      const response = await axios.put(
        `https://neural-feed-backend.onrender.com/api/users/dropout/${feed?.userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      console.log(response);
      dispatch(updateEnrollments(response.data.updatedUser.enrollments));
      console.log("User Dropped out Unfortunately");
    } catch (err) {
      setLoading(false);
      console.log(err);
      console.log("Dropout failed");

      // Revert state if request failed
      setEnrollmentStatus(true);
    }
    console.log(id);
  };

  const handleAnswerSubmit = async (feed) => {
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
      // Handle error
      console.log(err);
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
              {currentUser?.user.enrollments.includes(feed?.userId) ? (
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
          <div>
            <Test
              question={feed?.test}
              optionA={feed?.options.A}
              optionB={feed?.options.B}
              optionC={feed?.options.C}
              optionD={feed?.options.D}
              onClickA={() => {
                setSelectedOption(feed?.options.A);
                console.log("clickedA");
              }}
              onClickB={() => {
                setSelectedOption(feed?.options.B);
                console.log("clickedB");
              }}
              onClickC={() => {
                setSelectedOption(feed?.options.C);
                console.log("clickedC");
              }}
              onClickD={() => {
                setSelectedOption(feed?.options.D);
                console.log("clickedD");
              }}
            >
              <SubmitBtn
                onClick={() => handleAnswerSubmit(feed)}
                ButtonText="Submit"
                openModal={openModal}
              />
            </Test>
          </div>
          {alert.show && (
            <Alert
              isOpen={isOpen}
              openModal={openModal}
              closeModal={closeModal}
              message={alert.message}
            />
          )}
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
            <Link
              key={post._id}
              to={`/feeds/${post._id}`}
            >
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
