import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "../styles/Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

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
        <div>
          {/* Profile Button with User icon in top right of screen */}
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
