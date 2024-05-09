import { Animation } from './components/animation';
import { Asset } from './components/asset';
import { AssetSet } from './components/asset-set';
import { Background } from './components/background';
import { Dimensions } from './components/dimensions';
import { GrowthStage } from './components/growth-stage';
import { Movement } from './components/movement';
import { Position } from './components/position';
import { Soil } from './components/soil';

type EntityTypes =
  // Crops
  | 'Artichoke'
  | 'Asparagus'
  | 'Beet'
  | 'Bokchoy'
  | 'Cabbage'
  | 'Carrot'
  | 'Cauliflower'
  | 'Corn'
  | 'Cotton'
  | 'Eggplant'
  | 'Garlic'
  | 'Leek'
  | 'Onion'
  | 'Peas'
  | 'Potato'
  | 'Pumpkin'
  | 'Radish'
  | 'Spinach'
  | 'Stawberry'
  | 'Sunflower'
  | 'Tomato'
  | 'Watermelon'
  | 'Wheat'
  // Other things
  | 'Ground'
  | 'Decoration'
  | 'Player'
  // ui
  | 'Button';

type ComponentTypeMap = {
  Animation: Animation;
  Asset: Asset;
  AssetSet: AssetSet;
  Background: Background;
  Dimensions: Dimensions;
  GrowthStage: GrowthStage;
  Movement: Movement;
  Position: Position;
  Soil: Soil;
};

type Component = ComponentTypeMap[keyof ComponentTypeMap];

export class Entity {
  type: EntityTypes;
  components: Component[];

  constructor(type: EntityTypes, components: Component[] = []) {
    this.type = type;
    this.components = components;
  }

  addComponent(component: Component) {
    this.components.push(component);
  }

  getComponent<K extends keyof ComponentTypeMap>(type: K): ComponentTypeMap[K] | undefined {
    return this.components.find((component) => component.type === type) as ComponentTypeMap[K];
  }

  getComponents<K extends keyof ComponentTypeMap>(type: K): ComponentTypeMap[K][] {
    return this.components.filter((component) => component.type === type) as ComponentTypeMap[K][];
  }

  hasComponent<K extends keyof ComponentTypeMap>(type: K): boolean {
    return this.components.some((component) => component.type === type);
  }

  removeComponent<K extends keyof ComponentTypeMap>(type: K): void {
    this.components = this.components.filter((component) => component.type !== type);
  }
}
