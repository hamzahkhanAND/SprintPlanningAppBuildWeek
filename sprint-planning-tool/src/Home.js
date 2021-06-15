import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  return (
    <div className="container mx auto flex bg-yellow-200 h-screen w-screen sm:max-h-screen sm:max-w-screen">
      <div className="bg-yellow-200 flex sm:flex-row sm:items-center sm:justify-center w-screen flex-col justify-center space-y-4">
        <div className="w-auto h-auto flex flex-col items-center ml-16 w-8 sm:w-auto ">
          <div className=" container w-96 h-auto ">
            <h1 className=" text-4xl md:text-6xl font-bold break-words">
              Sprint To the end
            </h1>
          </div>
          <div className="mt-4 container w-96 h-auto ">
            <h2 className="text-2xl md:text-normal  break-words">
              Making sprint planning feel like a 100m Dash
            </h2>
          </div>
        </div>
        <div className="  ml-auto mr-auto ">
          <button className="create-game-btn flex items-center py-20 px-20">
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
