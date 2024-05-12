import { GameState } from '../game-state';

export class Clickable {
  public readonly type = 'Clickable';

  constructor(public onClick: (gameState: GameState) => void) {}
}
