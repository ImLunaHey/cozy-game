type Direction = 'up' | 'down' | 'left' | 'right';

export type AssetProps = {
  src: string;
  animatedSrc?: string;
  width: number;
  height: number;
  offsets?: {
    x?: number;
    y?: number;
  };
  animationOffsets?: {
    x?: number;
    y?: number;
  };
  scale?: number;
  direction?: Direction;
  aligned?: 'center' | 'bottom';
};

export class Asset {
  public readonly type = 'Asset';
  image: HTMLImageElement;
  animatedImage?: HTMLImageElement;
  offsets: { x: number; y: number };
  animationOffsets: { x: number; y: number };
  scale: number;
  direction?: Direction;
  state: 'idle' | 'loaded' | 'error' = 'idle';
  aligned: 'center' | 'bottom';

  constructor({ src, animatedSrc, width, height, offsets, animationOffsets, scale, direction, aligned }: AssetProps) {
    this.image = new Image();
    this.image.src = src;
    this.image.width = width;
    this.image.height = height;

    // If animatedSrc is provided, load the animated image
    if (animatedSrc) {
      this.animatedImage = new Image();
      this.animatedImage.src = animatedSrc;
      this.animatedImage.width = width;
      this.animatedImage.height = height;
    }

    this.offsets = {
      x: offsets?.x ?? 0,
      y: offsets?.y ?? 0,
    };
    this.animationOffsets = {
      x: animationOffsets?.x ?? 0,
      y: animationOffsets?.y ?? 0,
    };
    this.scale = scale ?? 1;
    this.direction = direction;
    this.aligned = aligned ?? 'bottom';
    this.image.onload = () => {
      this.state = 'loaded';
    };
    this.image.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      this.state = 'error';
    };
  }

  toJSON() {
    return {
      type: 'Asset',
      props: {
        src: this.image.src,
        animatedSrc: this.animatedImage?.src,
        width: this.image.width,
        height: this.image.height,
        offsets: this.offsets,
        scale: this.scale,
        direction: this.direction,
        aligned: this.aligned,
      },
    };
  }
}
