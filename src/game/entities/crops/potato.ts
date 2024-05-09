import { Asset } from '@/game/components/asset';
import { Dimensions } from '@/game/components/dimensions';
import { GrowthStage } from '@/game/components/growth-stage';
import { Position } from '@/game/components/position';
import { Soil } from '@/game/components/soil';
import { Entity } from '@/game/entity';

type PotatoProps = {
  x: number;
  y: number;
};

export class Potato extends Entity {
  constructor({ x, y }: PotatoProps) {
    super('Potato', [
      new Position({ x, y, layer: 'foreground' }),
      new Dimensions({ width: 64, height: 64 }),
      new Asset({
        height: 32,
        width: 16,
        src: '/assets/farming/crops/ground/potatos/potato_crop_lifecycle.png',
        offsets: {
          x: 0,
          y: 0,
        },
        scale: 4,
      }),
      new Soil({ type: 'Silt' }),
      new GrowthStage({ speed: 100, stage: 0, stages: 5 }),
    ]);
  }
}
