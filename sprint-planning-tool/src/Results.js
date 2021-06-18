import React from "react";
import "firebase/firestore";
import { Link } from "react-router-dom";

function Results(props) {
  const gameName = props.location.state.gameName;
  const userStories = props.location.state.userStories;

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center">
        <p className="text-center text-5xl font-semibold mb-12">{gameName}</p>
        <div className="text-center mb-12">
          <table class="table-auto">
            <thead>
              <tr>
                <th className="p-4 text-2xl font-semibold">Story</th>
                <th className="p-4 text-2xl font-semibold">Points</th>
              </tr>
            </thead>
            <tbody>
              {userStories.map((story) => (
                <tr>
                  <td className="p-4">{story[1]}</td>
                  <td className="p-4">{story[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center">
        <Link to="/">
          <input
            className="rounded-lg bg-yellow-500 text-white text-xl font-semibold py-3 px-6 cursor-pointer hover:bg-yellow-400"
            type="Submit"
            value="Start New Game"
          />
        </Link>
      </div>
    </div>
  );
}

export default Results;
