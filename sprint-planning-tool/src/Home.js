import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'
function Home() {
    return (
        <div className = "home-container"> 
       <div className = "content-container">
        <div clasName="sign-up-btns">
            <button>
                <Link to='/setup'> 
                <li>Start</li>
                </Link>
            </button>  
        </div>
       </div>
        
            
        </div>
    )
}

export default Home
