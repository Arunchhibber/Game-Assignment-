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
      let jumpHeight = 0;
      const upInterval = setInterval(() => {
        jumpHeight += 5;
        setPlayerPos((pos) => ({ ...pos, bottom: jumpHeight }));
        if (jumpHeight >= 120) { // max jump
          clearInterval(upInterval);
          const downInterval = setInterval(() => {
            jumpHeight -= 5;
            setPlayerPos((pos) => ({ ...pos, bottom: jumpHeight }));
            if (jumpHeight <= 0) {
              setPlayerPos((pos) => ({ ...pos, bottom: 0 }));
              clearInterval(downInterval);
            }
          }, 20);
        }
      }, 20);
    }
  };

  // Move left/right
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      setPlayerPos((pos) => ({
        ...pos,
        x: Math.max(0, pos.x - 10),
      }));
    } else if (e.key === "ArrowRight") {
      setPlayerPos((pos) => ({
        ...pos,
        x: Math.min(GAME_WIDTH - PLAYER_SIZE, pos.x + 10),
      }));
    } else if (e.code === "Space") {
      jump();
    }
  };

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
        // Collision top
        if (
          playerPos.x + PLAYER_SIZE > obs.left &&
          playerPos.x < obs.left + OBSTACLE_WIDTH &&
          (playerPos.bottom + PLAYER_SIZE > obs.gapTop + GAP_HEIGHT ||
            playerPos.bottom < obs.gapTop)
        ) {
          alert("Game Over! Score: " + score);
          setObstacles([]);
          setScore(0);
        } else if (
          obs.left + OBSTACLE_WIDTH === playerPos.x // passed obstacle
        ) {
          setScore((prev) => prev + 1);
        }
      });
    }, 20);
    return () => clearInterval(check);
  }, [obstacles, playerPos, score]);

  return (
    <div
      className="game-area"
      tabIndex={0}
      onKeyDown={handleKeyDown}
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
