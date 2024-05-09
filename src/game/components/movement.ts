type Direction = 'up' | 'down' | 'left' | 'right';
type Area = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type MovementProps = {
  speed: number;
  direction?: Direction;
  area?: Area;
  destination?: { x: number; y: number };
};

export class Movement {
  public readonly type = 'Movement';
  speed: number;
  state: 'idle' | 'walking' | 'running' | 'jumping' = 'idle';
  direction?: Direction;
  area?: Area;
  destination?: { x: number; y: number };

  constructor({ speed, direction, area, destination }: MovementProps) {
    this.speed = speed;
    this.direction = direction;
    this.area = area;
    this.destination = destination;
  }

  toJSON() {
    return {
      type: 'Movement',
      props: {
        speed: this.speed,
        direction: this.direction,
        area: this.area,
        destination: this.destination,
      },
    };
  }
}
