import React, { useState } from 'react'
import firebase from "firebase/app";
import "firebase/firestore";
import {Link} from 'react-router-dom'
import nextId from "react-id-generator";

function getRandomID(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function Setup() {
    const [gameName, setName] = useState("");
    const [loader, setLoader] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true)

        firebase.firestore().collection("games").doc(randomGameID.toString()).set({
                        name: gameName,
                    })
                    .then((docRef) => {
                        console.log("Document successfully written!");
                        setLoader(false);
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);

                    })

        setName("");
            
    }
    var randomGameID = getRandomID(10000, 99999);
    return (
        <div>
            <h1>Set up your race</h1>
            <form onSubmit = {handleSubmit}>
                <label>Name Your Race
                    <input type="text" 
                    name="raceName"
                    value ={gameName}
                    onChange={(e) => setName(e.target.value)} />
                </label>
                <label>Voting System
                    <select>
                        <option value="fibonacci">Fibonacci</option>
                    </select>
                </label>
                <input type="submit" value="Create Race"
                //     onClick = {firebase.firestore().collection("games").doc(randomGameID.toString()).set({
                //         name:'Game Blah'
                //     })
                //     .then((docRef) => {
                //         console.log("Document successfully written!");
                //     })
                //     .catch((error) => {
                //         console.error("Error writing document: ", error);

                //     })
                    
                // }
                />
            </form>
        </div>
    )
}

export default Setup;
