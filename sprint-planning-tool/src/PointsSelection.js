import React from "react";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "./PointsSelection.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function PointsSelection(props) {
  const gameID = props.location.state.gameID;
  const userID = props.location.state.userID;

  const [gameName, setGameName] = useState("");
  const [username, setUsername] = useState("");
  const [showEditUsername, setShowEditUsername] = useState(false);
  const [users, setUsers] = useState([]);
  const [stories, setStories] = useState([]);
  const [storyName, setStoryName] = useState("");
  const [estimate, setEstimate] = useState("");
  const [finalStoryPoints, setFinalStoryPoints] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  // Get list of stories
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("games")
      .doc(gameID.toString())
      .collection("userStories")
      .orderBy("created")
      .onSnapshot((snapshot) => {
        const listStories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStories(listStories);
      });

    return () => unsubscribe();
  }, [gameID]);

  // Get username
  useEffect(() => {
    firebase
      .firestore()
      .collection("games")
      .doc(gameID.toString())
      .collection("users")
      .doc(userID.toString())
      .get()
      .then((doc) => {
        const data = doc.data().username;
        setUsername(data);
      });
  }, [gameID, userID]);

  // Get game name
  useEffect(() => {
    firebase
      .firestore()
      .collection("games")
      .doc(gameID.toString())
      .get()
      .then((doc) => {
        const data = doc.data().name;
        setGameName(data);
      });
  }, [gameID]);

  // Get list of users
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("games")
      .doc(gameID.toString())
      .collection("users")
      .onSnapshot((snapshot) => {
        const listUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(listUsers);
      });

    return () => unsubscribe();
  }, [gameID]);

  // Pushes params onto next page
  const handleResultsSubmit = (e) => {
    e.preventDefault();

    props.history.push({
      pathname: "/results",
      state: {
        gameName,
        stories,
      },
    });
  };

  const handleStorySubmit = (e) => {
    e.preventDefault();
    firebase
      .firestore()
      .collection("games")
      .doc(gameID.toString())
      .collection("userStories")
      .add({
        name: storyName,
        points: "",
        estimates: {},
        created: firebase.firestore.Timestamp.now(),
      })
      .then(() => setStoryName(""));
  };

  const handleEstimateSubmit = (e) => {
    e.preventDefault();
    firebase
      .firestore()
      .collection("games")
      .doc(gameID.toString())
      .collection("userStories")
      .doc(stories[stories.length - 1].id)
      .update({
        [`estimates.${userID}`]: Number(estimate),
      });
  };

  const deleteStory = (id) => {
    firebase
      .firestore()
      .collection("games")
      .doc(gameID.toString())
      .collection("userStories")
      .doc(id)
      .delete();
  };

  const handleStoryPointSubmit = (storyID) => (event) => {
    event.preventDefault();

    firebase
      .firestore()
      .collection("games")
      .doc(gameID.toString())
      .collection("userStories")
      .doc(storyID)
      .update({
        points: finalStoryPoints,
      });
  };

  const toggleEditUsernameClick = () => {
    setShowEditUsername((showEditUsername) => !showEditUsername);
  };

  const handleEditUsernameSubmit = (e) => {
    e.preventDefault();

    firebase
      .firestore()
      .collection("games")
      .doc(gameID.toString())
      .collection("users")
      .doc(userID.toString())
      .update({
        username,
      })
      .then(() => setShowEditUsername((showEditUsername) => !showEditUsername));
  };

  const getUsername = (userID) => {
    let username = "test";
    users.forEach((user) => {
      if (userID === user.id) {
        username = user.username;
      }
    });
    return username;
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 h-screen">
        <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2">
          <div className="lg:text-left">
            <p className="text-2xl font-semibold">{gameName}</p>
            <p className="text-xl font-mdium">Players: {users.length}</p>
            <p className="text-xl font-normal">
              <span className="text-gray-400">Voting:</span>{" "}
              {stories.length > 0
                ? stories[stories.length - 1].name
                : "No stories"}
            </p>
          </div>
          <div className="lg:text-right">
            <p className="text-xl font-semibold">Game PIN: {gameID}</p>
            <div
              className={`items-center justify-end ${
                showEditUsername === false ? "" : "hidden"
              }`}
            >
              <div className="flex flex-row items-center justify-end">
                <div>
                  <span className="text-xl font-medium mr-2">{username}</span>
                </div>
                <div>
                  <FaEdit
                    size={18}
                    onClick={toggleEditUsernameClick}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className={` ${showEditUsername === false ? "hidden" : ""} `}>
              <form onSubmit={handleEditUsernameSubmit}>
                <div className="flex flex-row justify-end space-x-2 items-center">
                  <div>
                    <input
                      value={username}
                      className="rounded border px-2 py-1 w-full"
                      type="text"
                      name="username"
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      className="rounded-lg border-2 border-yellow-500 bg-yellow-500 text-white hover:bg-yellow-400 text-lg text-center font-semibold px-2 w-full cursor-pointer"
                      type="submit"
                      value="Save"
                    />
                  </div>
                  <div>
                    <input
                      className="rounded-lg border-2 border-yellow-500 bg-white text-yellow-500 hover:bg-yellow-100 text-lg font-semibold px-2 w-full cursor-pointer"
                      type="button"
                      value="Cancel"
                      onClick={toggleEditUsernameClick}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-span-2 text-xl font-semibold text-center">
            {stories.length > 0 &&
            Object.keys(stories[stories.length - 1].estimates).length > 0
              ? "Votes"
              : "No Votes"}
          </div>
          <div className="grid grid-cols-5 col-span-2 text-center gap-20 mb-80">
            {stories.length > 0 ? (
              Object.keys(stories[stories.length - 1].estimates)
                .sort(function (a, b) {
                  return (
                    stories[stories.length - 1].estimates[a] -
                    stories[stories.length - 1].estimates[b]
                  );
                })
                .map((key) =>
                  users.length ===
                  Object.keys(stories[stories.length - 1].estimates).length ? (
                    <div key={key}>
                      <label className="border-solid border-2 rounded-lg border-yellow-500 text-yellow-500 px-6 py-8">
                        <span className="text-lg font-bold">
                          {isNaN(stories[stories.length - 1].estimates[key])
                            ? "?"
                            : stories[stories.length - 1].estimates[key]}
                        </span>
                      </label>
                      <div className="text-lg font-medium mt-8">
                        {getUsername(key)}
                      </div>
                    </div>
                  ) : (
                    <div key={key}>
                      <label className="border-solid border-2 rounded-lg border-yellow-500 px-6 py-8 bg-yellow-500"></label>
                      <div className="text-lg font-medium mt-8">
                        {getUsername(key)}
                      </div>
                    </div>
                  )
                )
            ) : (
              <div className="col-span-5 text-xl font-semibold text-center">
                Add a story
              </div>
            )}
          </div>
          <div className="col-span-2 text-center text-lg -mt-64">
            Choose your card
          </div>
          <form onSubmit={handleEstimateSubmit} className="col-span-2">
            <div className="grid grid-cols-8 text-center col-span-2 gap-20 -mt-64 mb-12">
              <div>
                <input
                  id="radio_1"
                  type="radio"
                  value="1"
                  name="estimate"
                  onChange={(e) => setEstimate(e.target.value)}
                  required
                />
                <label
                  className="border-solid border-2 rounded-lg border-yellow-500 py-8 px-6 cursor-pointer hover:bg-yellow-100"
                  htmlFor="radio_1"
                >
                  <span className="font-bold text-lg">1</span>
                </label>
              </div>
              <div>
                <input
                  id="radio_2"
                  type="radio"
                  value="2"
                  name="estimate"
                  onChange={(e) => setEstimate(e.target.value)}
                />
                <label
                  className="border-solid border-2 rounded-lg border-yellow-500 py-8 px-6 cursor-pointer hover:bg-yellow-100"
                  htmlFor="radio_2"
                >
                  <span className="font-bold text-lg">2</span>
                </label>
              </div>
              <div>
                <input
                  id="radio_3"
                  type="radio"
                  value="3"
                  name="estimate"
                  onChange={(e) => setEstimate(e.target.value)}
                />
                <label
                  className="border-solid border-2 rounded-lg border-yellow-500 py-8 px-6 cursor-pointer hover:bg-yellow-100"
                  htmlFor="radio_3"
                >
                  <span className="font-bold text-lg">3</span>
                </label>
              </div>
              <div>
                <input
                  id="radio_5"
                  type="radio"
                  value="5"
                  name="estimate"
                  onChange={(e) => setEstimate(e.target.value)}
                />
                <label
                  className="border-solid border-2 rounded-lg border-yellow-500 py-8 px-6 cursor-pointer hover:bg-yellow-100"
                  htmlFor="radio_5"
                >
                  <span className="font-bold text-lg">5</span>
                </label>
              </div>
              <div>
                <input
                  id="radio_8"
                  type="radio"
                  value="8"
                  name="estimate"
                  onChange={(e) => setEstimate(e.target.value)}
                />
                <label
                  className="border-solid border-2 rounded-lg border-yellow-500 py-8 px-6 cursor-pointer hover:bg-yellow-100"
                  htmlFor="radio_8"
                >
                  <span className="font-bold text-lg">8</span>
                </label>
              </div>
              <div>
                <input
                  id="radio_13"
                  type="radio"
                  value="13"
                  name="estimate"
                  onChange={(e) => setEstimate(e.target.value)}
                />
                <label
                  className="border-solid border-2 rounded-lg border-yellow-500 py-8 px-6 cursor-pointer hover:bg-yellow-100"
                  htmlFor="radio_13"
                >
                  <span className="font-bold text-lg">13</span>
                </label>
              </div>
              <div>
                <input
                  id="radio_21"
                  type="radio"
                  value="21"
                  name="estimate"
                  onChange={(e) => setEstimate(e.target.value)}
                />
                <label
                  className="border-solid border-2 rounded-lg border-yellow-500 py-8 px-6 cursor-pointer hover:bg-yellow-100"
                  htmlFor="radio_21"
                >
                  <span className="font-bold text-lg">21</span>
                </label>
              </div>
              <div>
                <input
                  id="radio_?"
                  type="radio"
                  value="?"
                  name="estimate"
                  onChange={(e) => setEstimate(e.target.value)}
                />
                <label
                  className="border-solid border-2 rounded-lg border-yellow-500 py-8 px-6 cursor-pointer hover:bg-yellow-100"
                  htmlFor="radio_?"
                >
                  <span className="font-bold text-lg">?</span>
                </label>
              </div>
            </div>
            <div className="text-center">
              <input
                className="rounded-lg bg-yellow-500 text-white hover:bg-yellow-400 text-lg font-semibold py-2 px-8 w-auto cursor-pointer"
                type="submit"
                value="Vote"
                name="estimate"
                disabled={
                  stories.length > 0
                    ? users.length ===
                      Object.keys(stories[stories.length - 1].estimates).length
                    : true
                }
              />
            </div>
          </form>
        </div>
        <div className="ml-20">
          <p className="text-xl font-semibold mb-2">Stories</p>
          <div className="overflow-auto h-3/5">
            {stories.map((story) => (
              <div
                key={story.id}
                className={`p-6 mb-6 mr-2 rounded-lg ${
                  story === stories[stories.length - 1]
                    ? "bg-yellow-200"
                    : "bg-gray-100"
                }`}
              >
                <div className="grid grid-cols-2">
                  <div className="text-lg font-normal">{story.name}</div>
                  <div className="text-lg font-normal text-right">
                    {story.points}
                  </div>
                </div>
                <form onSubmit={handleStoryPointSubmit(story.id)}>
                  <span className="text-base font-normal mr-2">
                    Select story points
                  </span>
                  <select
                    className="p-2 rounded-lg appearance-none"
                    onChange={(e) => setFinalStoryPoints(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="8">8</option>
                    <option value="13">13</option>
                    <option value="21">21</option>
                  </select>
                  <input
                    className={`py-2 px-4 ml-2 text-base font-semibold cursor-pointer rounded-lg ${
                      story === stories[stories.length - 1]
                        ? "bg-yellow-500 text-white hover:bg-yellow-400"
                        : "bg-gray-300 text-black hover:bg-gray-200"
                    }`}
                    type="submit"
                    value="Save"
                    disabled={
                      stories.length > 0
                        ? users.length !==
                          Object.keys(stories[stories.length - 1].estimates)
                            .length
                        : false
                    }
                  />
                </form>
                <FaTrashAlt
                  onClick={() => deleteStory(story.id)}
                  size={18}
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
          <div>
            <form onSubmit={handleStorySubmit}>
              <div className="mt-2 grid grid-cols-5 items-center">
                <div className="col-span-4">
                  <input
                    className="rounded border p-4 w-full"
                    type="text"
                    name="story"
                    placeholder="Enter a title for the user story"
                    value={storyName}
                    required
                    maxLength="50"
                    onChange={(e) => {
                      setStoryName(e.target.value);
                      setCharacterCount(e.target.value.length);
                    }}
                  />
                </div>
                <div className="text-right">
                  <span>{characterCount}/50</span>
                </div>
              </div>
              <div className="text-center mt-4">
                <input
                  className="rounded-lg bg-yellow-500 text-white hover:bg-yellow-400 text-lg font-semibold py-2 w-full cursor-pointer"
                  type="submit"
                  value="Save"
                  disabled={
                    stories.length > 0
                      ? users.length !==
                        Object.keys(stories[stories.length - 1].estimates)
                          .length
                      : false
                  }
                />
              </div>
            </form>
          </div>
          <div className="mt-2">
            <div className="text-center">
              <input
                className="rounded-lg border-2 border-yellow-500 bg-white text-yellow-500 hover:bg-yellow-100 text-lg font-semibold py-2 w-full cursor-pointer"
                type="button"
                value="Results"
                onClick={handleResultsSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointsSelection;
