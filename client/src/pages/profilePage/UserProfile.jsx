import React, { useEffect, useState } from "react";
import testProfilePic from "../../assets/user (1).png";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";
import { useSelector } from "react-redux/es";
import { Link, NavLink, useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import axios from "axios";
import ProfileFeed from "../../components/ProfileFeeds/ProfileFeed";
import SubmitBtn from "../../components/SubmitButton/SubmitBtn";
import { Tab } from "@headlessui/react";
import NoteStats from "../../components/NoteStats/NoteStats";

const UserProfile = () => {
  // const [user] = useAuthState(Auth);
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [userFeeds, setUserFeeds] = useState([]);
  const [error, setError] = useState(null);
  const [userNotes, setUserNotes] = useState([]);

  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://neural-feed-backend-2yg8.onrender.com/api/users/profile/${username}`
        );
        setLoading(false);
        setUser(res.data.user);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getUserProfile();
  }, [username]);

  useEffect(() => {
    const getUserFeeds = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://neural-feed-backend-2yg8.onrender.com/api/upload/profile/feeds/${username}`
        );
        setLoading(false);
        setUserFeeds(response.data.feeds);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    getUserFeeds();
  }, [username]);

  useEffect(() => {
    const getUserNotes = async () => {
      setLoading(true);
      try {
        // Use the username to fetch the user's notes
        const response = await axios.get(
          `https://neural-feed-backend-2yg8.onrender.com/api/notes/users/${username}`,
          {
            withCredentials: true,
          }
        );
        setUserNotes(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      getUserNotes();
    }
  }, [username]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <BarLoader width={100} height={25} color="#38a169" />
      </div>
    );
  return (
    <div className="flex flex-col ">
      <div className="ProfileInfoAndStats flex flex-col justify-center items-center p-5 gap-5 border w-full">
        <div className="ProfilePicDiv ">
          <img
            src={user && user.profileImage ? user.profileImage : testProfilePic}
            alt="testUser"
            className="rounded-full w-[100px] h-[100px] object-cover"
          />
        </div>
        <div className="UserNameDiv">
          <h1 className="font-bold">{user && user.username}</h1>
        </div>
        <div className="userStatsDiv flex gap-5">
          <div className="Admissions">
            <span className="font-bold">
              {user && user.enrollments && user.enrollments.length}
            </span>
            <span className="font-thin"> Enrollments</span>
          </div>
          <div className="StudentsDiv">
            <span className="font-bold">
              {user && user.admissions && user.admissions.length}
            </span>
            <span> Admissions</span>
          </div>
          <div className="GraduationHatsDiv">
            <span className="font-bold">
              {user && user.hats && user.hats.length}
            </span>
            <span> Hats</span>
          </div>
        </div>
        {/* <div className="BioDIV">
          <SecondaryButton SecondaryButtonText="Edit Profile" />
        </div> */}
        <div className="BioDIV">
          <p>{user && user.bio ? user.bio : ""}</p>
        </div>
        {/* <button className=" border-green-600 font-bold text-xl p-2.5 border rounded text-green-600">
          Enroll
        </button> */}
      </div>
      <Tab.Group>
        <Tab.List className="flex p-1 transition  space-x-1 bg-green-900/20">
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm transition leading-5 font-medium text-green-700 rounded-lg
              ${
                selected
                  ? "bg-white shadow"
                  : " hover:bg-white/[0.12] hover:text-white"
              }`
            }
          >
            Feeds
          </Tab>
          <Tab
            className={({ selected }) =>
              `w-full py-2.5 text-sm leading-5 transition font-medium text-green-700 rounded-lg
              ${
                selected
                  ? "bg-white shadow"
                  : " hover:bg-white/[0.12] hover:text-white"
              }`
            }
          >
            Notes
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {/* Render user feeds here */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
              {userFeeds.length > 0 ? (
                userFeeds.map((feed) => (
                  <Link key={feed._id} to={`/feeds/${feed._id}`}>
                    <ProfileFeed video={feed.video} caption={feed.caption} />
                  </Link>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg font-bold text-gray-500 mb-4">
                    {currentUser.user.username === username
                      ? "Oops, You have no Feeds yet"
                      : "Oops this user doesn't have any feeds yet"}
                  </p>
                  {currentUser.user.username === username && (
                    <Link
                      to="/upload"
                      className="bg-green-600 font-bold text-white px-4 py-2 rounded"
                    >
                      CREATE ONE
                    </Link>
                  )}
                </div>
              )}
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
              {userNotes.length > 0 ? (
                userNotes.map((note) => (
                  <div key={note._id} className=" m-5">
                    <div className="feedOwnerInfoDiv p-4 flex justify-between">
                      <div className="feedOwnerInfoDiv flex gap-2.5 items-center"></div>
                    </div>
                    <div className="p-4 rounded shadow flex flex-col justify-center items-center">
                      <img
                        src={note.imageUrl}
                        alt={note.title}
                        className="w-full h-64 object-cover mb-4 rounded"
                      />
                      <h2 className="text-xl font-bold mb-2">{note.title}</h2>
                      {/* <NoteStats
                        comprehensions={note.comprehensions.length}
                        attendances={note.attendances.length}
                        noteId={note._id}
                      /> */}
                      <Link
                        to={`/notes/${note._id}`}
                        className="mt-4 text-blue-500 hover:underline w-full"
                      >
                        <button className="w-full mt-5 bg-green-600 p-2 text-white rounded font-bold">
                          View Note
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-lg font-bold text-gray-500 mb-4">
                    {username === currentUser.username
                      ? "You have no notes yet"
                      : "This user doesn't have any notes yet"}
                  </p>
                </div>
              )}
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default UserProfile;
