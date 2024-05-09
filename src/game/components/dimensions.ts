export class Dimensions {
  public readonly type = 'Dimensions';
  width: number;
  height: number;

  constructor({ width, height }: { width: number; height: number }) {
    this.width = width;
    this.height = height;
  }

  toJSON() {
    return {
      type: 'Dimensions',
      props: {
        width: this.width,
        height: this.height,
      },
    };
  }
}
