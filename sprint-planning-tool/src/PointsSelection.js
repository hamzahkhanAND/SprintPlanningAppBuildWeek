import React from "react";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "./PointsSelection.css";
import ErrorMsg from "./ErrorMsg";

function PointsSelection(props) {
  const gameID = props.location.state.gameID;
  const username = props.location.state.username;
  const [userStory, setUserStory] = useState("");
  const [userStoryErr, setUserStoryErr] = useState(false);

  const [userStories, setUserStories] = useState([]);
  const storyItems = userStories.map((story) => <p key={story}>{story}</p>);
  const [estimate, setEstimate] = useState("");
  const estimateID = new Date().getTime();
  const [userEstimates, setUserEstimates] = useState([]);
  const [currentStory, setCurrentStory] = useState("");
  const [users, setUsers] = useState([]);
  const userVotedItems = userEstimates.map((estimate) => (
    <span key={estimate[0]}>{estimate[0]}, </span>
  ));
  const [gameName, setGameName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [addStoryDisable, setAddStoryDisable] = useState(true);

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
            stories.push(doc.data().name);
          });
          setUserStories(stories);
          if (stories.length > 0) {
            setDisabled(false);
          } else {
            setDisabled(true);
          }
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
          } else {
            setAddStoryDisable(true);
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
        userEstimates: userEstimates,
      },
    });
  };

  // Function that adds user story to Firebase
  const handleUserStorySubmit = (e) => {
    if (!userStory) {
      setUserStoryErr(true);
      e.preventDefault();
    } else {
      e.preventDefault();

      firebase
        .firestore()
        .collection("games")
        .doc(gameID.toString())
        .collection("userStories")
        .doc(userStories.length.toString())
        .set({
          name: userStory,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      setCurrentStory(userStory);
      setUserStory("");
      // setUserStoryCount();
      setUserEstimates([]);

      console.log("This is userStoryCount " + userStories.length);
      console.log("Current Story: " + currentStory);
    }
  };

  // Function that adds estimate to story
  const handleSubmit = (e) => {
    e.preventDefault();

    firebase
      .firestore()
      .collection("games")
      .doc(gameID.toString())
      .collection("userStories")
      .doc(userStories.length.toString())
      .collection("estimates")
      .doc(estimateID.toString())
      .set({
        username: username,
        points: estimate,
      })
      .then(() => {
        console.log("Document successfully written!");
        console.log("This is voted items ");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    console.log("This is user estimates length: " + userEstimates.length);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center h-screen p-6">
        <div className="col-span-2">
          <div className="grid grid-cols-2">
            <p className="text-left text-5xl font-semibold">{gameName}</p>
            <p className="text-right text-3xl font-semibold">
              Game PIN: {gameID}
            </p>
            <p className="text-2xl font-semibold">Voting on: {currentStory}</p>
            <p className=" text-xl font-medium">{username}</p>
          </div>

          <div className="text-center my-9 text-xl">
            <p>Player Votes</p>
            <div className="font-semibold">{userVotedItems}</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 lg:grid-cols-8 items-center my-16 gap-12">
              <div>
                <input
                  className="hidden"
                  id="radio_1"
                  type="radio"
                  value="1"
                  name="estimate"
                  onChange={(e) => setEstimate(e.target.value)}
                />
                <label
                  className="px-8 py-12 rounded-lg border-2 border-grey-400 cursor-pointer"
                  for="radio_1"
                >
                  <span className="font-semibold text-3xl">1</span>
                </label>
              </div>
              <div>
                <input
                  className="hidden"
                  id="radio_2"
                  type="radio"
                  value="2"
                  name="estimate"
                  onChange={(e) => setEstimate(e.target.value)}
                />
                <label
                  className="px-8 py-12 rounded-lg border-2 border-grey-400 cursor-pointer"
                  for="radio_2"
                >
                  <span className="font-semibold text-3xl">2</span>
                </label>
              </div>
              <div>
                <input
                  className="hidden"
                  id="radio_3"
                  type="radio"
                  value="3"
                  name="estimate"
                  onChange={(e) => setEstimate(e.target.value)}
                />
                <label
                  className="px-8 py-12 rounded-lg border-2 border-grey-400 cursor-pointer"
                  for="radio_3"
                >
                  <span className="font-semibold text-3xl">3</span>
                </label>
              </div>
              <div>
                <input
                  className="hidden"
                  id="radio_5"
                  type="radio"
                  value="5"
                  name="estimate"
                  onChange={(e) => setEstimate(e.target.value)}
                />
                <label
                  className="px-8 py-12 rounded-lg border-2 border-grey-400 cursor-pointer"
                  for="radio_5"
                >
                  <span className="font-semibold text-3xl">5</span>
                </label>
              </div>
              <div>
                <input
                  className="hidden"
                  id="radio_8"
                  type="radio"
                  value="8"
                  name="estimate"
                  onChange={(e) => setEstimate(e.target.value)}
                />
                <label
                  className="px-8 py-12 rounded-lg border-2 border-grey-400 cursor-pointer"
                  for="radio_8"
                >
                  <span className="font-semibold text-3xl">8</span>
                </label>
              </div>
              <div>
                <input
                  className="hidden"
                  id="radio_13"
                  type="radio"
                  value="13"
                  name="estimate"
                  onChange={(e) => setEstimate(e.target.value)}
                />
                <label
                  className="px-8 py-12 rounded-lg border-2 border-grey-400 cursor-pointer"
                  for="radio_13"
                >
                  <span className="font-semibold text-3xl">13</span>
                </label>
              </div>
              <div>
                <input
                  className="hidden"
                  id="radio_21"
                  type="radio"
                  value="21"
                  name="estimate"
                  onChange={(e) => setEstimate(e.target.value)}
                />
                <label
                  className="px-8 py-12 rounded-lg border-2 border-grey-400 cursor-pointer"
                  for="radio_21"
                >
                  <span className="font-semibold text-3xl">21</span>
                </label>
              </div>
              <div>
                <input
                  className="hidden"
                  id="radio_pass"
                  type="radio"
                  value="?"
                  name="estimate"
                  onChange={(e) => setEstimate(e.target.value)}
                />
                <label
                  className="px-8 py-12 rounded-lg border-2 border-grey-400 cursor-pointer"
                  for="radio_pass"
                >
                  <span className="font-semibold text-3xl">?</span>
                </label>
              </div>
            </div>
            <div className="text-center mt-16">
              <input
                className="rounded-full bg-yellow-500 text-white text-xl font-semibold py-2 w-full cursor-pointer"
                type="submit"
                value="Add estimate"
                name="estimate"
                disabled={disabled}
              />
            </div>
          </form>
        </div>

        <div className="text-center my-9 text-xl font-semibold">
          <div>
            <span className="font-normal">User Stories</span> {storyItems}
          </div>

          <div className="mt-36">
            <form onSubmit={handleUserStorySubmit}>
              <div>
                <input
                  className="mb-4 rounded border w-3/4 p-2"
                  type="text"
                  name="userStory"
                  placeholder="Enter user story"
                  value={userStory}
                  onChange={(e) =>
                    setUserStory(e.target.value.replace(/[^\w\s]/gi, ""))
                  }
                />
              </div>
              {userStoryErr && (
                <ErrorMsg
                  message={{ name: "Please enter a valid user story" }}
                />
              )}

              <div className="my-3">
                <input
                  className="rounded-full bg-yellow-500 text-white text-xl font-semibold py-2 w-3/4 cursor-pointer"
                  type="submit"
                  value="Add story"
                  disabled={addStoryDisable}
                />
              </div>
            </form>
          </div>

          <div>
            <input
              className="rounded-full bg-green-500 text-white text-xl font-semibold py-2 w-3/4 cursor-pointer"
              type="submit"
              value="Show results"
              onClick={handleResultsSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointsSelection;
