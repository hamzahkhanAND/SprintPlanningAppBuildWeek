import React from 'react'
import './PointsSelection.css';
import { useState } from "react"
import Container from '@material-ui/core/Container'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import TextField from '@material-ui/core/TextField';
// import uuidv4 from 'uuidv4';

function PointsSelection() {
    const [selectedPoints, setSelectedPoints] = useState("")
    
    // const [inputFields, setInputFields] = useState([
    //     { id: uuidv4(), Story: '', points: '' },
    //   ]);

    console.log(selectedPoints)



    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("InputFields", inputFields);
    //   };
    return (



        <div className="wrapper">
            <div className="left" >
                <div className="points-selection-header">
                    <div className="logo">
                        <img src="https://img.icons8.com/ios/452/running.png" />
                    </div>
                    <div className="join-btn">

                    </div>
                    <div className="display-name">

                    </div>
                </div>
                <h1> LEFT asdsansadjkjk asdjk sadjk jads jkasd jasd</h1>
                <div className="container">
                    <div className="grid">
                        <div onClick={()=>{setSelectedPoints(1)}} className="card">
                            <div className="card-text">
                                <h1>1</h1>
                            </div>

                        </div>
                        <div onClick={()=>{setSelectedPoints(2)}} className="card">
                            <div className="card-text">
                                <h1>2</h1>
                            </div>

                        </div>
                        <div onClick={()=>{setSelectedPoints(3)}} className="card">
                            <div className="card-text">
                                <h1>3</h1>
                            </div>

                        </div>
                        <div onClick={()=>{setSelectedPoints(5)}} className="card">
                            <div className="card-text">
                                <h1>5</h1>
                            </div>

                        </div>
                        <div onClick={()=>{setSelectedPoints(8)}} className="card">
                            <div className="card-text">
                                <h1>8</h1>
                            </div>

                        </div>
                        <div onClick={()=>{setSelectedPoints(13)}} className="card">
                            <div className="card-text">
                                <h1>13</h1>
                            </div>


                        </div>
                        <div onClick={()=>{setSelectedPoints(21)}} className="card">
                            <div className="card-text">
                                <h1>21</h1>
                            </div>

                        </div>
                        <div onClick={()=>{setSelectedPoints("P")}} className="card">
                            <div className="card-text">
                                <h1>P</h1>
                            </div>

                        </div>

                    </div>
                </div>
            </div>


            <div className="right" >
                <div className="text-area">
                    <h1>Add new member</h1>
                    <div className="story-field">

                        <TextareaAutosize aria-label="minimum height" rowsMin={3} placeholder="Minimum 3 rows" />
                    </div>
                    <div className="points-field">

                        <TextField
                            id="filled-number"
                            label="Number"
                            type="number"

                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                        />                </div>
                    <form>
                    </form>
                </div>
            </div>


        </div>







    )
}

export default PointsSelection
