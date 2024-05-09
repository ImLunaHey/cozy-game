import { inputSystem } from '@/game/systems/input';
import { GameState } from '@/game/game-state';

class MovementSystem {
  update(_ctx: CanvasRenderingContext2D, deltaTime: number, gameState: GameState) {
    const player = gameState.scene.entities.find((e) => e.type === 'Player');
    if (!player) return;

    // skip non-moving entities
    const movement = player.getComponent('Movement');
    const position = player.getComponent('Position');
    const dimensions = player.getComponent('Dimensions');
    if (!movement || !position || !dimensions) return;

    // if the entity is falling off the edge stop all movement
    // this needs to take the entity's dimensions into account
    if (
      position.x < gameState.scene.x ||
      position.x + dimensions.width > gameState.scene.x + gameState.scene.width ||
      position.y < gameState.scene.y ||
      position.y + dimensions.height > gameState.scene.y + gameState.scene.height
    ) {
      movement.speed = 0;
      position.x = Math.min(
        Math.max(position.x, gameState.scene.x),
        gameState.scene.x + gameState.scene.width - dimensions.width,
      );
      position.y = Math.min(
        Math.max(position.y, gameState.scene.y),
        gameState.scene.y + gameState.scene.height - dimensions.height,
      );
      return;
    }

    const shiftHeld = inputSystem.isShiftPressed();
    const left = inputSystem.isDirectionPressed('left');
    const right = inputSystem.isDirectionPressed('right');
    const up = inputSystem.isDirectionPressed('up');
    const down = inputSystem.isDirectionPressed('down');
    const speed = shiftHeld ? 1.5 : 1;

    // Check key states to determine movement direction
    if (left) {
      movement.speed = speed;
      position.x -= movement.speed * deltaTime;
      movement.direction = 'left';
    } else if (right) {
      movement.speed = speed;
      position.x += movement.speed * deltaTime;
      movement.direction = 'right';
    } else if (up) {
      movement.speed = speed;
      position.y -= movement.speed * deltaTime;
      movement.direction = 'up';
    } else if (down) {
      movement.speed = speed;
      position.y += movement.speed * deltaTime;
      movement.direction = 'down';
    } else {
      movement.speed = 0;
    }
  }
}

export const movementSystem = new MovementSystem();
