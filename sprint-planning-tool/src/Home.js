import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css';
function Home() {
   return (
    <div className="Home">
        
   <div className = "Header">
     <div className = "logo">
     <img src="https://lh3.googleusercontent.com/proxy/Pszg-4b0KJ8njZgI-j1UK5p2hiXx0Y_gYDK1zO8_zabMRZ81fPSqfSYDI4yy-XbPLc4fTFfR2avHUllzsng7tZDQelwG9XxqYn4Eai8jdCV1Pk4bxUPRAmNdsfOC_yCoB_9AabTHI5WBkLHAcDELuw" />
     </div>
     <div className="join-btn">
           <button>
               <Link to='/joinGame'>
               <li>Join Game</li>
               </Link>
           </button> 
      </div>
      </div>
      <div className = "centre-content">
<div className="slogan">
  <div className="slogan-main">
  <h1 class="text-9xl font-semibold  ...">Sprint to the end</h1>

  </div>
  <div className="slogan-small">
  <h3 class="text-5xl font-normal color-#E5E7EB ...">Making sprint feel like a 100 meter dash</h3>

  </div>



      </div>
      
  
       <div className="start-btn">
           <button>
               <Link to='/setup'>
               <li>Create Game</li>
               </Link>
           </button> 
      </div>

 

      </div>
     <div className="footer">
        <nav>
          <a href="home">Contact us</a>
          <a href="home">Services</a>
          <a href="home">Terms and conditions</a>
        </nav>
     </div>
          
       </div>

   )
}
 
export default Home