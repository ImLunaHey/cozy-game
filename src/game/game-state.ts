import { Scene } from '@/game/scenes/scene';
import { Animation } from './components/animation';
import { Asset } from './components/asset';
import { AssetSet } from './components/asset-set';
import { Background } from './components/background';
import { Dimensions } from './components/dimensions';
import { GrowthStage } from './components/growth-stage';
import { Movement } from './components/movement';
import { Position } from './components/position';
import { Soil } from './components/soil';
import { Entity } from './entity';
import { MainMenu } from '@/game/scenes/main-menu';

/**
 * reconstruct components based on their types
 */
const recreateComponent = ({ type, props }: any) => {
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
};

/**
 * recreate each entity with its components
 */
const recreateEntity = ({ type, components }: any): Entity => {
  const recreatedComponents = components.map(recreateComponent);
  return new Entity(type, recreatedComponents);
};

export type GameState = {
  /**
   * Internal game state properties
   */
  __internal: {
    debug: boolean;
    state: 'playing' | 'paused' | 'game-over' | 'loading';
    zoom: number;
    scenes: Scene[];
  };

  tick: number;
  scene: Scene;
};

export const loadGameState = (): GameState => {
  const mainMenu = new MainMenu();
  return {
    __internal: {
      debug: false,
      state: 'playing' as const,
      zoom: 1,
      scenes: [mainMenu],
    },

    tick: 1,
    scene: mainMenu,
  };
};
