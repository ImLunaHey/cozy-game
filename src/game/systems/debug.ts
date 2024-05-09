import { inputSystem } from '@/game/systems/input';
import { GameState } from '@/game/game-state';

const drawFps = (ctx: CanvasRenderingContext2D, deltaTime: number) => {
  // Get the canvas
  const canvas = ctx.canvas;
  const fps = Math.round(1 / (deltaTime / 1000));

  // Draw the FPS
  ctx.fillStyle = 'black';
  ctx.font = '16px monospace';
  ctx.fillText('FPS: ' + fps, 10, canvas.height - 10);
};

const drawTick = (ctx: CanvasRenderingContext2D, gameState: GameState) => {
  // Get the canvas
  const canvas = ctx.canvas;

  // Draw the tick
  ctx.fillStyle = 'black';
  ctx.font = '16px monospace';
  ctx.fillText('Tick: ' + gameState.tick, 10, canvas.height - 30);
};

const drawEntityCount = (ctx: CanvasRenderingContext2D, gameState: GameState) => {
  // Get the canvas
  const canvas = ctx.canvas;

  // Draw the entity count
  ctx.fillStyle = 'black';
  ctx.font = '16px monospace';
  ctx.fillText('Entities: ' + gameState.entities.length, 10, canvas.height - 50);
};

const drawInputInfo = (ctx: CanvasRenderingContext2D) => {
  // Get the canvas
  const canvas = ctx.canvas;

  // Get the input
  const input = inputSystem.keysPressed();

  // Draw the input info
  ctx.fillStyle = 'black';
  ctx.font = '16px monospace';
  ctx.fillText('Input: ' + JSON.stringify(input), 10, canvas.height - 70);
};

const drawBox = (ctx: CanvasRenderingContext2D) => {
  // Draw a box
  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.fillRect(0, ctx.canvas.height - 100, ctx.canvas.width, 100);
};

class DebugSystem {
  draw(ctx: CanvasRenderingContext2D, deltaTime: number, gameState: GameState) {
    // only draw debug info if debug mode is enabled
    if (!gameState.__internal.debug) return;

    drawBox(ctx);
    drawFps(ctx, deltaTime);
    drawTick(ctx, gameState);
    drawEntityCount(ctx, gameState);
    drawInputInfo(ctx);
  }
}

export const debugSystem = new DebugSystem();
