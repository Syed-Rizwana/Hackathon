import React, { useRef, useEffect, useState, useCallback } from 'react';
import './Dice.css';

const Dice: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [diceNumber, setDiceNumber] = useState<number>(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      drawDice(ctx, diceNumber);
    }
  }, [diceNumber]);

  const drawDice = (ctx: CanvasRenderingContext2D, number: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
   
    ctx.beginPath();
    ctx.rect(10, 10, 80, 80);
    ctx.strokeStyle = 'black';
    ctx.stroke();

   
    ctx.fillStyle = 'white';
    
    switch (number) {
      case 1:
        drawDot(ctx, 50, 50);
        break;
      case 2:
        drawDot(ctx, 30, 30);
        drawDot(ctx, 70, 70);
        break;
      case 3:
        drawDot(ctx, 30, 30);
        drawDot(ctx, 50, 50);
        drawDot(ctx, 70, 70);
        break;
      case 4:
        drawDot(ctx, 30, 30);
        drawDot(ctx, 30, 70);
        drawDot(ctx, 70, 30);
        drawDot(ctx, 70, 70);
        break;
      case 5:
        drawDot(ctx, 30, 30);
        drawDot(ctx, 30, 70);
        drawDot(ctx, 50, 50);
        drawDot(ctx, 70, 30);
        drawDot(ctx, 70, 70);
        break;
      case 6:
        drawDot(ctx, 30, 30);
        drawDot(ctx, 30, 50);
        drawDot(ctx, 30, 70);
        drawDot(ctx, 70, 30);
        drawDot(ctx, 70, 50);
        drawDot(ctx, 70, 70);
        break;
      default:
        break;
    }
  };

  const drawDot = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  };

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Spacebar') {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      setDiceNumber(randomNumber);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress as EventListener);
    return () => {
      window.removeEventListener('keydown', handleKeyPress as EventListener);
    };
  }, [handleKeyPress]);

  return (
    <>
    <div>
      <div className="canvas-container">
        <canvas className="canvas" ref={canvasRef} width={100} height={100} tabIndex={0} />
      </div>
      
     
    </div>
    <div>
    <p id="roll"> Rolled Number: {diceNumber}</p>
    </div>
    </>
  );
};

export default Dice;
