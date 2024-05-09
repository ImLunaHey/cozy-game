import { Asset } from '@/game/components/asset';
import { Dimensions } from '@/game/components/dimensions';
import { GrowthStage } from '@/game/components/growth-stage';
import { Position } from '@/game/components/position';
import { Soil } from '@/game/components/soil';
import { Entity } from '@/game/entity';

type SunflowerProps = {
  x: number;
  y: number;
};

export class Sunflower extends Entity {
  constructor({ x, y }: SunflowerProps) {
    super('Sunflower', [
      new Position({ x, y, layer: 'foreground' }),
      new Dimensions({ width: 64, height: 64 }),
      new Asset({
        height: 32,
        width: 16,
        src: '/assets/farming/crops/ground/sunflower/sunflower_crop_lifecycle.png',
        offsets: {
          x: 0,
          y: 0,
        },
        scale: 4,
      }),
      new Soil({ type: 'Sand' }),
      new GrowthStage({ speed: 100, stage: 0, stages: 5 }),
    ]);
  }
}
