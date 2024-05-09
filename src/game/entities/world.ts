import { Background } from '../components/background';
import { Dimensions } from '../components/dimensions';
import { Position } from '../components/position';
import { Entity } from '../entity';

type WorldProps = {
  width: number;
  height: number;
};

export class World extends Entity {
  constructor({ height, width }: WorldProps) {
    super('World', [
      new Position({ y: 0, x: 0, layer: 'background' }),
      new Dimensions({ height, width }),
      new Background({ colour: '#8FDE5C' }),
    ]);
  }
}
