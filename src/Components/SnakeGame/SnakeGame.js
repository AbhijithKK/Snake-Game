import React, { useEffect, useRef, useState } from "react";
import "./SnakeGame.css";
import Modal from "../Modal/Modal";

const SnakeGame = () => {
  const [isOpen, isClose] = useState(true);
  const [sposX, setSposX] = useState(80);
  const [sposY, setSposY] = useState(80);
  const [fposX, setFposX] = useState(180);
  const [fposY, setFposY] = useState(180);
  const ref = useRef();



  const Play = () => {
    isClose(false);
  };

  useEffect(() => {
    // variable Declaration
    
    let context = ref.current.getContext("2d");
    context.moveTo(0, 0);
    context.lineTo(500, 500);
    context.stroke();

    // onload function
    document.addEventListener("keydown", inputControl);
    MainGame();

    // main game function
    function MainGame() {
      context.fillStyle = "black";
      context.fillRect(0, 0, 500, 500);
      // snake
      context.fillStyle = "yellow";
      context.fillRect(sposX, sposY, 20, 20);
      // fruit
      context.fillStyle = "red";
      context.fillRect(fposX, fposY, 20, 20);
    }
    // input control
    function inputControl(e) {
        console.log(e.keyCode);
      if (e.keyCode === 37) {
        // left
       
        setSposX(sposX-20)

      } else if (e.keyCode === 38) {
        // up
        setSposY(sposY-20)
      } else if (e.keyCode === 39) {
        // right
        setSposX(sposX+20)
      } else if (e.keyCode === 40) {
        // down
        setSposY(sposY+20)
      }
    }
    return () => {
        document.removeEventListener('keydown', inputControl);
    };
  }, [sposX,sposY,fposX,fposY]);
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
        <h4>Current Score:1251</h4>
        <canvas ref={ref} width={500} height={500} className="canvas"></canvas>
      </div>
    </>
  );
};

export default SnakeGame;
