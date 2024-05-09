import { GameState } from '@/game/game-state';

class AnimationSystem {
  update(_ctx: CanvasRenderingContext2D, deltaTime: number, gameState: GameState) {
    for (const entity of gameState.entities) {
      const animation = entity.getComponent('Animation');
      if (!animation) {
        continue;
      }

      // only animate entities with a movement component
      const movement = entity.getComponent('Movement');
      if (!movement) {
        continue;
      }

      // dont animate entities that are not moving
      if (movement.speed === 0) {
        continue;
      }

      // Update the animation step based on the time passed
      // the .speed prop is how long it takes for the whole animation to play
      // the .steps prop is how many steps there are in the animation
      // the .time is where we should save the extra delta if we don't reach the next step
      // allow the animation to loop
      animation.time += deltaTime;
      const animationTick = animation.speed / animation.steps;
      if (animation.time >= animationTick) {
        animation.step = (animation.step + 1) % animation.steps;
        animation.time = 0;
      }
    }
  }
}

export const animationSystem = new AnimationSystem();
