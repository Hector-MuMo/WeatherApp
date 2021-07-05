import React from "react";

const BtnGrades = ({ funcLetter, varLetter }) => {
  return (
    <>
      <button
        onClick={(e) => {
          varLetter === "°C" ? funcLetter("°F") : funcLetter("°C");
        }}
      >
        °F/°C
      </button>
    </>
  );
};

export default BtnGrades;
