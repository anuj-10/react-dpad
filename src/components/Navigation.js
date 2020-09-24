import React, { useEffect } from "react";

export default function SimpleBottomNavigation({ category, currentNavIndex }) {
  useEffect(() => {
    console.log("NAV", currentNavIndex);
    console.log(
      " dsda",
      document.getElementById(`nav-header-${currentNavIndex}`)
    );
    const elem = document.getElementById(`nav-header-${currentNavIndex}`);
    if (elem) {
      elem.focus();
      elem.scrollIntoView(true);
    }
  }, [currentNavIndex]);

  return (
    <div className="nav-header">
      {category.map((v, i) => (
        <button
          key={i}
          id={`nav-header-${i}`}
          nav-selectable="true"
          data-link={v.link}
        >
          {v.title}
        </button>
      ))}
    </div>
  );
}
