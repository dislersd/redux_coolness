import React from "react";

function FilterLink({ filter, children, store }) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        store.dispatch({
          type: "SET_VISIBILITY_FILTER",
          payload: filter,
        });
      }}
    >
      {children}
    </a>
  );
}

export default FilterLink;
