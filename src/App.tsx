import React, { useRef, useEffect } from 'react';

const CanvasAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Use useRef to store mutable values that persist across renders without causing re-renders
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // --- 1. The Update/Draw Function (The "update" function from your original code) ---
    const update = (deltaTime: number) => {
      // Clear the canvas before drawing the next frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      player.draw(ctx);
    };

    // --- 2. The Game Loop Function (The "gameLoop" from your original code) ---
    const gameLoop = (currentTime: number) => {
      // Calculate delta time
      // The initial lastTimeRef.current is 0, so the first deltaTime is just currentTime
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      // Call the update/draw logic
      update(deltaTime);

      // Request the next frame recursively
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    // --- 3. Start the loop ---
    // Start the animation loop when the component mounts
    animationFrameId = requestAnimationFrame(gameLoop);

    // --- 4. Clean up function ---
    // Return a cleanup function to stop the animation when the component unmounts
    return () => {
      cancelAnimationFrame(animationFrameId);
    };

  }, []); // Empty dependency array ensures this runs only once on mount

  return <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid black' }} />;
};

// Export the component as default
export default CanvasAnimation;

class Player {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  gravity: number;
  yvelocity: number;

  constructor(x: number, y: number, width: number, height: number, color: string,gravity: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.gravity = gravity;
    this.yvelocity = 0;
  }
  work(){
    this.yvelocity += this.gravity;
    this.y += this.yvelocity;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
const player = new Player(20, 20, 30, 30, 'green', 1);