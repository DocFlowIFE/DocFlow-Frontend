import "./app.css";
import NavigationMenu from '../Navigation/NavigationMenu';
import Footer from '../Footer/Footer';
import Home from '../../Pages/Home';
import Feed from '../../Pages/Feed';
import Login from '../../Pages/Login';
import Register from '../../Pages/Register';
import AnimalFacts from '../../Pages/AnimalFacts';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="main-container position-relative pb-5">
      <Router>
        <NavigationMenu/>
        <div className="mt-lg-3 ml-lg-3 mr-lg-3">
          <Switch>
              <Route exact path="/">
                  <Home />
              </Route>
              <Route path="/facts">
                  <AnimalFacts />
              </Route>
              <Route path="/feed">
                  <Feed />
              </Route>
              <Route path="/login">
                  <Login />
              </Route>
              <Route path="/register">
                  <Register />
              </Route>
          </Switch>
        </div>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
