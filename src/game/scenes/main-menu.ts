import { GameState } from '@/game/game-state';
import { Scene } from './scene';
import { Entity } from '@/game/entity';
import { Position } from '@/game/components/position';
import { Dimensions } from '@/game/components/dimensions';
import { Background } from '@/game/components/background';
import { Clickable } from '@/game/components/clickable';
import { Text } from '@/game/components/text';
import { Hoverable } from '@/game/components/hoverable';
import { World } from './world';
import { getEnvironment } from '@/common/get-enironment';
import { appWindow } from '@tauri-apps/api/window';

class Button extends Entity {
  constructor(text: string, onClick: (gameState: GameState) => void, y: number) {
    super('Button', [
      new Position({ x: -200, y: 250 + y * 55 - 55, layer: 'ui' }),
      new Dimensions({ width: 200, height: 50 }),
      new Background({ colour: '#000000' }),
      new Text(text, '#ffffff', '16px __Inter_aaf875'),
      new Clickable(onClick),
      new Hoverable(
        () => {
          const background = this.getComponent('Background');
          if (!background) return;
          background.colour = '#333333';
          document.querySelector('body')!.style.cursor = 'pointer';
        },
        () => {
          const background = this.getComponent('Background');
          if (!background) return;
          background.colour = '#000000';
          document.querySelector('body')!.style.cursor = 'default';
        },
      ),
    ]);

    // FIXME | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME
    // FIXME | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME
    // FIXME | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME
    // @TODO: this is a hack to center the button, entities should not know about the canvas
    const fixPosition = () => {
      const position = this.getComponent('Position')!;
      const ctx = document.querySelector('canvas')!.getContext('2d')!;
      // center the button
      position.x = (ctx.canvas.width - 200) / 2;
    };
    setTimeout(fixPosition, 1);
    window.addEventListener('resize', fixPosition);
    // FIXME | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME
    // FIXME | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME
    // FIXME | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME  | FIXME
  }
}

export class MainMenu extends Scene {
  constructor() {
    super();

    this.entities = [
      new Button(
        'Start game',
        (gameState) => {
          gameState.__internal.scenes.push(gameState.scene);
          gameState.scene = new World();
        },
        1,
      ),
      new Button('Settings', () => console.log('Settings'), 2),
      new Button(
        'Quit',
        async () => {
          const environment = getEnvironment();
          if (environment === 'desktop') {
            await appWindow.close();
            return;
          }
        },
        3,
      ),
    ];
  }

  update(ctx: CanvasRenderingContext2D, deltaTime: number, gameState: GameState) {
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
  }
}
