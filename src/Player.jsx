import React from "react";

const PLAYER_SIZE = 40; // slightly bigger for better visuals

const Player = ({ x, bottom }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
        backgroundColor: "orange", // changed color
        borderRadius: "50%",       // make it a circle
        boxShadow: "0 2px 5px rgba(0,0,0,0.3)", // adds shadow
        left: x,
        bottom: bottom,
      }}
    />
  );
};

export default Player;
