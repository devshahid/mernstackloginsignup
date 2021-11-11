import React, { useContext } from "react";
import "../css/navbar.css";
import logo1 from "../images/logo1.png";
import { NavLink } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { state } = useContext(UserContext);
  const RenderMenu = () => {
    if (state) {
      return (
        <>
          <li>
            <NavLink className="linkClass" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="linkClass" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink className="linkClass" to="/contact">
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink className="linkClass" to="/logout">
              Logout
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <NavLink className="linkClass" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="linkClass" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink className="linkClass" to="/contact">
              Contact
            </NavLink>
          </li>

          <li>
            <NavLink className="linkClass" to="/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink className="linkClass" to="/register">
              Register
            </NavLink>
          </li>
        </>
      );
    }
  };
  return (
    <>
      <div className="navContainer">
        <div className="logo">
          <img
            src={logo1}
            alt=""
            style={{ width: "120px", margin: "10px 0" }}
          />
        </div>
        <ul className="navItems">
          <RenderMenu />
        </ul>
      </div>
    </>
  );
};

export default Navbar;
