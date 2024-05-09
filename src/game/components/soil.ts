type SoilType = 'Clay' | 'Silt' | 'Peat' | 'Loam' | 'Sand';
type SoilProps = {
  type: SoilType;
};

export class Soil {
  public readonly type = 'Soil';
  soilType: SoilType;

  constructor(props: SoilProps) {
    this.soilType = props.type;
  }

  toJSON() {
    return {
      type: 'Soil',
      props: {
        type: this.soilType,
      },
    };
  }
}
