import React, { useEffect, useRef } from "react";
import "./SnakeGame.css";

const SnakeGame = () => {
  const ref = useRef();
  useEffect(() => {
    let context = ref.current.getContext("2d");
    context.fillStyle = "red";
    context.fillRect(10, 250, 50, 50);
  }, []);
  return (
    <div className="main-container">
      <u>
        <h1>Snake Game</h1>
      </u>
      <h4>
        High Score:
        <span>
          <i>541655</i>
        </span>
      </h4>
      <h4>Current Score:1251</h4>
      <div className="startblock">
        <canvas ref={ref} width={500} height={500} className="canvas"></canvas>
      </div>
    </div>
  );
};

export default SnakeGame;
