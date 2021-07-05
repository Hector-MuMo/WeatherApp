import React from "react";

const ExtraInfo = ({ co, ws, humidity, uv }) => {
  return (
    <>
      <span>{`Carbon Monoxide: ${Math.round(co)} (μg/m3)`}</span>
      <span>{`Wind Speed: ${ws} km/h`}</span>
      <span>{`Humidity: ${humidity} %`}</span>
      <span>{`UV: ${uv}`}</span>
    </>
  );
};

export default ExtraInfo;
