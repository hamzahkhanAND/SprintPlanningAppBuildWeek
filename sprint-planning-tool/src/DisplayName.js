import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import ErrorMsg from "./ErrorMsg";

function DisplayName(props) {
  const gameID = props.location.state.gameID;
  const [username, setUsername] = useState("");
  const [userNameErr, setUserNameErr] = useState(false);

  const userID = new Date().getTime();

  const handleSubmit = (e) => {
    if (!username) {
      setUserNameErr(true);
      e.preventDefault();
    } else {
      e.preventDefault();

      firebase
        .firestore()
        .collection("games")
        .doc(gameID.toString())
        .collection("users")
        .doc(userID.toString())
        .set({
          username: username,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });

      props.history.push({
        pathname: "/points",
        state: {
          gameID: gameID,
          username: username,
        },
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center text-center h-screen">
        <form onSubmit={handleSubmit}>
          <div className="my-9">
            <label className="text-3xl md:text-5xl font-semibold">
              Choose your display name
            </label>
          </div>
          <div className="my-9 mb-3">
            <input
              type="text"
              name="username"
              placeholder="Display name"
              className="rounded py-4 px-3 border w-3/4"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value.replace(/[^\w\s]/gi, ""))
              }
            />
          </div>

          {userNameErr && (
            <ErrorMsg message={{ name: "Please enter a valid name" }} />
          )}

          <div className="my-9">
            <input
              type="submit"
              value="Let the race begin"
              className="rounded-full bg-yellow-500 text-white text-2xl font-semibold py-4 px-9 w-3/4 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default DisplayName;
