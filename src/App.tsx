import React, { useRef, useEffect } from 'react';

const CanvasAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Use useRef to store mutable values that persist across renders without causing re-renders
  const lastTimeRef = useRef(0);
  const positionXRef = useRef(50); // Starting X position for our moving square

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

      // Update game state
      // Move the square to the right at 100 pixels per second
      positionXRef.current += 100 * deltaTime; 

      // Wrap around if it goes off screen
      if (positionXRef.current > canvas.width + 10) {
        positionXRef.current = -10; 
      }

      // Draw the updated rectangle
      ctx.fillStyle = 'blue';
      ctx.fillRect(positionXRef.current, 50, 50, 50);

      // Draw static shapes (they get redrawn every frame too)
      ctx.beginPath();
      ctx.arc(200, 100, 40, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      ctx.fill();
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

  return <canvas ref={canvasRef} width={300} height={200} style={{ border: '1px solid black' }} />;
};

// Export the component as default
export default CanvasAnimation;

interface