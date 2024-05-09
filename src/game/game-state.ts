import { Animation } from './components/animation';
import { Asset } from './components/asset';
import { AssetSet } from './components/asset-set';
import { Background } from './components/background';
import { Dimensions } from './components/dimensions';
import { GrowthStage } from './components/growth-stage';
import { Movement } from './components/movement';
import { Position } from './components/position';
import { Soil } from './components/soil';
import { Cow } from './entities/animals/cow';
import { SmallBoat } from './entities/boats/small';
import { Artichoke } from './entities/crops/artichoke';
import { Asparagus } from './entities/crops/asparagus';
import { Beet } from './entities/crops/beet';
import { Bokchoy } from './entities/crops/bokchoy';
import { Cabbage } from './entities/crops/cabbage';
import { Carrot } from './entities/crops/carrot';
import { Cauliflower } from './entities/crops/cauliflower';
import { Corn } from './entities/crops/corn';
import { Cotton } from './entities/crops/cotton';
import { EggPlant } from './entities/crops/eggplant';
import { Garlic } from './entities/crops/garlic';
import { Leek } from './entities/crops/leek';
import { Onion } from './entities/crops/onion';
import { Peas } from './entities/crops/peas';
import { Potato } from './entities/crops/potato';
import { Pumpkin } from './entities/crops/pumpkin';
import { Radish } from './entities/crops/radish';
import { Spinach } from './entities/crops/spinach';
import { Stawberry } from './entities/crops/strawberry';
import { Sunflower } from './entities/crops/sunflower';
import { Tomato } from './entities/crops/tomato';
import { Watermelon } from './entities/crops/watermelon';
import { Wheat } from './entities/crops/wheat';
import { Grass } from './entities/decorations/grass';
import { Player } from './entities/player';
import { World } from './entities/world';
import { Entity } from './entity';

export type GameState = {
  /**
   * Internal game state properties
   */
  __internal: {
    debug: boolean;
    state: 'playing' | 'paused' | 'game-over' | 'loading';
  };

  tick: number;
  entities: Entity[];
};

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
];
const getRandomCrop = (x: number, y: number) => {
  const Crop = possibleCrops[Math.floor(Math.random() * possibleCrops.length)];
  return new Crop({ x, y });
};

const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min);

const crops = [];
const rows = randomNumber(5, 10);
const cols = randomNumber(5, 10);

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    crops.push(getRandomCrop(i * 64 + 64, j * 64 + 64));
  }
}

const width = 1_000;
const height = 1_000;
const world = new World({ width, height });
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
const boat = new SmallBoat({ x: 500, y: -100, area: { x: -500, y: -500, width: 2000, height: 500 } });
const animals = Array.from(
  { length: 5 * 1000 },
  (_, i) =>
    new Cow({
      x: randomNumber(20, width - 20),
      y: randomNumber(20, height - 20),
      area: { x: 20, y: 20, width: width - 20, height: height - 20 },
    }),
);

const defaultEntities = [world, boat, ...animals, ...grass, ...crops, player];

const defaultGameState: GameState = {
  tick: 1,
  entities: defaultEntities,
  __internal: {
    debug: false,
    state: 'playing',
  },
};

export const loadGameState = () => {
  const loadedGameState = localStorage.getItem('gameState');
  const gameState = loadedGameState ? (JSON.parse(loadedGameState) as GameState) : (JSON.parse(JSON.stringify(defaultGameState)) as GameState);

  // Function to reconstruct components based on their types
  function recreateComponent({ type, props }: any) {
    switch (type) {
      case 'Animation':
        return new Animation(props);
      case 'Asset':
        return new Asset(props);
      case 'AssetSet':
        return new AssetSet(props);
      case 'Background':
        return new Background(props);
      case 'Dimensions':
        return new Dimensions(props);
      case 'GrowthStage':
        return new GrowthStage(props);
      case 'Movement':
        return new Movement(props);
      case 'Position':
        return new Position(props);
      case 'Soil':
        return new Soil(props);
      default:
        throw new Error(`Unrecognized component type: ${type}`);
    }
  }

  // Function to recreate each entity with its components
  function recreateEntity({ type, components }: any): Entity {
    const recreatedComponents = components.map(recreateComponent);
    return new Entity(type, recreatedComponents);
  }

  // Recreate all entities
  const entities = gameState.entities.map(recreateEntity);

  return {
    __internal: gameState.__internal,
    tick: gameState.tick,
    entities: entities,
  };
};
