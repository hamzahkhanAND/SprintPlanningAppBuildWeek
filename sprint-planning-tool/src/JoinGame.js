import React, { useState } from "react";

function JoinGame(props) {
  const [gameID, setGameID] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    props.history.push({
      pathname: "/displayName",
      state: {
        gameID: gameID,
      },
    });
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center text-center h-screen">
        <form onSubmit={handleSubmit}>
          <div className="my-9">
            <label className="text-3xl md:text-5xl font-semibold">
              Enter Game PIN
            </label>
          </div>
          <div className="my-9">
            <input
              type="text"
              name="gameID"
              placeholder="Game PIN"
              className="rounded py-4 px-3 border w-3/4"
              value={gameID}
              onChange={(e) => setGameID(e.target.value)}
            />
          </div>
          <div className="my-9">
            <input
              type="submit"
              value="Join Game"
              className="rounded-lg bg-yellow-500 text-white text-2xl font-semibold py-4 px-9 w-3/4 cursor-pointer hover:bg-yellow-400"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default JoinGame;
