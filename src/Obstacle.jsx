import React from "react";

const OBSTACLE_WIDTH = 40;
const GAP_HEIGHT = 120; // slightly bigger gap for better visuals
const GAME_HEIGHT = 400; // match your game container height

const Obstacle = ({ left, gapTop }) => {
  return (
    <>
      {/* Top obstacle */}
      <div
        style={{
          position: "absolute",
          left: left,
          top: 0,
          width: OBSTACLE_WIDTH,
          height: gapTop,
          background: "linear-gradient(to bottom, #2e8b57, #006400)", // gradient
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
        }}
      />
      {/* Bottom obstacle */}
      <div
        style={{
          position: "absolute",
          left: left,
          top: gapTop + GAP_HEIGHT,
          width: OBSTACLE_WIDTH,
          height: GAME_HEIGHT - (gapTop + GAP_HEIGHT),
          background: "linear-gradient(to top, #2e8b57, #006400)", // gradient
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}
      />
    </>
  );
};

export default Obstacle;
