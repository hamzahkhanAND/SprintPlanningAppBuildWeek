import React from "react";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "./PointsSelection.css";

function PointsSelection(props) {
  const gameID = props.location.state.gameID;
  const username = props.location.state.username;
  const [userStory, setUserStory] = useState("");
  const [userStoryErr, setUserStoryErr] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  const [userStories, setUserStories] = useState([]);
  const [estimate, setEstimate] = useState("");
  const [userEstimates, setUserEstimates] = useState([]);
  const [users, setUsers] = useState([]);
  const [gameName, setGameName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [addStoryDisable, setAddStoryDisable] = useState(true);
  const [finalPointsDisabled, setFinalPointsDisabled] = useState(true);
  const [finalStoryPoints, setFinalStoryPoints] = useState("");

  // Function to get current gameID.
  useEffect(() => {
    function getGameName() {
      firebase
        .firestore()
        .collection("games")
        .doc(gameID.toString())
        .get()
        .then((doc) => {
          const data = doc.data().name;
          setGameName(data);
        });
    }

    // Function to retrieve user story from Firebase.
    function getStories() {
      firebase
        .firestore()
        .collection("games")
        .doc(gameID.toString())
        .collection("userStories")
        .onSnapshot((querySnapshot) => {
          const stories = [];
          querySnapshot.forEach((doc) => {
            stories.push([
              doc.data().id,
              doc.data().name,
              doc.data().storyPoints,
            ]);
          });
          setUserStories(stories);
        });
    }

    // Function to retrieve user estimates
    function getUserEstimates() {
      firebase
        .firestore()
        .collection("games")
        .doc(gameID.toString())
        .collection("userStories")
        .doc(userStories.length.toString())
        .collection("estimates")
        .onSnapshot((querySnapshot) => {
          const estimates = [];
          querySnapshot.forEach((doc) => {
            estimates.push([doc.data().username, doc.data().points]);
          });
          setUserEstimates(estimates);
          if (users.length === estimates.length || userStories.length === 0) {
            setAddStoryDisable(false);
            setFinalPointsDisabled(false);
            setDisabled(true);
          } else {
            setAddStoryDisable(true);
            setFinalPointsDisabled(true);
            setDisabled(false);
          }
        });
    }

    //Function to retrieve number of users in game
    function getUsers() {
      firebase
        .firestore()
        .collection("games")
        .doc(gameID.toString())
        .collection("users")
        .onSnapshot((querySnapshot) => {
          const users = [];
          querySnapshot.forEach((doc) => {
            users.push(doc.data().username);
          });
          setUsers(users);
        });
    }

    getStories();
    getUserEstimates();
    getGameName();
    getUsers();
  }, [gameID, userStories.length, users.length]);

  // Pushes params onto next page
  const handleResultsSubmit = (e) => {
    e.preventDefault();

    props.history.push({
      pathname: "/results",
      state: {
        gameName: gameName,
        userStories: userStories,
      },
    });
  };

  // Function that adds user story to Firebase
  const handleUserStorySubmit = (e) => {
    if (!userStory) {
      setTimeout(() => setUserStoryErr(true), 1000);
      e.preventDefault();
    } else {
      e.preventDefault();

      firebase
        .firestore()
        .collection("games")
        .doc(gameID.toString())
        .collection("userStories")
        .doc((userStories.length + 1).toString())
        .set({
          name: userStory,
          id: (userStories.length + 1).toString(),
          storyPoints: "",
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      setUserStory("");
      setUserEstimates([]);
    }
  };

  // Function that adds estimate to story
  const handleEstimateSubmit = (e) => {
    e.preventDefault();

    firebase
      .firestore()
      .collection("games")
      .doc(gameID.toString())
      .collection("userStories")
      .doc(userStories.length.toString())
      .collection("estimates")
      .doc(username)
      .set({
        username: username,
        points: estimate,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
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
        storyPoints: finalStoryPoints,
      })
      .then(() => {
        console.log("Document successfully updated");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  const handleExitGame = (e) => {
    e.preventDefault();

    firebase
      .firestore()
      .collection("games")
      .doc(gameID.toString())
      .collection("users")
      .doc(username)
      .delete()
      .then(() => {
        console.log("Document successfully deleted");
        props.history.push({
          pathname: "/",
        });
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
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
              {userStories.length > 0
                ? userStories[userStories.length - 1][1]
                : "No stories"}
            </p>
          </div>
          <div className="lg:text-right">
            <p className="text-xl font-semibold">Game PIN: {gameID}</p>
            <p className="text-xl font-medium">{username}</p>
          </div>
          <div className="col-span-2 text-xl font-semibold text-center">
            {userEstimates.length > 0 ? "Votes" : "No Votes"}
          </div>
          <div className="grid grid-cols-5 col-span-2 text-center gap-20 mb-80">
            {userEstimates.map((estimate) =>
              users.length === userEstimates.length ? (
                <div key={estimate[0]}>
                  <label className="border-solid border-2 rounded-lg border-yellow-500 text-yellow-500 px-6 py-8">
                    <span className="text-lg font-bold">{estimate[1]}</span>
                  </label>
                  <div className="text-lg font-medium mt-8">{estimate[0]}</div>
                </div>
              ) : (
                <div key={estimate[0]}>
                  <label className="border-solid border-2 rounded-lg border-yellow-500 px-6 py-8 bg-yellow-500"></label>
                  <div className="text-lg font-medium mt-8">{estimate[0]}</div>
                </div>
              )
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
                disabled={disabled}
              />
            </div>
          </form>
        </div>
        <div className="ml-20">
          <p className="text-xl font-semibold mb-2">Stories</p>
          <div className="overflow-auto h-3/5">
            {userStories.map((story) => (
              <div
                className={`p-6 mb-6 mr-2 rounded-lg ${
                  story === userStories[userStories.length - 1]
                    ? "bg-yellow-200"
                    : "bg-gray-100"
                }`}
              >
                <div className="grid grid-cols-2">
                  <div className="text-lg font-normal">{story[1]}</div>
                  <div className="text-lg font-normal text-right">
                    {story[2]}
                  </div>
                </div>
                <form onSubmit={handleStoryPointSubmit(story[0])}>
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
                      story === userStories[userStories.length - 1]
                        ? "bg-yellow-500 text-white hover:bg-yellow-400"
                        : "bg-gray-300 text-black hover:bg-gray-200"
                    }`}
                    type="submit"
                    value="Save"
                    disabled={finalPointsDisabled}
                  />
                </form>
              </div>
            ))}
          </div>
          <div>
            <form onSubmit={handleUserStorySubmit}>
              <div className="mt-2 grid grid-cols-5 items-center">
                <div className="col-span-4">
                  <input
                    className="rounded border p-4 w-full"
                    type="text"
                    name="userStory"
                    placeholder="Enter a title for the user story"
                    value={userStory}
                    required
                    maxLength="50"
                    onChange={(e) => {
                      setUserStory(e.target.value);
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
                  disabled={addStoryDisable}
                />
              </div>
            </form>
          </div>
          <div className="grid grid-cols-2 mt-2 gap-4">
            <div className="text-center">
              <input
                className="rounded-lg border-2 border-yellow-500 bg-white text-yellow-500 hover:bg-yellow-100 text-lg font-semibold py-2 w-full cursor-pointer"
                type="submit"
                value="Results"
                onClick={handleResultsSubmit}
              />
            </div>
            <div className="text-center">
              <input
                className="rounded-lg border-2 border-yellow-500 bg-white text-yellow-500 hover:bg-yellow-100 text-lg font-semibold py-2 w-full cursor-pointer"
                type="submit"
                value="Exit game"
                onClick={handleExitGame}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointsSelection;
