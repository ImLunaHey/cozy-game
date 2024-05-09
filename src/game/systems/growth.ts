import { GameState } from '@/game/game-state';

class GrowthSystem {
  update(ctx: CanvasRenderingContext2D, deltaTime: number, gameState: GameState) {
    for (const entity of gameState.scene.entities) {
      // grow crops
      const growthStage = entity.getComponent('GrowthStage');
      if (growthStage) {
        if (gameState.tick % growthStage.speed === 0) {
          if (growthStage.stage === growthStage.stages) {
            // crop is fully grown, stop growing
            continue;
          }

          // if the crop doesnt have soil it wont grow
          const soil = entity.getComponent('Soil');
          if (!soil) {
            continue;
          }

          growthStage.stage += 1;
        }
      }
    }
  }
}

export const growthSystem = new GrowthSystem();
