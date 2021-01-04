import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "../Authentication/Account";
import { Link } from "react-router-dom";
import './navigationMenu.css';

function NavigationMenu(props){
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const [isUser, setIsUser] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const { getSession, logout } = useContext(AccountContext);
    useEffect(() => {
        // check if login as User 
        getSession(false)
          .then(token => {
            setIsUser(true);
          })
          .catch(() => {});
        // check if login as Admin 
        getSession(true)
          .then(token => {
            setIsAdmin(true);
          })
          .catch(() => {});
    }, []);
  
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-dark">
        <Link to={`/`} className="navbar-brand font-weight-bolder">
          <span className="text-main">DocFlow</span>
        </Link>
        <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarBox" aria-controls="navbarBox"
            aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
          <span className="navbar-toggler-icon"></span>
        </button>
  
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarBox">
          <ul className="nav navbar-nav">
            <li className="m-auto"><Link to={`/`} className="nav-link text-main">Home</Link></li>
            <li className="list-divider" hidden={!isUser}></li>
            <li className="m-auto"><Link to={`/tickets`} className="nav-link text-main" hidden={!isUser}>My Tickets</Link></li>
            <li className="m-auto"><Link to={`/templates`} className="nav-link text-main" hidden={!isUser}>Templates</Link></li>
            <li className="list-divider" hidden={!isAdmin}></li>
            <li className="m-auto"><Link to={`/requests`} className="nav-link text-main" hidden={!isAdmin}>Requests</Link></li>
            <li className="m-auto"><Link to={`/administration`} className="nav-link text-main" hidden={!isAdmin}>Administration</Link></li>
          </ul>
          <ul className="nav navbar-nav ml-auto" hidden={isUser || isAdmin}>
            <li className="m-2"><Link to={`/login`} className="btn btn-hot btn-block pl-4 pr-4">Login</Link></li>
            <li className="m-2"><Link to={`/register`} className="btn btn-main btn-block pl-4 pr-4">Register</Link></li>
          </ul>
          <ul className="nav navbar-nav ml-auto" hidden={!isUser && !isAdmin}>
            <li className="m-2"><Link onClick={() => { logout(); window.location="/"; }} className="btn btn-hot btn-block pl-4 pr-4">Logout</Link></li>
          </ul>
        </div>
      </nav>
    );
}

export default NavigationMenu