import { inputSystem } from '@/game/systems/input';
import { GameState } from '@/game/game-state';

class MovementSystem {
  update(_ctx: CanvasRenderingContext2D, deltaTime: number, gameState: GameState) {
    const world = gameState.entities.find((e) => e.type === 'World');
    const worldPosition = world?.getComponent('Position');
    const worldDimensions = world?.getComponent('Dimensions');
    const player = gameState.entities.find((e) => e.type === 'Player');
    if (!player) return;

    // skip non-moving entities
    const movement = player.getComponent('Movement');
    const position = player.getComponent('Position');
    const dimensions = player.getComponent('Dimensions');
    if (!movement || !position || !dimensions) return;

    // if the world doesn't exist, stop all movement
    if (!world || !worldPosition || !worldDimensions) {
      movement.speed = 0;
      return;
    }

    // if the entity is falling off the edge stop all movement
    // this needs to take the entity's dimensions into account
    if (
      position.x < worldPosition.x ||
      position.x + dimensions.width > worldPosition.x + worldDimensions.width ||
      position.y < worldPosition.y ||
      position.y + dimensions.height > worldPosition.y + worldDimensions.height
    ) {
      movement.speed = 0;
      position.x = Math.min(
        Math.max(position.x, worldPosition.x),
        worldPosition.x + worldDimensions.width - dimensions.width,
      );
      position.y = Math.min(
        Math.max(position.y, worldPosition.y),
        worldPosition.y + worldDimensions.height - dimensions.height,
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
