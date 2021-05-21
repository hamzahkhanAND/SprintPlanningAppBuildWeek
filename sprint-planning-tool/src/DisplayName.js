import React, { useState } from 'react'
import firebase from "firebase/app";
import "firebase/firestore";

function DisplayName(props) {

    const randomGameID = props.location.state.value
    const [userName, setUserName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        

        firebase.firestore().collection("games/"+ randomGameID + "/users").doc(userName).set({
                        name: userName,
                    })
                    .then((docRef) => {
                        console.log("Document successfully written!");
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);

                    })
                    

        setUserName("");
        // props.history.push({
        //     pathname: '/displayName',
        //     state: {
        //         value : randomGameID   // pass the extracted url params here
        //          } // your data array of objects
        //   })
            
    }

    console.log(randomGameID)
    return (
        <div className="container mx-auto">
        <div className="flex items-center justify-center text-center h-screen">
            <form onSubmit = {handleSubmit}>
                <div className="my-9">
                    <label className="text-3xl md:text-5xl font-semibold">Choose your display name</label>
                </div>
                <div className="my-9">
                    <input type="text" name="displayName" placeholder="Display name" className="rounded py-4 px-3 border w-3/4" value ={userName}
                    onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="my-9">
                    <input type="submit" value="Let the race begin" className="rounded-full bg-yellow-500 text-white text-2xl font-semibold py-4 px-9 w-3/4 cursor-pointer" />
                </div>
            </form>
        </div>
        </div>
    )
}

export default DisplayName;
