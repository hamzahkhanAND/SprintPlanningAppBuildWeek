import React from 'react'
import firebase from "firebase/app";
import "firebase/firestore";
import {Link} from 'react-router-dom'

function Setup() {
    return (
        <div>
            <h1>Set up your race</h1>
            <form>
                <label>Name Your Race
                    <input type="text" name="raceName" />
                </label>
                <label>Voting System
                    <select>
                        <option value="fibonacci">Fibonacci</option>
                    </select>
                </label>
                <input type="submit" value="Create Race"
                    onClick = {firebase.firestore().collection("users").add({
                        name: "Alan",
                    })
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    })
                    
                }
                />
            </form>
        </div>
    )
}

export default Setup;
