import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "../styles/Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={`navbar ${showMenu ? "navbar-expanded" : ""}`}>
      <div>
        <NavLink exact to="/">
          <img
            src="/airbnb-logo-cropped.jpg"
            alt="airbnb-logo"
            className="logo"
            title="Home"
          />
        </NavLink>
      </div>
      <div>
        <NavLink exact to="/about-me" className="about-me-link">
          About Me
        </NavLink>
      </div>
      {isLoaded && (
        <div className="navigation-container">
          <div className="create-spot-button-wrapper">
            <div className="create-spot-button">
              {sessionUser && (
                <NavLink to="/spots" className={`spot-button-menu ${showMenu}`}>
                  Create a New Spot
                </NavLink>
              )}
            </div>
          </div>
          <ProfileButton
            user={sessionUser}
            showMenu={showMenu}
            setShowMenu={setShowMenu}
          />
        </div>
      )}
    </div>
  );
}

export default Navigation;
