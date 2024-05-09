import { Entity } from '@/game/entity';

export abstract class Scene {
  entities: Entity[] = [];
  x = 0;
  y = 0;
  width = 100;
  height = 100;
}
