import React, { useState } from 'react'
import firebase from "firebase/app";
import "firebase/firestore";
// import {Link} from 'react-router-dom'
// import nextId from "react-id-generator";

function getRandomID(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function Setup(props) {
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
        props.history.push({
            pathname: '/displayName',
            state: {
                value : randomGameID   // pass the extracted url params here
                 } // your data array of objects
          })
            
    }
    var randomGameID = getRandomID(10000, 99999);
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 text-left items-center h-screen p-6">
                <div className="md:mb-96">
                    <p className="text-7xl lg:text-8xl font-normal">Set up</p>
                    <p className="text-7xl lg:text-8xl font-normal">your</p>
                    <p className="text-7xl lg:text-8xl font-normal">race</p>
                </div>

                <div className="md:mb-80">
                    <form onSubmit = {handleSubmit}>
                        <div className="my-9">
                            <label className="text-lg font-medium">Name Your Race
                                <input
                                className="rounded border px-3 py-2 ml-2 w-2/4 lg:w-3/4"
                                type="text" 
                                name="raceName"
                                placeholder="Race name"
                                value ={gameName}
                                onChange={(e) => setName(e.target.value)} />
                            </label>
                        </div>

                        <div className="my-9">
                            <label className="text-lg font-medium">Voting System
                                <select className="rounded border px-3 py-2 ml-6 w-2/4 lg:w-3/4">
                                    <option value="fibonacci">Fibonacci</option>
                                </select>
                            </label>
                        </div>

                        <input type="submit" value="Create Race" className="rounded-full bg-yellow-500 text-white text-2xl font-semibold py-3 w-full cursor-pointer" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Setup;
