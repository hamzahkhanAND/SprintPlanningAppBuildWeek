import React from "react";
// import './PointsSelection.css';
import { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import firebase from "firebase/app";
import "firebase/firestore";
// import uuidv4 from 'uuidv4';

function PointsSelection(props) {

    const randomGameID = props.location.state.value
    const displayName = props.location.state.displayName
    const [estimate, setEstimate] = useState("");
    const [userStory, setUserStory] = useState("");

    const handleStorySubmit = (e) => {
        e.preventDefault();
        
        firebase.firestore().collection("games").doc(randomGameID.toString()).collection("userStories").doc("1").set({
            userStory : userStory
        })



    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        firebase.firestore().collection("games").doc(randomGameID.toString()).collection("userStories").doc("1").collection("estimate").doc(displayName).set({
                        estimate: estimate
                    })
                    .then((docRef) => {
                        console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);

                    })
                    
    }

    const getStory = (e) => {
        e.preventDefault();

        firebase.firestore().collection("games").doc(randomGameID.toString()).collection("userStories").doc("1").get().then(doc => {
        setUserStory(doc.data().userStory);
        })
    }






//   const [selectedPoints, setSelectedPoints] = useState("");

  // const [inputFields, setInputFields] = useState([
  //     { id: uuidv4(), Story: '', points: '' },
  //   ]);

//   console.log("In main" + selectedPoints);
//   const randomGameID = props.location.state.value;
//   console.log(randomGameID);

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("InputFields", inputFields);
  //   };
  // <div className="wrapper">
  //     <div className="left" >
  //         <div className="points-selection-header">
  //             <div className="logo">
  //                 <img src="https://img.icons8.com/ios/452/running.png" />
  //             </div>
  //             <div className="join-btn">
  
  //             </div>
  //             <div className="display-name">
  
  //             </div>
  //         </div>
  //         <h1> LEFT asdsansadjkjk asdjk sadjk jads jkasd jasd</h1>
  //         <div className="container">
  //             <div className="grid">
  //                 <div onClick={() => {
      //                     setSelectedPoints(1)
      //                     console.log("In On Click" + selectedPoints)
      //                     firebase.firestore().collection("games/" + randomGameID + "/userStories").doc("UserStory").set({
          //                         estimate: selectedPoints,
          //                     })
          //                         .then((docRef) => {
              //                             console.log("Document successfully written!");
              //                         })
              //                         .catch((error) => {
                  //                             console.error("Error writing document: ", error);
                  
                  //                         })
                  //                 }} className="card">
                  //                     <div className="card-text">
                  //                         <h1>1</h1>
                  //                     </div>
                  
                  //                 </div>
                  //                 <div onClick={() => { setSelectedPoints(2) }} className="card">
                  //                     <div className="card-text">
                  //                         <h1>2</h1>
                  //                     </div>
                  
                  //                 </div>
                  //                 <div onClick={() => { setSelectedPoints(3) }} className="card">
                  //                     <div className="card-text">
                  //                         <h1>3</h1>
                  //                     </div>
                  
                  //                 </div>
                  //                 <div onClick={() => { setSelectedPoints(5) }} className="card">
                  //                     <div className="card-text">
                  //                         <h1>5</h1>
                  //                     </div>
                  
                  //                 </div>
                  //                 <div onClick={() => { setSelectedPoints(8) }} className="card">
                  //                     <div className="card-text">
                  //                         <h1>8</h1>
                  //                     </div>
                  
                  //                 </div>
                  //                 <div onClick={() => { setSelectedPoints(13) }} className="card">
                  //                     <div className="card-text">
                  //                         <h1>13</h1>
                  //                     </div>
                  
                  //                 </div>
                  //                 <div onClick={() => { setSelectedPoints(21) }} className="card">
                  //                     <div className="card-text">
                  //                         <h1>21</h1>
                  //                     </div>
                  
                  //                 </div>
                  //                 <div onClick={() => { setSelectedPoints("P") }} className="card">
                  //                     <div className="card-text">
                  //                         <h1>P</h1>
                  //                     </div>
                  
                  //                 </div>
                  
                  //             </div>
                  //         </div>
                  //     </div>
                  
                  //     <div className="right" >
                  //         <div className="text-area">
                  //             <h1>Add new member</h1>
                  //             <div className="story-field">
                  
                  //                 <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows" />
                  //             </div>
                  //             <div className="points-field">
                  
                  //                 <TextField
                  //                     id="filled-number"
                  //                     label="Number"
                  //                     type="number"
                  
                  //                     InputLabelProps={{
                      //                         shrink: true,
                      //                     }}
                      //                     variant="filled"
                      //                 />                </div>
                      //             <form>
                      //             </form>
                      //         </div>
                      //     </div>
                      
                      // </div>
                      
    return (
    <div className="container mx-auto">
        <p>Game PIN : {randomGameID} </p>
        <form onSubmit = {handleSubmit}>
            <div className="radio">
                <label>
                    <input type="radio" value="1" name="estimate" onChange={(e) => setEstimate(e.target.value)}  />
                    1
                </label>
            </div>
            <div className="radio">
                <label>
                    <input type="radio" value="2" name="estimate" onChange={(e) => setEstimate(e.target.value)} />
                    2
                </label>
            </div>
            <div className="radio">
                <label>
                    <input type="radio" value="3" name="estimate" onChange={(e) => setEstimate(e.target.value)} />
                    3
                </label>
            </div>
            <div className="radio">
                <label>
                    <input type="radio" value="5" name="estimate" onChange={(e) => setEstimate(e.target.value)} />
                    5
                </label>
            </div>
            <div className="radio">
                <label>
                    <input type="radio" value="8" name="estimate" onChange={(e) => setEstimate(e.target.value)} />
                    8
                </label>
            </div>
            <div className="radio">
                <label>
                    <input type="radio" value="13" name="estimate" onChange={(e) => setEstimate(e.target.value)} />
                    13
                </label>
            </div>
            <div className="radio">
                <label>
                    <input type="radio" value="21" name="estimate" onChange={(e) => setEstimate(e.target.value)} />
                    21
                </label>
            </div>
            <input type="submit" value="Submit" name="estimate" />
        </form>

        <form onSubmit = {handleStorySubmit}>
            <label>Add user story</label>
            <input type="text" name="userStory" placeholder="User story" value={userStory} onChange={(e) => setUserStory(e.target.value)} />
            <input type="submit" value="Add" />
        </form>


        <form onSubmit = {getStory}>
            <input type="submit" value="Show user story" />
        </form>

        <div>
            {userStory}
        </div>

    </div>
  );
}

export default PointsSelection;
