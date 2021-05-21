import logo from './logo.svg';
import Detail from './pages/Detail'
import Mangler from './pages/Mangler'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div class="app">
        <ul>
          <li>
            <Link to="/">Detail </Link>
            <Link to="/Mangler">Mangler</Link>
          </li>
        </ul>

        <hr />
        <Switch>
          <Route exact path="/">
            <Detail />
          </Route>
          <Route exact path="/Mangler">
            <Mangler />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
