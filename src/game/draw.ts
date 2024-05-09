import { GameState } from '@/game/game-state';
import { cameraSystem } from './systems/camera';
import { debugSystem } from './systems/debug';

export const draw = (ctx: CanvasRenderingContext2D, deltaTime: number, gameState: GameState) => {
  cameraSystem.draw(ctx, gameState);
  debugSystem.draw(ctx, deltaTime, gameState);
};
