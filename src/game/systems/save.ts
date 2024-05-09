import { GameState } from '../game-state';

class SaveSystem {
  update(_ctx: CanvasRenderingContext2D, deltaTime: number, gameState: GameState) {
    // every 1k ticks save the game
    // if (gameState.tick % 1_000 === 0) {
    //   localStorage.setItem('gameState', JSON.stringify(gameState));
    // }
  }
}

export const saveSystem = new SaveSystem();
