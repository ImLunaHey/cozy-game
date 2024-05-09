import { Animation } from '@/game/components/animation';
import { Asset } from '@/game/components/asset';
import { AssetSet } from '@/game/components/asset-set';
import { Dimensions } from '@/game/components/dimensions';
import { Movement } from '@/game/components/movement';
import { Position } from '@/game/components/position';
import { Entity } from '@/game/entity';

const nudePlayer = new AssetSet({
  up: {
    height: 32,
    width: 32,
    src: '/assets/character/idle/character_body/character_idle_body_light.png',
    animatedSrc: '/assets/character/walk/character_body/character_walk_body_light.png',
    offsets: {
      x: 16,
      y: 208,
    },
    scale: 4,
    aligned: 'center',
  },
  down: {
    height: 32,
    width: 32,
    src: '/assets/character/idle/character_body/character_idle_body_light.png',
    animatedSrc: '/assets/character/walk/character_body/character_walk_body_light.png',
    offsets: {
      x: 16,
      y: 144,
    },
    scale: 4,
    aligned: 'center',
  },
  left: {
    height: 32,
    width: 32,
    src: '/assets/character/idle/character_body/character_idle_body_light.png',
    animatedSrc: '/assets/character/walk/character_body/character_walk_body_light.png',
    offsets: {
      x: 16,
      y: 80,
    },
    scale: 4,
    aligned: 'center',
  },
  right: {
    height: 32,
    width: 32,
    src: '/assets/character/idle/character_body/character_idle_body_light.png',
    animatedSrc: '/assets/character/walk/character_body/character_walk_body_light.png',
    offsets: {
      x: 16,
      y: 16,
    },
    scale: 4,
    aligned: 'center',
  },
});

const hazmatSuit = [
  new Asset({
    height: 32,
    width: 32,
    src: '/assets/character/idle/clothes/full_body/hazmat/character_idle_clothes_fullbody_hazmat.png',
    offsets: {
      x: 16,
      y: 208,
    },
    scale: 4,
    direction: 'up',
  }),
  new Asset({
    height: 32,
    width: 32,
    src: '/assets/character/idle/clothes/full_body/hazmat/character_idle_clothes_fullbody_hazmat.png',
    offsets: {
      x: 16,
      y: 144,
    },
    scale: 4,
    direction: 'down',
  }),
  new Asset({
    height: 32,
    width: 32,
    src: '/assets/character/idle/clothes/full_body/hazmat/character_idle_clothes_fullbody_hazmat.png',
    offsets: {
      x: 16,
      y: 80,
    },
    scale: 4,
    direction: 'left',
  }),
  new Asset({
    height: 32,
    width: 32,
    src: '/assets/character/idle/clothes/full_body/hazmat/character_idle_clothes_fullbody_hazmat.png',
    offsets: {
      x: 16,
      y: 16,
    },
    scale: 4,
    direction: 'right',
  }),
];

const overalls = new AssetSet({
  up: {
    height: 32,
    width: 32,
    src: '/assets/character/idle/clothes/full_body/overhalls/character_idle_clothes_fullbody_overhalls_blue.png',
    offsets: {
      x: 16,
      y: 208,
    },
    scale: 4,
    aligned: 'center',
  },
  down: {
    height: 32,
    width: 32,
    src: '/assets/character/idle/clothes/full_body/overhalls/character_idle_clothes_fullbody_overhalls_blue.png',
    offsets: {
      x: 16,
      y: 144,
    },
    scale: 4,
    aligned: 'center',
  },
  left: {
    height: 32,
    width: 32,
    src: '/assets/character/idle/clothes/full_body/overhalls/character_idle_clothes_fullbody_overhalls_blue.png',
    offsets: {
      x: 16,
      y: 80,
    },
    scale: 4,
    aligned: 'center',
  },
  right: {
    height: 32,
    width: 32,
    src: '/assets/character/idle/clothes/full_body/overhalls/character_idle_clothes_fullbody_overhalls_blue.png',
    offsets: {
      x: 16,
      y: 16,
    },
    scale: 4,
    aligned: 'center',
  },
});

type PlayerProps = {
  x: number;
  y: number;
};

export class Player extends Entity {
  constructor({ x, y }: PlayerProps) {
    super('Player', [
      new Position({ x, y, layer: 'player' }),
      new Movement({ speed: 0, direction: 'down' }),
      new Dimensions({ width: 64, height: 64 }),
      // player
      nudePlayer,
      // clothes
      // overalls,
      new Animation({
        speed: 100,
        steps: 6,
        step: 0,
      }),
    ]);
  }
}
