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
import { Link } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDK3iz_BsNKLE-EzkyhykZj1DU3eAcTxd8",
  authDomain: "estimation-example-b5a04.firebaseapp.com",
  projectId: "estimation-example-b5a04",
  storageBucket: "estimation-example-b5a04.appspot.com",
  messagingSenderId: "1058907231988",
  appId: "1:1058907231988:web:8abddc0658c292431cf0a1",
  measurementId: "G-EGBM9WLEEC",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/">
          <img src={Logo} alt="Sprint to the end" />
        </Link>

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
