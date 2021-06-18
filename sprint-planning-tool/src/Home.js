import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  return (
    <div className="mx-auto flex bg-yellow-200 h-screen max-w-screen sm:max-h-screen sm:max-w-screen relative">
      <div className="absolute top-0 right-0  w-auto h-auto px-4">
        <button className="join-game-btn flex items-center justify-center rounded ">
          <Link to="/joinGame">
            <h1>Join Game</h1>
          </Link>
        </button>
      </div>
      <div className="bg-yellow-200 flex sm:flex-row sm:items-center sm:justify-center w-screen flex-col justify-center space-y-4">
        <div className="w-auto h-auto flex flex-col items-center ml-16 sm:w-auto ">
          <div className=" container w-96 h-auto ">
            <h1 className=" text-4xl md:text-6xl font-bold break-words">
              Sprint To the end
            </h1>
          </div>
          <div className="mt-4 container w-80 sm:w-96 h-auto ">
            <h2 className="sm:text-2xl text-normal">
              Making sprint planning feel like a 100m Dash
            </h2>
          </div>
        </div>
        <div className="ml-auto mr-auto">
          <button className="create-game-btn flex items-center justify-center py-16 px-8 sm:py-20 sm:px-20">
            <Link to="/setup">
              <h1>Create Game</h1>
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
