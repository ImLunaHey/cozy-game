type GrowthStageProps = {
  /**
   * The speed of growth
   */
  speed: number;
  /**
   * The current stage of growth
   */
  stage: number;
  /**
   * The total number of growth stages
   */
  stages: number;
};

export class GrowthStage {
  public readonly type = 'GrowthStage';
  /**
   * The speed of growth
   */
  speed: number;
  /**
   * The current stage of growth
   */
  stage: number;
  /**
   * The total number of growth stages
   */
  stages: number;

  constructor({ speed, stage, stages }: GrowthStageProps) {
    this.speed = speed;
    this.stage = stage;
    this.stages = stages;
  }

  toJSON() {
    return {
      type: 'GrowthStage',
      props: {
        speed: this.speed,
        stage: this.stage,
        stages: this.stages,
      },
    };
  }
}
