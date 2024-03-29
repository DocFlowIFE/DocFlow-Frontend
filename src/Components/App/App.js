import "./app.css";
import NavigationMenu from '../Navigation/NavigationMenu';
import Footer from '../Footer/Footer';
import Home from '../../Pages/Home';
import TicketsFeed from '../../Pages/TicketsFeed';
import TemplatesFeed from '../../Pages/TemplatesFeed';
import Login from '../../Pages/Login';
import Register from '../../Pages/Register';
import Administration from '../../Pages/Administration';
import Requests from '../../Pages/Requests';
import { Account } from '../Authentication/Account';
import { API } from '../../Services/APIService';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="main-container position-relative pb-5">
      <Account>
        <API>
          <Router>
            <NavigationMenu/>
            <div className="">
              <Switch>
                  <Route exact path="/">
                      <Home />
                  </Route>
                  <Route path="/templates">
                      <TemplatesFeed />
                  </Route>
                  <Route path="/tickets">
                      <TicketsFeed />
                  </Route>
                  <Route path="/login">
                      <Login />
                  </Route>
                  <Route path="/register">
                      <Register />
                  </Route>
                  <Route path="/administration">
                      <Administration />
                  </Route>
                  <Route path="/requests">
                      <Requests />
                  </Route>
              </Switch>
            </div>
            <Footer/>
          </Router>
        </API>
      </Account>
    </div>
  );
}

export default App;
