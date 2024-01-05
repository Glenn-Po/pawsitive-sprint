import { Game } from './app';

abstract class Particle {
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
}

export class Dust extends Particle {
  color: string;
  constructor(game: Game, x: number, y: number) {
    super(game);
    this.size = Math.random() * 10 + 10;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = 'black';
  }

  draw() {
    const ctx = this.game.context;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); //full cicle
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export class Splash extends Particle {}

export class Fire extends Particle {}
