import * as React from "react";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import "./nav.scss"
import LogOut from "./pages/LogOut";

interface IProps {
  isAuthenticated: boolean | null;
  uuid: string | null;
}

const Nav = ({ isAuthenticated, uuid }: IProps) => {
  const logInOut = isAuthenticated ? (
    <li>
      <LogOut />
    </li>
  ) : (
    <li>
    </li>
  );

  const mainLinks = isAuthenticated ? (
    <>
    <li>
        <NavLink to="/search">
          Search
        </NavLink>
      </li>
    </>
  ) : (
    <>
      <li>
        <NavLink to="/">
          Home
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <p>Auth state: {isAuthenticated ? `Logged in user: ${uuid}` : "Logged out"}</p>
      <ul className="nav">
        {mainLinks}
        <li>
          <NavLink to="/terms">
            Terms
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">
            About
          </NavLink>
        </li>
        {logInOut}
      </ul>
    </>
  );
};

const mapStateToProps = (state) => {
  return { 
    uuid: state.auth.uuid,
    isAuthenticated: state.auth.isAuthenticated 
  }
};

export default connect(
  mapStateToProps,
)(Nav);
