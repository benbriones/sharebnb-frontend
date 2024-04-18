import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { NavItem, NavbarBrand, Navbar } from "reactstrap";
import userContext from "./userContext";


/** Navigation bar component for Sharebnb.
 *
 * Props:
 * - logout(): parent function
 *
 * State: none
 *
 * App -> NavBar
 */

function Nav({ logout }) {
  const { currUser } = useContext(userContext);

  /** Returns JSX markup for NavBar when there exists a logged in user */
  function generateLoggedInNavBar() {
    return (
      <ul className="ms-auto navbar-nav">
        <li className="nav-item me-4">
          <NavLink className="nav-link" to="/add-property">Add Property</NavLink>
        </li>
        {/* <li className="nav-item me-4">
          <NavLink className="nav-link" to="/profile">Profile</NavLink>
        </li> */}
        <li className="nav-item me-4">
          <Link className="nav-link"
            to="/"
            onClick={logout}>{`Logout (${currUser.username})`}</Link>
        </li>
      </ul>
    );
  }

  /** Returns JSX markup for NavBar when there exists a logged in user */
  function generateAnonNavBar() {
    return (
      <ul className="ms-auto navbar-nav">
        <NavItem className="nav-item me-4">
          <NavLink className="nav-link" to="/login">Login</NavLink>
        </NavItem>
        <NavItem className="nav-item me-4">
          <NavLink className="nav-link" to="/signup">Signup</NavLink>
        </NavItem>
      </ul>
    );
  }

  return (
    <Navbar color="light" className="sticky-top p-0">
      <NavbarBrand href="/">
        ShareBnB
      </NavbarBrand>
      {currUser
        ? generateLoggedInNavBar()
        : generateAnonNavBar()}
    </Navbar>
    // <nav className="NavBar navbar navbar-light sticky-top navbar-expand-md">
    //   <div className="container-fluid">
    //     <NavbarBrand>
    //         <Link className="navbar-brand ms-2"to="/"> ShareBnB </Link>
    //     </NavbarBrand>

    //     {currUser
    //       ? generateLoggedInNavBar()
    //       : generateAnonNavBar()}
    //   </div>
    // </nav>
  );
}

export default Nav;