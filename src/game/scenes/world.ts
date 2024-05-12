import { Cow } from '@/game/entities/animals/cow';
import { SmallBoat } from '@/game/entities/boats/small';
import { Artichoke } from '@/game/entities/crops/artichoke';
import { Asparagus } from '@/game/entities/crops/asparagus';
import { Beet } from '@/game/entities/crops/beet';
import { Bokchoy } from '@/game/entities/crops/bokchoy';
import { Cabbage } from '@/game/entities/crops/cabbage';
import { Carrot } from '@/game/entities/crops/carrot';
import { Cauliflower } from '@/game/entities/crops/cauliflower';
import { Corn } from '@/game/entities/crops/corn';
import { Cotton } from '@/game/entities/crops/cotton';
import { EggPlant } from '@/game/entities/crops/eggplant';
import { Garlic } from '@/game/entities/crops/garlic';
import { Leek } from '@/game/entities/crops/leek';
import { Onion } from '@/game/entities/crops/onion';
import { Peas } from '@/game/entities/crops/peas';
import { Potato } from '@/game/entities/crops/potato';
import { Pumpkin } from '@/game/entities/crops/pumpkin';
import { Radish } from '@/game/entities/crops/radish';
import { Spinach } from '@/game/entities/crops/spinach';
import { Stawberry } from '@/game/entities/crops/strawberry';
import { Sunflower } from '@/game/entities/crops/sunflower';
import { Tomato } from '@/game/entities/crops/tomato';
import { Watermelon } from '@/game/entities/crops/watermelon';
import { Wheat } from '@/game/entities/crops/wheat';
import { Grass } from '@/game/entities/decorations/grass';
import { Player } from '@/game/entities/player';
import { Scene } from './scene';
import { Ground } from '@/game/entities/ground';
import { FishingBoat } from '../entities/boats/fishing';

const possibleCrops = [
  Artichoke,
  Asparagus,
  Beet,
  Bokchoy,
  Cabbage,
  Carrot,
  Cauliflower,
  Corn,
  Cotton,
  EggPlant,
  Garlic,
  Leek,
  Onion,
  Peas,
  Potato,
  Pumpkin,
  Radish,
  Spinach,
  Stawberry,
  Sunflower,
  Tomato,
  Watermelon,
  Wheat,
] as const;

const getRandomCrop = (x: number, y: number) => {
  const Crop = possibleCrops[Math.floor(Math.random() * possibleCrops.length)];
  return new Crop({ x, y });
};

const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

export class World extends Scene {
  height = 1_000;
  width = 1_000;

  constructor() {
    super();

    const crops: ReturnType<typeof getRandomCrop>[] = [];
    const rows = randomNumber(5, 10);
    const cols = randomNumber(5, 10);

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        crops.push(getRandomCrop(i * 64 + 64, j * 64 + 64));
      }
    }

    const width = 1_000;
    const height = 1_000;
    const ground = new Ground({ width, height });
    const player = new Player({ x: 0, y: 0 });
    const grass = Array.from(
      { length: 100 },
      () =>
        new Grass({
          // make sure the grass is within the world bounds
          // grass are 16x16 pixels
          // so we need to make sure they are at least 16 pixels away from the edge
          x: randomNumber(16, width - 64),
          y: randomNumber(16, height - 64),
        }),
    );
    const boats = [
      new SmallBoat({ x: 500, y: -100, area: { x: -500, y: -500, width: 2000, height: 500 } }),
      new FishingBoat({ x: 400, y: -200, area: { x: -500, y: -500, width: 2000, height: 500 } }),
    ];
    const animals = Array.from(
      { length: 20 },
      (_, i) =>
        new Cow({
          x: randomNumber(20, width - 20),
          y: randomNumber(20, height - 20),
          area: { x: 20, y: 20, width: width - 20, height: height - 20 },
        }),
    );

    this.entities = [ground, ...boats, ...animals, ...grass, ...crops, player];
  }
}
