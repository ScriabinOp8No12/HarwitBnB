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
    <div className="navbar">
      <div>
        <NavLink exact to="/">
          {/* Airbnb logo going to home page */}
          <img
            src="/airbnb-logo-cropped.jpg"
            alt="airbnb-logo"
            className="logo"
          />
        </NavLink>
      </div>
      {isLoaded && (
        <div className="navigation-container">
          {/* Render "create a new spot" button if user is logged in */}
          {sessionUser && (
            <NavLink
              to="/spots"
              className={`spot-button-menu ${showMenu ? "extra-margin" : ""}`}
            >
              Create a New Spot
            </NavLink>
          )}
          {/* Profile Button with User icon in top right of screen */}
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
