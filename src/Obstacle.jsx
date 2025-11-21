import React from "react";

const OBSTACLE_WIDTH = 40;
const GAP_HEIGHT = 100;

const Obstacle = ({ left, gapTop }) => {
  return (
    <>
      {/* Top pipe */}
      <div
        style={{
          position: "absolute",
          width: OBSTACLE_WIDTH,
          height: gapTop,
          backgroundColor: "green",
          left: left,
          top: 0,
        }}
      />
      {/* Bottom pipe */}
      <div
        style={{
          position: "absolute",
          width: OBSTACLE_WIDTH,
          height: 300 - gapTop - GAP_HEIGHT,
          backgroundColor: "green",
          left: left,
          top: gapTop + GAP_HEIGHT,
        }}
      />
    </>
  );
};

export default Obstacle;
