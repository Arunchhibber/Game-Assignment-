import React from "react";

const OBSTACLE_WIDTH = 40;

const Obstacle = ({ left, gapTop }) => {
  const GAME_HEIGHT = 300;
  const GAP_HEIGHT = 100;
  const topHeight = GAME_HEIGHT - gapTop - GAP_HEIGHT;

  return (
    <>
      {/* Top pipe */}
      <div
        className="obstacle"
        style={{
          left: `${left}px`,
          bottom: `${gapTop + GAP_HEIGHT}px`,
          height: `${topHeight}px`,
          width: `${OBSTACLE_WIDTH}px`,
        }}
      ></div>
      {/* Bottom pipe */}
      <div
        className="obstacle"
        style={{
          left: `${left}px`,
          bottom: `0px`,
          height: `${gapTop}px`,
          width: `${OBSTACLE_WIDTH}px`,
        }}
      ></div>
    </>
  );
};

export default Obstacle;
