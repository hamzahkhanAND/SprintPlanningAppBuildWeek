import React from "react";
import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { Link } from "react-router-dom";

function Results(props) {
  const gameID = props.location.state.gameID;
  const numberOfStories = props.location.state.numberOfStories;
  const [stories, setStories] = useState([]);
  const [estimates, setEstimates] = useState([]);
  const [gameName, setGameName] = useState("");
  const [users, setUsers] = useState([]);

  const getResultsTable = () => {
    let results = [];

    for (let i = 0; i < numberOfStories; i++) {
      results.push(
        <p className="text-2xl font-semibold text-left my-4">{stories[i]}</p>
      );
      for (let j = 0; j < users.length; j++) {
        results.push(
          <div className="grid grid-cols-2 gap-80 text-xl">
            <div className="m-2 text-left">{estimates[i][j][0]}</div>
            <div>{estimates[i][j][1]}</div>
          </div>
        );
      }
    }

    return results;
  };

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

    function getResults() {
      for (let i = 1; i < numberOfStories + 1; i++) {
        firebase
          .firestore()
          .collection("games")
          .doc(gameID.toString())
          .collection("userStories")
          .doc(i.toString())
          .get()
          .then((doc) => {
            const story = doc.data().name;
            setStories((stories) => [...stories, story]);
          });

        firebase
          .firestore()
          .collection("games")
          .doc(gameID.toString())
          .collection("userStories")
          .doc(i.toString())
          .collection("estimates")
          .onSnapshot((querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
              data.push([doc.data().username, doc.data().points]);
            });
            setEstimates((estimates) => [...estimates, data]);
          });
      }
    }

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

    getGameName();
    getResults();
    getUsers();
  }, [gameID, numberOfStories]);

  return (
    <div className="container mx-auto m-20">
      <div className="flex flex-col items-center justify-center text-center h-screen">
        <div className="text-5xl font-semibold mb-6">{gameName}</div>
        <div className="mb-6">{getResultsTable()}</div>

        <div className="grid">
          <div>
            <Link to="/">
              <input
                className="rounded-full bg-yellow-500 text-white text-xl font-semibold py-3 px-6 mb-3 w-full cursor-pointer"
                type="submit"
                value="Start new game"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
