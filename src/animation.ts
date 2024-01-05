import { Game } from './app';

export class CollisionAnimation {
  game: Game;
  image: HTMLImageElement;
  spriteWidth = 100;
  spriteHeight = 90;
  sizeModifier = Math.random() + 0.5;
  width = 0;
  height = 0;
  x = 0;
  y = 0;
  markedForDeletion = false;
  frameX = 0;
  maxFrame = 4;
  fps = Math.random() * 10 + 5;
  frameInterval = 1000 / this.fps;
  frameTimer = 0;
  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.image = document.querySelector('#collide')!;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
  }

  draw() {
    this.game.context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update(deltaTime: number) {
    this.x -= this.game.speed;
    if (this.frameTimer > this.frameInterval) {
      this.frameX++;
      this.frameTimer = 0;
    } else this.frameTimer += deltaTime;
    if (this.frameX > this.maxFrame) this.markedForDeletion = true;
  }
}
