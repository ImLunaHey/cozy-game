export class Text {
  public readonly type = 'Text';

  constructor(public content: string, public readonly colour: string, public readonly font: string) {}

  toJSON() {
    return {
      type: this.type,
      props: {
        content: this.content,
        colour: this.colour,
        font: this.font,
      },
    };
  }
}
