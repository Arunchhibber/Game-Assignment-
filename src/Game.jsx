import React, { useState, useEffect } from "react";
import Player from "./Player";
import Obstacle from "./Obstacle";

const GAME_WIDTH = 600;
const GAME_HEIGHT = 300;
const PLAYER_SIZE = 30;
const OBSTACLE_WIDTH = 40;
const GAP_HEIGHT = 100;

const Game = () => {
  const [playerPos, setPlayerPos] = useState({ x: 50, bottom: 0 });
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);

  // Jump function
  const jump = () => {
    if (playerPos.bottom === 0) {
      let velocity = 12;
      const gravity = 0.6;

      const jumpInterval = setInterval(() => {
        velocity -= gravity;
        setPlayerPos((pos) => {
          let newBottom = pos.bottom + velocity;

          if (newBottom <= 0) {
            clearInterval(jumpInterval);
            return { ...pos, bottom: 0 };
          }

          return { ...pos, bottom: newBottom };
        });
      }, 20);
    }
  };

 // WASD controls
useEffect(() => {
  const handleKeyPress = (e) => {
    if (e.key === "a" || e.key === "A") {
      setPlayerPos((pos) => ({
        ...pos,
        x: Math.max(0, pos.x - 10),
      }));
    } 
    else if (e.key === "d" || e.key === "D") {
      setPlayerPos((pos) => ({
        ...pos,
        x: Math.min(GAME_WIDTH - PLAYER_SIZE, pos.x + 10),
      }));
    } 
    else if (e.key === "w" || e.key === "W") {
      jump();
    }
  };

  window.addEventListener("keydown", handleKeyPress);
  return () => window.removeEventListener("keydown", handleKeyPress);
}, []);


  // Generate obstacle pairs
  useEffect(() => {
    const interval = setInterval(() => {
      const gapPosition = Math.floor(Math.random() * (GAME_HEIGHT - GAP_HEIGHT - 50)) + 50;
      setObstacles((prev) => [
        ...prev,
        { id: Date.now(), left: GAME_WIDTH, gapTop: gapPosition },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Move obstacles
  useEffect(() => {
    const moveInterval = setInterval(() => {
      setObstacles((prev) =>
        prev
          .map((obs) => ({ ...obs, left: obs.left - 5 }))
          .filter((obs) => obs.left > -OBSTACLE_WIDTH)
      );
    }, 20);
    return () => clearInterval(moveInterval);
  }, []);

  // Collision detection & scoring

useEffect(() => {
  const check = setInterval(() => {
    obstacles.forEach((obs) => {
      const playerRight = playerPos.x + PLAYER_SIZE;
      const obsRight = obs.left + OBSTACLE_WIDTH;

      // Horizontal collision check
      const isHorizontalOverlap = playerRight > obs.left && playerPos.x < obsRight;

      // Vertical collision (not inside gap)
      const hitTopPipe = playerPos.bottom + PLAYER_SIZE < obs.gapTop;
      const hitBottomPipe = playerPos.bottom > obs.gapTop + GAP_HEIGHT;

      // Collision happens if overlapping horizontally AND NOT inside gap
      if (isHorizontalOverlap && (hitTopPipe || hitBottomPipe)) {
        alert("Game Over! Score: " + score);
        setObstacles([]);
        setScore(0);
      }

      // Scoring — player passed obstacle
      if (obsRight < playerPos.x && !obs.passed) {
        setScore((prev) => prev + 1);
        obs.passed = true;
      }
    });
  }, 20);

  return () => clearInterval(check);
}, [obstacles, playerPos, score]);


  return (
    <div
      className="game-area"
      tabIndex={0}
    
      onClick={jump}
    >
      <Player x={playerPos.x} bottom={playerPos.bottom} />
      {obstacles.map((obs) => (
        <Obstacle key={obs.id} left={obs.left} gapTop={obs.gapTop} />
      ))}
      <div className="score">Score: {score}</div>
    </div>
  );
};

export default Game;
