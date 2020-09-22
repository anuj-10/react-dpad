import React, { useEffect } from "react";

export default function SimpleCard({ categoryData, downFocus }) {
  useEffect(() => {
    if (downFocus === true) {
      document.getElementById(`card-0`) &&
        document.getElementById(`card-0`).focus();
    } else {
      document.getElementById(`card-0`) &&
        document.getElementById(`card-0`).blur();
    }
  }, [downFocus]);

  return (
    <div className="parent">
      {categoryData.map((v, i) => (
        <div
          className="card"
          style={{ width: "100%" }}
          id={`card-${i}`}
          key={i}
          tabIndex="0"
          // onClick={() => document.getElementById(`card-${i}`).focus()}
        >
          <div className="cards-img">
            <img
              className="card-img-top"
              src={v.image.p_small.url}
              alt="Card image cap"
            />
          </div>
          <div className="card-body">
            <h5 className="card-title">{v.title}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}
