type AnimationProps = {
  speed: number;
  /**
   * The current step of the animation
   */
  step: number;
  /**
   * The total number of steps in the animation
   */
  steps: number;
};

export class Animation {
  public readonly type = 'Animation';
  time: number = 0;
  speed: number;
  step: number;
  steps: number;
  constructor({ speed, step, steps }: AnimationProps) {
    this.speed = speed;
    this.step = step;
    this.steps = steps;
  }

  toJSON() {
    return {
      type: 'Animation',
      props: {
        speed: this.speed,
        step: this.step,
        steps: this.steps,
      },
    };
  }
}
