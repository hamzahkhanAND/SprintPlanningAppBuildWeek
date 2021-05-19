import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
   return (
      <div className = "content-container">
 
<div className="slogan">
          <h1>Sprint to the end</h1>
          <h3>Making sprint planning feel like a 100 meter dash</h3>
 
      </div>
       <div className="start-btn">
           <button>
               <Link to='/setup'>
               <li>Start</li>
               </Link>
           </button> 
      </div>
 
 
      
          
       </div>
   )
}
 
export default Home