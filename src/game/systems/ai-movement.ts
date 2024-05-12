import { GameState } from '../game-state';

class AiMovementSystem {
  update(ctx: CanvasRenderingContext2D, deltaTime: number, gameState: GameState) {
    for (const entity of gameState.scene.entities) {
      // dont move the player
      if (entity.type === 'Player') continue;

      // only move entities with a Movement component
      const position = entity.getComponent('Position');
      const movement = entity.getComponent('Movement');
      const dimensions = entity.getComponent('Dimensions');
      if (!movement || !position || !dimensions) continue;

      // only allow the entity to move within their bounded area
      const bounds = movement.area;
      if (!bounds) continue;

      // if the entitiy has no destination, set one
      if (!movement.destination) {
        movement.destination = {
          x: Math.max(bounds.x, Math.random() * bounds.width + bounds.x),
          y: Math.max(bounds.y, Math.random() * bounds.height + bounds.y),
        };

        // set direction based on destination
        if (movement.destination.x > position.x) {
          movement.direction = 'right';
        } else {
          movement.direction = 'left';
        }
      }

      // move the entity towards the destination
      const dx = movement.destination.x - position.x;
      const dy = movement.destination.y - position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // if the entity is close to the destination, set a new one
      if (dist < 5) {
        movement.destination = {
          x: Math.max(bounds.x, Math.random() * bounds.width + bounds.x),
          y: Math.max(bounds.y, Math.random() * bounds.height + bounds.y),
        };
      }

      // move the entity
      const speed = movement.speed;
      const angle = Math.atan2(dy, dx);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      position.x += vx * deltaTime;
      position.y += vy * deltaTime;

      const outofBounds =
        position.x < bounds.x ||
        position.x + dimensions.width > bounds.x + bounds.width ||
        position.y < bounds.y ||
        position.y + dimensions.height > bounds.y + bounds.height;

      // make sure the entity stays within bounds
      if (outofBounds) {
        if (position.x < bounds.x) position.x = bounds.x;
        if (position.x + dimensions.width > bounds.x + bounds.width) position.x = bounds.x + bounds.width - dimensions.width;
        if (position.y < bounds.y) position.y = bounds.y;
        if (position.y + dimensions.height > bounds.y + bounds.height)
          position.y = bounds.y + bounds.height - dimensions.height;

        movement.destination = {
          x: Math.max(bounds.x, Math.random() * bounds.width + bounds.x),
          y: Math.max(bounds.y, Math.random() * bounds.height + bounds.y),
        };
      }
    }
  }
}

export const aiMovementSystem = new AiMovementSystem();
