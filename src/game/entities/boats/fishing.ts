import { AssetSet } from '@/game/components/asset-set';
import { Dimensions } from '@/game/components/dimensions';
import { Movement } from '@/game/components/movement';
import { Position } from '@/game/components/position';
import { Entity } from '@/game/entity';

type FishingBoatProps = {
  x: number;
  y: number;
  area: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export class FishingBoat extends Entity {
  constructor({ x, y, area }: FishingBoatProps) {
    super('Decoration', [
      new Position({ y, x, layer: 'background' }),
      new Dimensions({ height: 128, width: 128 }),
      new Movement({ speed: 0.25, direction: 'right', area }),
      new AssetSet({
        up: { src: '/assets/boats/all_full_boats.png', height: 128, width: 128, offsets: { x: 256 } },
        down: { src: '/assets/boats/all_full_boats.png', height: 128, width: 128, offsets: { x: 768 } },
        left: { src: '/assets/boats/all_full_boats.png', height: 128, width: 128, offsets: { x: 512 } },
        right: { src: '/assets/boats/all_full_boats.png', height: 128, width: 128 },
      }),
    ]);
  }
}
