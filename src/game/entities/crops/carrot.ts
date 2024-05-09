import { Asset } from '@/game/components/asset';
import { Dimensions } from '@/game/components/dimensions';
import { GrowthStage } from '@/game/components/growth-stage';
import { Position } from '@/game/components/position';
import { Soil } from '@/game/components/soil';
import { Entity } from '@/game/entity';

type CarrotProps = {
  x: number;
  y: number;
};

export class Carrot extends Entity {
  constructor({ x, y }: CarrotProps) {
    super('Carrot', [
      new Position({ x, y, layer: 'foreground' }),
      new Dimensions({ width: 64, height: 64 }),
      new Asset({
        height: 32,
        width: 16,
        src: '/assets/farming/crops/ground/carrot/carrot_crop_lifecycle.png',
        offsets: {
          x: 0,
          y: 0,
        },
        scale: 4,
      }),
      new Soil({ type: 'Loam' }),
      new GrowthStage({ speed: 100, stage: 0, stages: 5 }),
    ]);
  }
}
