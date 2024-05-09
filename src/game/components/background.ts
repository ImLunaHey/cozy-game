type Colour = `#${string}` | `rgb(${number},${number},${number})` | `rgba(${number},${number},${number},${number})`;

type CanvasProps = {
  colour: Colour;
};

export class Background {
  public readonly type = 'Background';
  colour: Colour;

  constructor({ colour }: CanvasProps) {
    this.colour = colour;
  }

  toJSON() {
    return {
      type: 'Background',
      props: {
        colour: this.colour,
      },
    };
  }
}
