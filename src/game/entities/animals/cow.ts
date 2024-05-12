import { Animation } from '@/game/components/animation';
import { AssetSet } from '@/game/components/asset-set';
import { Dimensions } from '@/game/components/dimensions';
import { Movement } from '@/game/components/movement';
import { Position } from '@/game/components/position';
import { Entity } from '@/game/entity';

type CowProps = {
  x: number;
  y: number;
  area: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export class Cow extends Entity {
  constructor({ x, y, area }: CowProps) {
    super('Decoration', [
      new Position({ y, x, layer: 'foreground' }),
      new Dimensions({ height: 64, width: 64 }),
      new Movement({ speed: 0.25, direction: 'right', area }),
      new AssetSet({
        up: {
          src: '/assets/farming/animals/cow/cow_all_frames.png',
          height: 32,
          width: 32,
          offsets: { x: 100000, y: 32 },
          scale: 4,
        },
        down: {
          src: '/assets/farming/animals/cow/cow_all_frames.png',
          height: 32,
          width: 32,
          offsets: { x: 0, y: 32 },
          scale: 4,
        },
        left: {
          src: '/assets/farming/animals/cow/cow_all_frames.png',
          offsets: { x: 32, y: 32 },
          height: 32,
          width: 32,
          scale: 4,
        },
        right: {
          src: '/assets/farming/animals/cow/cow_all_frames.png',
          height: 32,
          width: 32,
          offsets: { x: 128, y: 32 },
          scale: 4,
        },
      }),
    ]);
  }
}
