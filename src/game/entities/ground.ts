import { Background } from '../components/background';
import { Dimensions } from '../components/dimensions';
import { Position } from '../components/position';
import { Entity } from '../entity';

type GroundProps = {
  width: number;
  height: number;
};

export class Ground extends Entity {
  constructor({ height, width }: GroundProps) {
    super('Ground', [
      new Position({ y: 0, x: 0, layer: 'background' }),
      new Dimensions({ height, width }),
      new Background({ colour: '#8FDE5C' }),
    ]);
  }
}
