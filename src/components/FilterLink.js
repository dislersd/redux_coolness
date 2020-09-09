import React from "react";
import { NavLink } from "react-router-dom";

function FilterLink({ filter, children }) {
  return (
    <NavLink
      to={filter === "all" ? "" : filter}
      activeStyle={{
        textDecoration: "none",
        color: "black",
      }}
    >
      {children}
    </NavLink>
  );
}

export default FilterLink;
