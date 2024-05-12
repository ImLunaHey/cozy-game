import { GameState } from '../game-state';

export class Hoverable {
  public readonly type = 'Hoverable';
  public isHovering = false;

  constructor(public onHoverStart: (gameState: GameState) => void, public onHoverEnd: (gameState: GameState) => void) {}
}
