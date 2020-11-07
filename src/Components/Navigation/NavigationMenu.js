import React, { useState } from 'react';
import { Link } from "react-router-dom";

function NavigationMenu(props){

    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  
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
            <li className="m-auto"><Link to={`/feed`} className="nav-link text-main">Feed</Link></li>
          </ul>
          <ul className="nav navbar-nav ml-auto">
            <li className="m-2"><Link to={`/login`} className="btn btn-hot btn-block pl-4 pr-4">Login</Link></li>
            <li className="m-2"><Link to={`/register`} className="btn btn-main btn-block pl-4 pr-4">Register</Link></li>
          </ul>
        </div>
      </nav>
    );
}

export default NavigationMenu