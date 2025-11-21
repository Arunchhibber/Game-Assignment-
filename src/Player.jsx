import React from "react";

const PLAYER_SIZE = 30;

const Player = ({ x, bottom }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: PLAYER_SIZE,
        height: PLAYER_SIZE,
        backgroundColor: "red",
        left: x,
        bottom: bottom,
      }}
    />
  );
};

export default Player;
