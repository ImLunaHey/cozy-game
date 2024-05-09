import { MainMenu } from '@/scenes/main-menu';
import { GameState } from '../game-state';
import { World } from '@/scenes/world';

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
type Direction = 'up' | 'down' | 'left' | 'right';
type KnownKeyCodes =
  | `Key${Uppercase<Alphabet>}`
  | 'Space'
  | 'Enter'
  | 'Escape'
  | 'ShiftLeft'
  | 'ShiftRight'
  | `Arrow${Capitalize<Direction>}`;

class Input {
  public readonly type = 'Input';
  private keyStates: Map<string, boolean> = new Map();

  constructor() {
    const keydown = this.handleKeyDown.bind(this);
    const keyup = this.handleKeyUp.bind(this);

    // clean up event listeners
    window.removeEventListener('keydown', keydown);
    window.removeEventListener('keyup', keyup);

    // add event listeners
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);
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
    if (this.isKeyPressed('Escape')) {
      this.keyStates.clear();
      gameState.scene = gameState.scene.constructor.name === 'MainMenu' ? new World() : new MainMenu();
    }
  }
}

export const inputSystem = new Input();
