import { Game } from './app';

export abstract class Enemy {
  frameX = 0;
  frameY = 0;
  fps = 20;
  frameInterval = 1000 / this.fps;
  frameTimer = 0;
  width: number = 0;
  height: number = 0;
  x = 0;
  y = 0;
  speedX = 0;
  speedY = 0;
  maxFrame = 5;
  markedForDeletion = false;
  image?: HTMLImageElement;
  game: Game;
  constructor(game: Game) {
    this.game = game;
    this.x = this.game.width;
  }

  update(deltaTime: number) {
    this.x -= this.speedX + (this.game?.speed ?? 0);
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      this.frameX = this.frameX < this.maxFrame ? this.frameX + 1 : 0;
    } else this.frameTimer += deltaTime;

    if (this.x + this.width < 0) this.markedForDeletion = true;
  }

  draw() {
    this.game!.context.drawImage(
      this.image!,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

//bird, fly, ghost
export class FlyingEnemy extends Enemy {
  angle: number = 0;
  va = 0;
  constructor(game: Game) {
    super(game);
    this.width = 60;
    this.height = 44;
    this.speedX = 1 + Math.random() * 2;
    this.maxFrame = 5;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.image = document.querySelector('#enemy-fly')!;
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1; //angluar velocity
  }

  override update(deltaTime: number): void {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class GroundEnemy extends Enemy {
  constructor(game: Game) {
    super(game);
    this.width = 60;
    this.height = 87;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = document.querySelector('#enemy-plant')!;
    this.speedX = 0;
    this.speedY = 0;
    this.maxFrame = 0;
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(game: Game) {
    super(game);
    this.width = 120;
    this.height = 144;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = 0;
    this.speedY = Math.random() < 0.5 ? 1 : -1;
    this.maxFrame = 5;
    this.image = document.querySelector('#enemy-spider-big')!;
  }

  override update(deltaTime: number): void {
    super.update(deltaTime);
    if (this.y > this.game.height - this.game.groundMargin - this.height) this.speedY *= -1;
    if (this.y < -this.height) this.markedForDeletion = true;
  }
  override draw(): void {
    super.draw();
    this.game.context.beginPath();
    this.game.context.moveTo(this.x + this.width * 0.5, 0);

    this.game.context.lineTo(this.x + this.width * 0.5, this.y + this.height * 0.5);
    this.game.context.stroke();
  }
}
