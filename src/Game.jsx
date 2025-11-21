import React, { useState, useEffect, useRef } from "react";
import Player from "./Player";
import Obstacle from "./Obstacle";

const GAME_WIDTH = 600;
const GAME_HEIGHT = 300;
const PLAYER_SIZE = 30;
const OBSTACLE_WIDTH = 40;
const GAP_HEIGHT = 100;
const OBSTACLE_SPEED = 5;

const Game = () => {
  const [playerPos, setPlayerPos] = useState({ x: 50, y: GAME_HEIGHT - PLAYER_SIZE });
  const [velocity, setVelocity] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);

  const gameAreaRef = useRef(null);

  const gravity = 0.6;
  const jumpStrength = 6; // shorter jump per click

  // Focus the game area for keyboard controls
  useEffect(() => {
    gameAreaRef.current?.focus();
  }, []);

  // Controls: WASD + Arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
        setPlayerPos((pos) => ({ ...pos, x: Math.max(0, pos.x - 10) }));
      } else if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
        setPlayerPos((pos) => ({ ...pos, x: Math.min(GAME_WIDTH - PLAYER_SIZE, pos.x + 10) }));
      } else if (e.key === "w" || e.key === "W" || e.key === "ArrowUp") {
        setVelocity(jumpStrength); // each key press adds upward velocity
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click to jump (multi-click works)
  const handleClick = () => {
    setVelocity(jumpStrength); // every click adds upward velocity
  };

  // Gravity & Jump
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerPos((pos) => {
        let newY = pos.y - velocity;
        let newVelocity = velocity - gravity;

        // Player hits the ground
        if (newY >= GAME_HEIGHT - PLAYER_SIZE) {
          newY = GAME_HEIGHT - PLAYER_SIZE;
          newVelocity = 0;
        }

        // Player cannot go above top
        if (newY < 0) {
          newY = 0;
          newVelocity = 0;
        }

        setVelocity(newVelocity);
        return { ...pos, y: newY };
      });
    }, 20);

    return () => clearInterval(interval);
  }, [velocity]);

  // Generate obstacles
  useEffect(() => {
    const interval = setInterval(() => {
      const minGap = 50;
      const maxGap = GAME_HEIGHT - GAP_HEIGHT - 50;
      const gapTop = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

      setObstacles((prev) => [
        ...prev,
        { id: Date.now(), left: GAME_WIDTH, gapTop, passed: false },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Move obstacles
  useEffect(() => {
    const interval = setInterval(() => {
      setObstacles((prev) =>
        prev
          .map((obs) => ({ ...obs, left: obs.left - OBSTACLE_SPEED }))
          .filter((obs) => obs.left > -OBSTACLE_WIDTH)
      );
    }, 20);

    return () => clearInterval(interval);
  }, []);

  // Collision detection & scoring
  useEffect(() => {
    const interval = setInterval(() => {
      setObstacles((prev) =>
        prev.map((obs) => {
          const playerRight = playerPos.x + PLAYER_SIZE;
          const obsRight = obs.left + OBSTACLE_WIDTH;

          const horizontalOverlap = playerRight > obs.left && playerPos.x < obsRight;
          const playerTop = playerPos.y;
          const playerBottom = playerPos.y + PLAYER_SIZE;
          const topPipeBottom = obs.gapTop;
          const bottomPipeTop = obs.gapTop + GAP_HEIGHT;

          // Collision
          if (horizontalOverlap && (playerTop < topPipeBottom || playerBottom > bottomPipeTop)) {
            alert("Game Over! Score: " + score);
            setScore(0);
            setPlayerPos({ x: 50, y: GAME_HEIGHT - PLAYER_SIZE });
            setVelocity(0);
            return null; // remove obstacles
          }

          // Scoring
          if (!obs.passed && obsRight < playerPos.x) {
            setScore((s) => s + 1);
            return { ...obs, passed: true };
          }

          return obs;
        }).filter(Boolean)
      );
    }, 20);

    return () => clearInterval(interval);
  }, [playerPos, score]);

  return (
    <div
      ref={gameAreaRef}
      tabIndex={0}
      onClick={handleClick} // every click adds jump
      style={{
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        border: "2px solid black",
        position: "relative",
        overflow: "hidden",
        background: "#87ceeb",
      }}
    >
      <Player x={playerPos.x} bottom={GAME_HEIGHT - playerPos.y - PLAYER_SIZE} />
      {obstacles.map((obs) => (
        <Obstacle key={obs.id} left={obs.left} gapTop={obs.gapTop} />
      ))}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Score: {score}
      </div>
    </div>
  );
};

export default Game;
