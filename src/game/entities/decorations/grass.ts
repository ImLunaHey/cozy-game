import { Asset } from '@/game/components/asset';
import { Dimensions } from '@/game/components/dimensions';
import { Position } from '@/game/components/position';
import { Entity } from '@/game/entity';

type GrassProps = {
  x: number;
  y: number;
};

export class Grass extends Entity {
  constructor({ x, y }: GrassProps) {
    super('Decoration', [
      new Position({ x, y, layer: 'background' }),
      new Dimensions({ width: 64, height: 64 }),
      new Asset({
        src: 'assets/tileset/SmallBurg_outside_assets.png',
        width: 16,
        height: 16,
        offsets: {
          x: 256,
          y: 128,
        },
        scale: 4,
      }),
    ]);
  }
}
