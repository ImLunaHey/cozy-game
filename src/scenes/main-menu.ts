import { GameState } from '@/game/game-state';
import { Scene } from './scene';
import { Entity } from '@/game/entity';
import { Position } from '@/game/components/position';
import { Dimensions } from '@/game/components/dimensions';
import { Background } from '@/game/components/background';

class Button extends Entity {
  constructor() {
    super('Button', [
      new Position({ x: 100, y: 100, layer: 'ui' }),
      new Dimensions({ width: 100, height: 50 }),
      new Background({ colour: '#000000' }),
    ]);
  }
}

export class MainMenu extends Scene {
  entities = [new Button()];

  constructor() {
    super();
  }

  update(ctx: CanvasRenderingContext2D, deltaTime: number, gameState: GameState) {
    // make the scene the same size as the canvas
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
  }
}
