import "./App.css";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import PointsSelection from "./PointsSelection";
import Setup from "./Setup";
import DisplayName from "./DisplayName";
import JoinGame from "./JoinGame";
import Results from "./Results";
import firebase from "firebase/app";
import "firebase/firestore";
import Logo from "./images/logo.png";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <div className="App">
        <img src={Logo} alt="Sprint to the end" />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/setup" component={Setup} />
          <Route path="/displayName" component={DisplayName} />
          <Route path="/joinGame" component={JoinGame} />
          <Route path="/points" component={PointsSelection} />
          <Route path="/results" component={Results} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
