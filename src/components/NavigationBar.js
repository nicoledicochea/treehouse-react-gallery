import React from "react";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <NavLink to="elephant">Elephant</NavLink>

        </li>
        <li>
          <NavLink to="castles">Castles</NavLink>
        </li>
        <li>
          <NavLink to="daisies">Daisies</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
