type Layer = 'background' | 'foreground' | 'player' | 'ui';

type PositionProps = {
  x: number;
  y: number;
  layer: Layer;
};

export class Position {
  public readonly type = 'Position';
  x: number;
  y: number;
  layer: Layer;

  constructor({ x, y, layer }: PositionProps) {
    this.x = x;
    this.y = y;
    this.layer = layer;
  }

  toJSON() {
    return {
      type: 'Position',
      props: {
        x: this.x,
        y: this.y,
        layer: this.layer,
      },
    };
  }
}
