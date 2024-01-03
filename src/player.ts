import { Game } from './app';
class Player {
  game: Game;
  width: number = 100;
  height: number = 91.3;
  x: number = 0;
  y: number = 100;
  image: HTMLImageElement = document.querySelector('#player')!;
  constructor(game: Game) {
    this.game = game;
  }

  update() {
    this.x += 1;
  }

  draw(context: CanvasRenderingContext2D) {
    // context.fillRect(this.x, this.y, this.width, this.height);
    context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }
}

export { Player };
