import React from 'react'
import './PointsSelection.css';
import {useState} from "react"

function PointsSelection() {
const[points, setPoints] = useState("");
const[story, setStory] = useState("");
const[stories, setStories] = useState([]);

console.log(points)

const handleSubmit = (e)=>{
    e.preventDefault();
    const newStory={
        id:new Date().getTime(),
        text:story
    }
    setStories([...stories].concat(newStory))
    setStory("")
}
    return (

        <   div className="grid grid-cols-2">
            <div className="left-side">
                <div className="story-page-header">
                    <div className="logo">
                        <img src="https://lh3.googleusercontent.com/proxy/Pszg-4b0KJ8njZgI-j1UK5p2hiXx0Y_gYDK1zO8_zabMRZ81fPSqfSYDI4yy-XbPLc4fTFfR2avHUllzsng7tZDQelwG9XxqYn4Eai8jdCV1Pk4bxUPRAmNdsfOC_yCoB_9AabTHI5WBkLHAcDELuw" />
                    </div>
                    <div className="join-btn">
                        <button>
                            <li>Join Game</li>

                        </button>
                    </div>
                </div>

                <div>
                    board
                        </div>
                <div className="grid grid-cols-7">
                <div onClick={() => setPoints(1)} class="card">
                        <div class="container">
                        <h1>9</h1>

                        </div>
                    </div>
                    <div onClick={() => setPoints(3)} class="card">
                        <div class="container">
                        <h1>9</h1>

                        </div>
                    </div>
                    <div onClick={() => setPoints(5)} class="card">
                        <div class="container">
                         
                        <h1>9</h1>

                        </div>
                    </div>



                    <div onClick={() => setPoints(8)} class="card">
                        <div class="container">
                        <h1>9</h1>

                        </div>
                    </div>
                    <div onClick={() => setPoints(13)} class="card">
                        <div class="container">
                        <h1>9</h1>

                        </div>
                    </div>
                    <div onClick={() => setPoints(21)} class="card">
                        <div class="container">
                        <h1>9</h1>

                        </div>
                    </div>
                    <div onClick={() => setPoints(0)} class="card">
                        <div class="container">
                            <h1>9</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className="right-side">
                <div className="story-input">
                    <form onSubmit={handleSubmit}>
                        <input type="text" onChange={(e)=>setStory(e.target.value)} value={story}/>
                        <button type="submit">submit story</button>


                    </form>
                    {stories.map((data)=> <div key={story.id}>{data.text}</div>)}

                </div>


                <div className="story-btns">


                    <div className="add-stories-btn">
                        <button>
                            <li>Add stories</li>

                        </button>
                    </div>
                   
                
                </div>

                <div className="grid grid-cols-2">
                    <div>
                    <div className="reveal-stories-btn">
                        <button>
                            <li>Reveal stories</li>

                        </button>
                    </div>
                        </div>
                    <div>
                    <div className="exit-race-btn">
                        <button>
                            <li>Exit Race</li>

                        </button>
                    </div>
                        </div>
                </div>
            </div>
        </div>








    )
}

export default PointsSelection
