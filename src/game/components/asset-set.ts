import { Asset, AssetProps } from './asset';

export type AssetSetProps = {
  up: AssetProps;
  down: AssetProps;
  left: AssetProps;
  right: AssetProps;
};

export class AssetSet {
  public readonly type = 'AssetSet';
  up: Asset;
  down: Asset;
  left: Asset;
  right: Asset;

  constructor({ up, down, left, right }: AssetSetProps) {
    this.up = new Asset(up);
    this.down = new Asset(down);
    this.left = new Asset(left);
    this.right = new Asset(right);
  }

  toJSON() {
    return {
      type: 'AssetSet',
      props: {
        up: this.up.toJSON().props,
        down: this.down.toJSON().props,
        left: this.left.toJSON().props,
        right: this.right.toJSON().props,
      },
    };
  }
}
