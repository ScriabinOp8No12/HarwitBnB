import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "../styles/Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  // frontend/public/airbnb-logo-cropped.jpg

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          <img
            src="/airbnb-logo-cropped.jpg"
            alt="airbnb-logo"
            className="logo"
          />
        </NavLink>
      </li>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
