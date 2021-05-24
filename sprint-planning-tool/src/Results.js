import React from "react";
import {Link} from 'react-router-dom'


function Results(props) {
  const userStories = props.location.state.userStories;
  const userEstimates = props.location.state.userEstimates;
  const gameName = props.location.state.gameName;


  const storyItems = userStories.map((story) => <span key={story}>{story}</span>);
  const userVotedItems = userEstimates.map((estimate) => (
    <div className="grid grid-cols-2" key={estimate[0]}>
        <div>
            {estimate[0]}
        </div>
        <div>
            {estimate[1]}
        </div>
    </div>
  ));

  return (
    <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center text-center h-screen">
            <div className="text-5xl font-semibold mb-6">{gameName}</div>
            <div className="text-2xl font-semibold mb-6"><span className="font-normal">User Story:</span> {storyItems}</div>
            <div className="text-2xl w-3/4 mb-6">
                {userVotedItems}
            </div>

            <div>
                <Link to="/">
                    <input className="rounded-full bg-yellow-500 text-white text-xl font-semibold py-3 px-6 w-full cursor-pointer" type="submit" value="Start new game" />  
                </Link>
          </div>
        </div>
    </div>
  );
}

export default Results;
