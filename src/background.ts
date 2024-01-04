import { Game } from './app';

export class Layer {
  game: Game;
  x = 0;
  y = 0;
  width: number;
  height: number;
  speedModifer: number;
  image: HTMLImageElement;
  constructor(game: Game, width: number, height: number, speedModifier: number, image: HTMLImageElement) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifer = speedModifier;
    this.image = image;
  }

  update() {
    this.x = this.x < -this.width ? 0 : this.x - this.game.speed * this.speedModifer;
  }

  draw() {
    this.game.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.game.context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height); //create illustion of continuity
  }
}

export class BackGround {
  width = 1667;
  height = 500;
  layerImages: Array<HTMLImageElement>;
  bgLayers: Array<Layer>;
  game: Game;
  constructor(game: Game) {
    this.game = game;
    this.layerImages = new Array<HTMLImageElement>();
    this.bgLayers = new Array<Layer>();
    for (const [index, speedModifer] of [0, 0.2, 0.4, 0.8, 1].entries()) {
      this.layerImages.push(document.querySelector(`#layer-${index + 1}`)!);
      this.bgLayers.push(new Layer(this.game, this.width, this.height, speedModifer, this.layerImages.slice(-1)[0]));
    }
    // this.bgLayers.push(new Layer(this.game, this.width, this.height, 1, this.layerImages[4]));
  }

  update() {
    this.bgLayers.forEach((layer) => layer.update());
  }

  draw() {
    this.bgLayers.forEach((layer) => layer.draw());
  }
}
