import { GameState } from './game-state';
import { aiMovementSystem } from './systems/ai-movement';
import { animationSystem } from './systems/animation';
import { growthSystem } from './systems/growth';
import { inputSystem } from './systems/input';
import { movementSystem } from './systems/movement';
import { saveSystem } from './systems/save';

export const update = (ctx: CanvasRenderingContext2D, deltaTime: number, gameState: GameState) => {
  inputSystem.update(ctx, deltaTime, gameState);
  growthSystem.update(ctx, deltaTime, gameState);
  aiMovementSystem.update(ctx, deltaTime, gameState);
  movementSystem.update(ctx, deltaTime, gameState);
  animationSystem.update(ctx, deltaTime, gameState);
  saveSystem.update(ctx, deltaTime, gameState);
};
