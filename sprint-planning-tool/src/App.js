import './App.css';
import Home from './Home'
import Setup from './Setup'
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Switch>

 <Route path='/' exact component={Home}/>

<Route path='/setup' component={Setup}/>

    </Switch>
 
    </div>
    </Router>
  ); 
}

export default App;
