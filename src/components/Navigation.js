import React from "react";

export default function SimpleBottomNavigation({ category }) {
  return (
    <div className="nav-header">
      {category.map((v, i) => (
        <button key={i} nav-selectable="true" data-link={v.link}>
          {v.title}
        </button>
      ))}
    </div>
  );
}
