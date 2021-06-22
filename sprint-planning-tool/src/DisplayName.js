import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import ErrorMsg from "./ErrorMsg";

function DisplayName(props) {
  const gameID = props.location.state.gameID;
  const [username, setUsername] = useState("");
  const [userNameErr, setUserNameErr] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [detectInvalidChar, setDetectInvalidChar] = useState(false);

  const handleSubmit = (e) => {
    if (!username) {
      e.target.reset();
      setUserNameErr(true);
      e.preventDefault();
    } else {
      e.preventDefault();

      firebase
        .firestore()
        .collection("games")
        .doc(gameID.toString())
        .collection("users")
        .doc(username)
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
          <div className="my-9 mb-3 flex flex-col">
            <div className="grid grid-cols-10 items-center">
              <div className="col-span-9">
                <input
                  type="text"
                  name="username"
                  placeholder="Display name"
                  maxLength="20"
                  required
                  className="rounded py-4 px-3 border w-full"
                  value={username}
                  onChange={(e) => {
                    console.log(e.target.value);
                    if (e.target.value.match(/[^A-Za-z-' ]/)) {
                      setDetectInvalidChar(true);
                    }
                    setUsername(e.target.value.replace(/[^A-Za-z-' ]/g, ""));
                    setCharacterCount(e.target.value.length);
                  }}
                />
              </div>
              <div className="text-right">
                <span>{characterCount}/20</span>
              </div>
            </div>
          </div>

          {detectInvalidChar && (
            <ErrorMsg
              message={{
                name: "Cannot enter any special characters outside of apostrophes ' and hyphens -",
              }}
            />
          )}

          <div className="my-9">
            <input
              type="submit"
              value="Let the race begin"
              className="rounded-lg bg-yellow-500 text-white text-2xl font-semibold py-4 px-9 w-full cursor-pointer hover:bg-yellow-400"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default DisplayName;
