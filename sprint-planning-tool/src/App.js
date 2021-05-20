import './App.css';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Home from './Home'
import Setup from './Setup'
import DisplayName from './DisplayName'
import JoinGame from './JoinGame';
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7EVtMCk59p7HU_iQmj6EJydWrhB9zwb4",
  authDomain: "sprint-planning-tool-and.firebaseapp.com",
  projectId: "sprint-planning-tool-and",
  storageBucket: "sprint-planning-tool-and.appspot.com",
  messagingSenderId: "1048128510912",
  appId: "1:1048128510912:web:bc809f04c6482ea4d5c625",
  measurementId: "G-228SL41M9E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/setup' component={Setup}/>
          <Route path='/displayName' component={DisplayName}/>
          <Route path='/joinGame' component={JoinGame}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
