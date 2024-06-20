import React, { useEffect, useRef, useState } from "react";
import "./SnakeGame.css";
import Modal from "../Modal/Modal";

const SnakeGame = () => {
  
  const [score, SetScore] = useState(0);
  const [keyCode, SetKeyCode] = useState(null);
  const [isOpen, isClose] = useState(true);
  const [gameoverModal, setGameOver] = useState(false);
  const [snakeX, setSnakeX] = useState(80);
  const [snakeY, setSnakeY] = useState(80);
  const [intervalId, setIntervalId] = useState(null);
  const [intervalId2, setIntervalId2] = useState(null);
  const [foodX, SetFoodX] = useState(180);
  const [foodY, SetFoodY] = useState(180);
  const [snLength, SetSnLength] = useState(1);
  const [snakeTail, setTail] = useState([{ x: 80, y: 80 }]);
  const ref = useRef(null);

  // modal functions and codes
  const Play = () => {
    isClose(false);
  };
  const PlayAgain = () => {
    window.location.reload();
    isClose(true);
    setGameOver(false);
  };
  let gameStart = (
    <div className="PlayBtn">
      <button onClick={Play}>Play Now</button>
    </div>
  );
  let gameOver = (
    <div className="ply-container">
      <h1>Game Over</h1>
      <h2>Your Score:{score}</h2>
      <button onClick={PlayAgain}>Play Again</button>
    </div>
  );
// ========================================


// canvas creation
  useEffect(() => {
    // variable Declaration
    const context = ref.current.getContext("2d");
    context.moveTo(0, 0);
    context.lineTo(500, 500);
    context.stroke();

    // main game function
    context.fillStyle = "black";
    context.fillRect(0, 0, 500, 500);
    // snake
    context.fillStyle = "yellow";
    for (const tail of snakeTail) {
      context.fillRect(tail.x, tail.y, 20, 20);
      while (snakeTail.length > snLength) {
        snakeTail.shift();
      }
    }
    context.fillStyle = "green";
    context.fillRect(
      snakeTail[snakeTail.length - 1].x,
      snakeTail[snakeTail.length - 1].y,
      20,
      20
    );

    // fruit

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, 20, 20);
  }, [snakeX, snakeY, foodX, foodY]);
  // ==========================================================

  // snake tail setting
  useEffect(() => {
    setTail((prevTail) => {
      const newTail = [...prevTail, { x: snakeX, y: snakeY }];
      while (newTail.length > snLength) {
        newTail.shift();
      }
      return newTail;
    });
  }, [snakeX, snakeY]);
  // =================================================================
  // food section
  useEffect(() => {
    if (foodX === snakeX && foodY === snakeY) {
      SetSnLength((prev) => prev + 1);
      SetScore((prev) => prev + 10);
      let X = Math.floor(Math.random() * 20) * 20;
      let Y = Math.floor(Math.random() * 20) * 20;
      SetFoodX(X);
      SetFoodY(Y);
    }
  }, [snakeX, snakeY]);

  // game over
  useEffect(() => {
    for (let i = 1; i < snakeTail.length; i++) {
      if (
        snakeTail[0].x === snakeTail[i].x &&
        snakeTail[0].y === snakeTail[i].y
      ) {
        setGameOver(true);
        break;
      }
    }
  }, [snakeX, snakeY]);
  // ================================================================

  // snake direction
  useEffect(() => {
    document.addEventListener("keydown", InputCapture);
    if (gameoverModal) {
      InputCapture();
    }
    function InputCapture(e) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      let intervall = setInterval(() => {
        if (e.keyCode === 37)
          setSnakeX((prev) => {
            if (prev < 0) {
              prev = 500;
            } else {
              prev -= 20;
            }
            return prev;
          });

        if (e.keyCode === 38)
          setSnakeY((prev) => {
            if (prev < 0) {
              prev = 500;
            } else {
              prev -= 20;
            }
            return prev;
          });
        if (e.keyCode === 39)
          setSnakeX((prev) => {
            if (prev > 500) {
              prev = 0;
            } else {
              prev += 20;
            }
            return prev;
          });
        if (e.keyCode === 40)
          setSnakeY((prev) => {
            if (prev > 500) {
              prev = 0;
            } else {
              prev += 20;
            }
            return prev;
          });
      }, 200);

      setIntervalId(intervall);
    }
    return () => {
      document.removeEventListener("keydown", InputCapture);
    };
  }, [intervalId, gameoverModal]);
  // =================================================
  //snake direction using buttons
  useEffect(() => {
    if (intervalId2) {
      clearInterval(intervalId2);
    }
    function buttons(keyCodes) {
      let intervall = setInterval(() => {
        if (keyCodes === 37)
          setSnakeX((prev) => {
            if (prev < 0) {
              prev = 500;
            } else {
              prev -= 20;
            }
            return prev;
          });

        if (keyCodes === 38)
          setSnakeY((prev) => {
            if (prev < 0) {
              prev = 500;
            } else {
              prev -= 20;
            }
            return prev;
          });
        if (keyCodes === 39)
          setSnakeX((prev) => {
            if (prev > 500) {
              prev = 0;
            } else {
              prev += 20;
            }
            return prev;
          });
        if (keyCodes === 40)
          setSnakeY((prev) => {
            if (prev > 500) {
              prev = 0;
            } else {
              prev += 20;
            }
            return prev;
          });
      }, 200);
      setIntervalId2(intervall);
    }
    if (keyCode) {
      buttons(keyCode);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [keyCode]);

  return (
    <>
      {isOpen && <Modal probs={gameStart} />}
      {gameoverModal && <Modal probs={gameOver} />}
      <div className="main-container">
        <u>
          <h1>Snake Game</h1>
        </u>

        <h4 style={{ textAlign: "center" }}>
          Current Score:<span style={{ color: "blue" }}>{score}</span>
        </h4>
        <canvas ref={ref} width={400} height={400} className="canvas"></canvas>
      </div>
      <div className="buttons">
        <div className="row1">
          <button onClick={() => SetKeyCode(38)}>up</button>
        </div>
        <div className="row2">
          <button onClick={() => SetKeyCode(37)}>left</button>

          <button onClick={() => SetKeyCode(39)}>right</button>
        </div>
        <div className="row3">
          <button onClick={() => SetKeyCode(40)}>down</button>
        </div>
      </div>
    </>
  );
};

export default SnakeGame;
