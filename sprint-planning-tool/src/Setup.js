import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import ErrorMsg from "./ErrorMsg";
function getRandomID(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function Setup(props) {
  const [gameName, setName] = useState("");
  const [gameNameErr, setGameNameErr] = useState(false);

  const handleSubmit = (e) => {
    if (!gameName) {
      setGameNameErr(true);
      e.preventDefault();
    } else {
      e.preventDefault();

      firebase
        .firestore()
        .collection("games")
        .doc(gameID.toString())
        .set({
          name: gameName,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });

      props.history.push({
        pathname: "/displayName",
        state: {
          gameID: gameID,
        },
      });
    }
  };
  var gameID = getRandomID(10000, 99999);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 text-left items-center h-screen p-6">
        <div className="md:mb-96">
          <p className="text-7xl lg:text-8xl font-normal">Set up</p>
          <p className="text-7xl lg:text-8xl font-normal">your</p>
          <p className="text-7xl lg:text-8xl font-normal">race</p>
        </div>

        <div className="md:mb-80">
          <form onSubmit={handleSubmit}>
            <div className="mb-2 my-9 grid grid-cols-5 items-center">
              <div>
                <label className="text-lg font-medium">Name Your Race</label>
              </div>
              <div className="col-span-4">
                <input
                  className="rounded border px-3 py-2 w-full"
                  type="text"
                  name="gameName"
                  placeholder="Race name"
                  value={gameName}
                  onChange={(e) =>
                    setName(e.target.value.replace(/[^\w\s]/gi, ""))
                  }
                />
              </div>
            </div>
            {gameNameErr && (
              <ErrorMsg message={{ name: "Please enter a valid game name" }} />
            )}

            <div className="my-9 grid grid-cols-5 items-center">
              <div>
                <label className="text-lg font-medium">Voting System</label>
              </div>
              <div className="col-span-4">
                <select className="rounded border px-3 py-2 w-full appearance-none">
                  <option value="fibonacci">Fibonacci</option>
                </select>
              </div>
            </div>

            <input
              type="submit"
              value="Create Race"
              className="rounded-lg bg-yellow-500 text-white text-2xl font-semibold py-3 w-full cursor-pointer hover:bg-yellow-400"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Setup;
