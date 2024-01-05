import { Game } from './app';

export abstract class Particle {
  game: Game;
  markedForDeletion = false;
  x = 0;
  y = 0;
  speedX = 0;
  speedY = 0;
  size = 50;
  constructor(game: Game) {
    this.game = game;
  }

  update() {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= 0.95;
    if (this.size < 0.5) this.markedForDeletion = true;
  }

  draw() {}
}

export class Dust extends Particle {
  color: string;
  constructor(game: Game, x: number, y: number) {
    super(game);
    this.size = Math.random() * 10 + 10;
    this.x = x - this.size * 0.4;
    this.y = y - this.size * 0.5;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = 'rgba(200, 180, 60, 0.3)';
  }

  override draw() {
    const ctx = this.game.context;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); //full cicle
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export class Splash extends Particle {
  image: HTMLImageElement;
  gravity = 0;
  constructor(game: Game, x: number, y: number) {
    super(game);
    this.size = Math.random() * 100 + 100;
    this.x = x;
    this.y = y;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 2 + 2;
    this.image = document.querySelector('#fire')!;
  }

  override update(): void {
    super.update();
    this.gravity += 0.1;
    this.y += this.gravity;
  }
  override draw() {
    const ctx = this.game.context;
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}

export class Fire extends Particle {
  image: HTMLImageElement;
  angle = 0;
  va = Math.random() * 0.2 - 0.1;
  constructor(game: Game, x: number, y: number) {
    super(game);
    this.size = Math.random() * 100 + 50;
    this.x = x;
    this.y = y;
    this.speedX = 1;
    this.speedY = 1;
    this.image = document.querySelector('#fire')!;
  }

  override update(): void {
    super.update();
    this.angle += this.va;
    this.x += Math.sin(this.angle * 10);
  }
  override draw() {
    const ctx = this.game.context;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
    ctx.restore();
  }
}
