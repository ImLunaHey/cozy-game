import { MainMenu } from '@/game/scenes/main-menu';
import { GameState } from '../game-state';
import { World } from '@/game/scenes/world';

type Alphabet =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z';
type Numbers = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type DirectionX = 'left' | 'right';
type DirectionY = 'up' | 'down';
type Direction = `${DirectionX | DirectionY}`;
type KnownKeyCodes =
  | `Key${Uppercase<Alphabet>}`
  | 'Space'
  | 'Enter'
  | 'Escape'
  | 'Minus'
  | 'Equal'
  | 'Backquote'
  | `Arrow${Capitalize<Direction>}`
  | `Shift${Capitalize<DirectionX>}`
  | `Meta${Capitalize<DirectionX>}`
  | `Control${Capitalize<DirectionX>}`
  | `Digit${Numbers}`;

class Input {
  public readonly type = 'Input';
  private keyStates: Map<string, boolean> = new Map();
  private mouseState: { x: number; y: number; clicked: boolean } = { x: 0, y: 0, clicked: false };

  constructor() {
    const keydown = this.handleKeyDown.bind(this);
    const keyup = this.handleKeyUp.bind(this);
    const mousemove = this.handleMouseMove.bind(this);
    const mousedown = this.handleMouseDown.bind(this);
    const mouseup = this.handleMouseUp.bind(this);

    // clean up event listeners
    window.removeEventListener('keydown', keydown);
    window.removeEventListener('keyup', keyup);
    window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mousedown', mousedown);
    window.removeEventListener('mouseup', mouseup);

    // add event listeners
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mousedown', mousedown);
    window.addEventListener('mouseup', mouseup);
  }

  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    this.keyStates.set(event.code, true);
  }

  handleKeyUp(event: KeyboardEvent) {
    event.preventDefault();
    if (event.code === 'MetaLeft' || event.code === 'MetaRight') {
      // clear all key states when the meta key is released
      this.keyStates.clear();
    } else {
      this.keyStates.set(event.code, false);
    }
  }

  handleMouseMove(event: MouseEvent) {
    this.mouseState = {
      x: event.clientX,
      y: event.clientY,
      clicked: this.mouseState.clicked,
    };
  }

  handleMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.mouseState = {
      x: event.clientX,
      y: event.clientY,
      clicked: true,
    };
  }

  handleMouseUp(event: MouseEvent) {
    event.preventDefault();
    this.mouseState.clicked = false;
  }

  isKeyPressed(code: KnownKeyCodes): boolean {
    return this.keyStates.get(code) || false;
  }

  isDirectionPressed(direction: Direction): boolean {
    switch (direction) {
      case 'up':
        return this.isKeyPressed('ArrowUp') || this.isKeyPressed('KeyW');
      case 'down':
        return this.isKeyPressed('ArrowDown') || this.isKeyPressed('KeyS');
      case 'left':
        return this.isKeyPressed('ArrowLeft') || this.isKeyPressed('KeyA');
      case 'right':
        return this.isKeyPressed('ArrowRight') || this.isKeyPressed('KeyD');
    }
  }

  isShiftPressed(): boolean {
    return this.isKeyPressed('ShiftLeft') || this.isKeyPressed('ShiftRight');
  }

  keysPressed(): string[] {
    return Array.from(this.keyStates.entries())
      .filter(([, value]) => value)
      .map(([key]) => key);
  }

  update(ctx: CanvasRenderingContext2D, deltaTime: number, gameState: GameState) {
    // check if escape key is pressed
    if (this.isKeyPressed('Escape')) {
      this.keyStates.clear();

      // if the game is running allow the user to open the main menu
      if (gameState.scene instanceof World) {
        // backup the world scene if it doesnt exist in the internal scenes
        if (!gameState.__internal.scenes.includes(gameState.scene)) {
          gameState.__internal.scenes.push(gameState.scene);
        }

        // open the main menu
        const mainMenu = gameState.__internal.scenes.find((scene) => scene instanceof MainMenu)!;
        gameState.scene = mainMenu;
      }

      // if the main menu is open and we have an existing scene switch back to it
      else if (gameState.scene instanceof MainMenu && gameState.__internal.scenes.length > 0) {
        const lastScene = gameState.__internal.scenes.pop()!;
        gameState.scene = lastScene;
      }
    }

    // check if mouse clicked on a clickable entity
    if (this.mouseState.clicked) {
      this.mouseState.clicked = false;
      const entities = gameState.scene.entities.filter((entity) => entity.hasComponent('Clickable'));
      const clickedEntity = entities.find((entity) => {
        const position = entity.getComponent('Position');
        const dimensions = entity.getComponent('Dimensions');
        return (
          position &&
          dimensions &&
          this.mouseState.x >= position.x &&
          this.mouseState.x <= position.x + dimensions.width &&
          this.mouseState.y >= position.y &&
          this.mouseState.y <= position.y + dimensions.height
        );
      });

      if (clickedEntity) {
        const clickable = clickedEntity.getComponent('Clickable');
        clickable?.onClick(gameState);
      }
    }

    // check if mouse is hovering over a hoverable entity
    const entities = gameState.scene.entities.filter((entity) => entity.hasComponent('Hoverable'));
    const hoveredEntity = entities.find((entity) => {
      const position = entity.getComponent('Position');
      const dimensions = entity.getComponent('Dimensions');
      return (
        position &&
        dimensions &&
        this.mouseState.x >= position.x &&
        this.mouseState.x <= position.x + dimensions.width &&
        this.mouseState.y >= position.y &&
        this.mouseState.y <= position.y + dimensions.height
      );
    });

    // set the newly hovered entity to be hovering
    if (hoveredEntity) {
      const hoverable = hoveredEntity.getComponent('Hoverable');
      if (hoverable) {
        hoverable.isHovering = true;
        hoverable.onHoverStart(gameState);
      }
    }

    // set all other entities to not be hovering
    for (const entity of entities) {
      if (entity !== hoveredEntity) {
        const hoverable = entity.getComponent('Hoverable');
        if (!hoverable) continue;
        if (hoverable.isHovering) {
          hoverable.isHovering = false;
          hoverable.onHoverEnd(gameState);
        }
      }
    }

    // ctrl - and ctrl + to zoom in and out
    if (this.isKeyPressed('MetaLeft') || this.isKeyPressed('MetaRight')) {
      if (this.isKeyPressed('Minus')) {
        gameState.__internal.zoom -= 0.5;
      } else if (this.isKeyPressed('Equal')) {
        gameState.__internal.zoom += 0.5;
      } else if (this.isKeyPressed('Digit0')) {
        gameState.__internal.zoom = 1;
      }

      // clamp zoom level between 0.25 and 10
      gameState.__internal.zoom = Math.min(10, Math.max(0.25, gameState.__internal.zoom));
    }

    // backtick to toggle debug mode
    if (this.isKeyPressed('Backquote')) {
      gameState.__internal.debug = !gameState.__internal.debug;
    }
  }
}

export const inputSystem = new Input();
