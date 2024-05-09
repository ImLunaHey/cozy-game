import { AssetSet } from '@/game/components/asset-set';
import { GameState } from '@/game/game-state';
import { Entity } from '../entity';

class CameraSystem {
  centerCamera(ctx: CanvasRenderingContext2D, gameState: GameState) {
    // as the player moves keep the camera centered on them
    const player = gameState.entities.find((entity) => entity.type === 'Player');
    if (!player) {
      return;
    }

    const position = player.getComponent('Position');
    if (!position) {
      return;
    }

    const canvas = ctx.canvas;
    const halfWidth = canvas.width / 2;
    const halfHeight = canvas.height / 2; // Adjusted for centering
    const x = position.x - halfWidth;
    const y = position.y - halfHeight;

    // Set transformation matrix to center on player
    ctx.setTransform(1, 0, 0, 1, -x, -y);
  }

  clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  drawEntities(ctx: CanvasRenderingContext2D, gameState: GameState, entities: Entity[]) {
    const sortedEntities = entities.sort((a, b) => {
      const aPosition = a.getComponent('Position');
      const bPosition = b.getComponent('Position');

      return (aPosition?.y ?? 0) - (bPosition?.y ?? 0);
    });

    // draw each entity
    for (const entity of sortedEntities) {
      const position = entity.getComponent('Position');
      const dimensions = entity.getComponent('Dimensions');

      // skip entities without a position or dimensions
      if (!position || !dimensions) continue;

      // check if the entity has a coloured canvas
      const background = entity.getComponent('Background');
      if (background) {
        ctx.fillStyle = background.colour;
        ctx.fillRect(position.x, position.y, dimensions.width, dimensions.height);
        continue;
      }

      const assets = entity.getComponents('Asset');
      const assetSets = entity.getComponents('AssetSet');
      const movement = entity.getComponent('Movement');

      // combine assets and asset sets
      const drawables = movement?.direction
        ? [...assets.filter((asset) => asset.direction === movement.direction), ...assetSets]
        : [assets[0] ?? assetSets[0]];

      // entity has no assets to draw
      if (drawables.length === 0) {
        continue;
      }

      // draw the each of the assets
      for (const drawable of drawables) {
        // get the asset to draw
        const asset = drawable instanceof AssetSet ? drawable[movement?.direction ?? 'down'] : drawable;

        // Calculate scaled dimensions of the asset
        const scaledWidth = asset.image.width * asset.scale;
        const scaledHeight = asset.image.height * asset.scale;

        // Center the asset vertically around the entity's position
        const destinationY =
          asset.aligned === 'center'
            ? position.y + (dimensions.height - scaledHeight) / 2
            : position.y + dimensions.height - scaledHeight;

        // Center the asset horizontally around the entity's position
        const destinationX = position.x + (dimensions.width - scaledWidth) / 2;

        // Draw a missing asset image if the asset is in an error state
        if (asset.state === 'error') {
          // draw text saying the asset name
          ctx.fillStyle = 'red';
          ctx.font = '10px monospace';
          ctx.fillText(asset.image.src.replace(location.href, ''), destinationX, destinationY);
        }

        // Draw the asset if it is in a loaded state
        if (asset.state === 'loaded') {
          // check if the entity has a growth stage component
          const growthStage = entity.getComponent('GrowthStage');
          const stageOffset = growthStage?.stage && asset.state === 'loaded' ? growthStage.stage * asset.image.width : 0;
          const animation = entity.getComponent('Animation');
          const animationOffset =
            asset.animatedImage && animation?.step !== undefined
              ? // prettier-ignore
                asset.animatedImage.width * (animation?.step || 1) * 2 + (asset.animatedImage.width /2)
              : 0;

          ctx.drawImage(
            asset.animatedImage ? asset.animatedImage : asset.image,
            animationOffset ? asset.animationOffsets.x + animationOffset : asset.offsets.x + stageOffset, // source x
            asset.offsets.y, // source y
            asset.image.width, // source width
            asset.image.height, // source height
            destinationX, // destination x
            destinationY, // destination y
            scaledWidth, // destination width
            scaledHeight, // destination height
          );
        }
      }
    }
  }

