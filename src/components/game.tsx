'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { loadGameState } from '@/game/game-state';
import { draw } from '@/game/draw';
import { update } from '@/game/update';

export default function Game() {
  // Load game state from local storage
  const loadedGameState = loadGameState();

  // Set the game state
  const gameState = useRef(loadedGameState);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [debugMode, setDebugMode] = useState(gameState.current.__internal.debug);
  const [state, setState] = useState(gameState.current.__internal.state);

  // Resize the canvas when the window resizes
  useLayoutEffect(() => {
    const resize = () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) throw new Error('Could not get 2d context');

      canvasRef.current.width = document.documentElement.clientWidth;
      canvasRef.current.height = document.documentElement.clientHeight;

      // Set the image smoothing to false
      ctx.imageSmoothingEnabled = false;
    };

    // Resize the canvas on load
    resize();

    // Add the resize event listener
    window.addEventListener('resize', resize);

    // Remove the event listener
    return () => void window.removeEventListener('resize', resize);
  }, []);

  // game loop
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');

    if (!ctx) {
      throw new Error('Could not get 2d context');
    }

    // Set the initial time
    let lastTime = performance.now();
    // Store the animation frame
    let animationFrame: number;
    let deltaTime: number;

    // Set the interval for the tick
    const interval = setInterval(() => {
      if (gameState.current.__internal.state === 'paused') return;
      gameState.current.tick += 1;

      // Update the game
      update(ctx, deltaTime, gameState.current);
    }, 50);

    // The game loop
    const gameLoop = (currentTime: number) => {
      // Calculate the time since the last frame
      deltaTime = currentTime - lastTime;

      // Set the last time
      lastTime = currentTime;

      // Draw the game
      draw(ctx, deltaTime, gameState.current);

      // Request the next frame
      animationFrame = requestAnimationFrame(gameLoop);
    };

    // Start the draw loop
    gameLoop(lastTime);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-col gap-2 absolute p-2 w-56">
        <Button
          onClick={() => {
            gameState.current.__internal.state = state === 'paused' ? 'playing' : 'paused';
            setState(gameState.current.__internal.state);
          }}
        >
          {state === 'paused' ? 'Play' : 'Pause'}
        </Button>

        <Button
          onClick={() => {
            gameState.current.__internal.debug = !gameState.current.__internal.debug;
            setDebugMode(gameState.current.__internal.debug);
          }}
        >
          Toggle debug mode
        </Button>

        {debugMode && (
          <>
            <Button
              onClick={() => {
                // clear local storage
                localStorage.removeItem('gameState');
                gameState.current = loadGameState();
              }}
            >
              Reset state
            </Button>

            <Button
              onClick={() => {
                const player = gameState.current.entities.find((entity) => entity.type === 'Player');
                if (!player) return;

                const position = player.getComponent('Position');
                if (!position) return;
                position.x = 0;
                position.y = 0;
              }}
            >
              Move player to [0, 0]
            </Button>
          </>
        )}
      </div>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};
const Button = ({ onClick, children }: ButtonProps) => (
  <button className="p-2 whitespace-nowrap bg-black hover:bg-zinc-800 active:scale-95" onClick={onClick}>
    {children}
  </button>
);
