import { AssetSet } from '@/game/components/asset-set';
import { Dimensions } from '@/game/components/dimensions';
import { Movement } from '@/game/components/movement';
import { Position } from '@/game/components/position';
import { Entity } from '@/game/entity';

type SmallBoatProps = {
  x: number;
  y: number;
  area: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export class SmallBoat extends Entity {
  constructor({ x, y, area }: SmallBoatProps) {
    super('Decoration', [
      new Position({ y, x, layer: 'background' }),
      new Dimensions({ height: 128, width: 128 }),
      new Movement({ speed: 0.25, direction: 'right', area }),
      new AssetSet({
        up: { src: '/assets/boats/all_full_boats.png', height: 128, width: 128, offsets: { x: 256, y: 256 } },
        down: { src: '/assets/boats/all_full_boats.png', height: 128, width: 128, offsets: { x: 768, y: 256 } },
        left: { src: '/assets/boats/all_full_boats.png', height: 128, width: 128, offsets: { x: 512, y: 256 } },
        right: { src: '/assets/boats/all_full_boats.png', height: 128, width: 128, offsets: { y: 256 } },
      }),
    ]);
  }
}