  resetCamera(ctx: CanvasRenderingContext2D) {
    // Reset transformation matrix to default
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  drawSoil(ctx: CanvasRenderingContext2D, gameState: GameState) {
    for (const entity of gameState.entities) {
      // check if this entity has a soil, position and dimensions
      const soil = entity.getComponent('Soil');
      const position = entity.getComponent('Position');
      const dimensions = entity.getComponent('Dimensions');
      if (!soil) continue;
      if (!position) continue;
      if (!dimensions) continue;

      // draw the soil
      ctx.fillStyle =
        soil.soilType === 'Clay'
          ? '#8B4513'
          : soil.soilType === 'Silt'
          ? '#C0C0C0'
          : soil.soilType === 'Peat'
          ? '#D2B48C'
          : soil.soilType === 'Loam'
          ? '#A52A2A'
          : soil.soilType === 'Sand'
          ? '#FFD700'
          : '#000000';

      // make the soil a little transparent
      ctx.save();
      ctx.globalAlpha = 0.75;

      // draw the soil as a rect with pixelated corners
      ctx.beginPath();
      ctx.roundRect(position.x + 5, position.y + 5, dimensions.width - 10, dimensions.height - 10, 10);
      ctx.fill();
      ctx.restore();
    }
  }

  drawDebug(ctx: CanvasRenderingContext2D, gameState: GameState) {
    // draw debug outlines
    if (!gameState.__internal.debug) return;
    for (const entity of gameState.entities) {
      const position = entity.getComponent('Position');
      const dimensions = entity.getComponent('Dimensions');
      if (!position || !dimensions) continue;

      // set the font for the debug text
      ctx.font = '10px monospace';

      // draw an outline of the entity
      ctx.strokeStyle = 'red';
      ctx.fillStyle = 'red';
      ctx.strokeRect(position.x, position.y, dimensions.width, dimensions.height);
      ctx.fillText(`Type: ${entity.type}`, position.x, position.y - 5);

      // draw the entity's movement area
      const movement = entity.getComponent('Movement');
      if (movement && movement.area) {
        ctx.strokeStyle = 'blue';
        ctx.fillStyle = 'blue';
        ctx.fillText(`Movement Area: ${entity.type}`, movement.area.x, movement.area.y - 5);
        ctx.strokeRect(movement.area.x, movement.area.y, movement.area.width, movement.area.height);
      }
    }
  }

  drawUI(ctx: CanvasRenderingContext2D, gameState: GameState) {
    this.drawEntities(
      ctx,
      gameState,
      gameState.entities.filter((entitiy) => {
        const position = entitiy.getComponent('Position');
        return position?.layer === 'ui';
      }),
    );
  }

  drawForeground(ctx: CanvasRenderingContext2D, gameState: GameState) {
    this.drawEntities(
      ctx,
      gameState,
      gameState.entities.filter((entitiy) => {
        const position = entitiy.getComponent('Position');
        return position?.layer === 'foreground' || position?.layer === 'player';
      }),
    );
  }

  drawBackground(ctx: CanvasRenderingContext2D, gameState: GameState) {
    this.drawEntities(
      ctx,
      gameState,
      gameState.entities.filter((entitiy) => {
        const position = entitiy.getComponent('Position');
        return position?.layer === 'background';
      }),
    );
  }

  drawVoid(ctx: CanvasRenderingContext2D, gameState: GameState) {
    ctx.fillStyle = '#4CA1F7';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  draw(ctx: CanvasRenderingContext2D, gameState: GameState) {
    // clear the last frame
    this.clearCanvas(ctx);

    // draw the void
    this.drawVoid(ctx, gameState);

    // center the camera on the player
    this.centerCamera(ctx, gameState);

    // background assets
    this.drawBackground(ctx, gameState);

    // soil assets
    this.drawSoil(ctx, gameState);

    // foreground + player assets
    this.drawForeground(ctx, gameState);

    // ui assets
    this.drawUI(ctx, gameState);

    // draw debug outlines
    this.drawDebug(ctx, gameState);

    // reset the camera for the next frame
    this.resetCamera(ctx);
  }
}

export const cameraSystem = new CameraSystem();
