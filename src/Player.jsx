import React from "react";

const PLAYER_SIZE = 30;

const Player = ({ x, bottom }) => {
  return (
    <div
      className="player"
      style={{
        left: `${x}px`,
        bottom: `${bottom}px`,
        width: `${PLAYER_SIZE}px`,
        height: `${PLAYER_SIZE}px`,
      }}
    ></div>
  );
};

export default Player;
