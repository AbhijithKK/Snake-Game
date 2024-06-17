import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./SnakeGame.css";
import Modal from "../Modal/Modal";

const SnakeGame = () => {
  const [isOpen, isClose] = useState(true);
  const [snakeX, setSnakeX] = useState(80);
  const [snakeY, setSnakeY] = useState(80);
  const [intervalId, setIntervalId] = useState(null);
  const [foodX, SetFoodX] = useState(180);
  const [foodY, SetFoodY] = useState(180);
  const [score, SetScore] = useState(0);
  const [snLength, SetSnLength] = useState(1);
  const [snakeTail, setTail] = useState([{ x: 80, y: 80 }]);
  const ref = useRef();
  const Play = () => {
    isClose(false);
  };

  useEffect(() => {
    // variable Declaration
   const  context = ref.current.getContext("2d");
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
    // fruit
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, 20, 20);
  }, [snakeX, snakeY, foodX, foodY]);


useEffect(()=>{

  setTail((prevTail) => {
    const newTail = [...prevTail, { x: snakeX, y: snakeY }];
    while (newTail.length > snLength) {
      newTail.shift();
    }
    return newTail;
  });
},[snakeX,snakeY])

// food section
  useEffect(() => {
    if (foodX === snakeX && foodY === snakeY) {
      
      SetSnLength((prev)=>prev+1);
      SetScore((prev) => prev + 10);
      let X = Math.floor(Math.random() * 20) * 20;
      let Y = Math.floor(Math.random() * 20) * 20;
      SetFoodX(X);
      SetFoodY(Y);
    }
  }, [snakeX, snakeY]);





  useEffect(() => {
    document.addEventListener("keydown", InputCapture);
    function InputCapture(e) {
      if (intervalId) {
        clearInterval(intervalId);
      }
      let intervall = setInterval(() => {
        if (e.keyCode === 37)
          setSnakeX((prev) => {
            if (prev < 0) {
              prev = 490;
            } else {
              prev -= 20;
            }
            return prev;
          });

        if (e.keyCode === 38)
          setSnakeY((prev) => {
            if (prev < 0) {
              prev = 490;
            } else {
              prev -= 20;
            }
            return prev;
          });
        if (e.keyCode === 39)
          setSnakeX((prev) => {
            if (prev > 490) {
              prev = 0;
            } else {
              prev += 20;
            }
            return prev;
          });
        if (e.keyCode === 40)
          setSnakeY((prev) => {
            if (prev > 490) {
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
  }, [intervalId]);

  return (
    <>
      {isOpen && <Modal play={Play} />}
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
        <h4>Current Score:{score}</h4>
        <canvas ref={ref} width={500} height={500} className="canvas"></canvas>
      </div>
    </>
  );
};

export default SnakeGame;





