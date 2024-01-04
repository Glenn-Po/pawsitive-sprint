import { Game } from './app';
import { Falling, Jumping, PlayerState, Running, Sitting, State } from './state';
class Player {
  game: Game;
  width: number = 100;
  height: number = 91.3;
  x: number;
  y: number;
  time = 0;
  speed = 0;
  vy = 0;
  MAX_SPEED = 10;
  EARTH_G = 9.81;
  DELTA_TIME = 1;
  image: HTMLImageElement = document.querySelector('#player')!;
  frameX = 0;
  frameY = 0;
  maxFrame = 5;
  fps = 20;
  frameInterval: number;
  frameTimer = 0;
  states: Array<State>;
  currentState: State;
  weight = 0.2;
  constructor(game: Game) {
    this.game = game;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.frameInterval = 1000 / this.fps;
    this.states = [new Sitting(this), new Running(this), new Jumping(this), new Falling(this)];
    this.currentState = this.states[0];
    this.currentState.enter();
  }

  update(input: Array<string>, deltaTime: number) {
    this.currentState.handleUpdate(input);
    //horizontal movement handling
    this.x += this.speed;
    if (input.includes('ArrowRight')) this.speed = this.MAX_SPEED;
    else if (input.includes('ArrowLeft')) this.speed = -this.MAX_SPEED;
    else this.speed = 0;

    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

    //vertical movemnt
    // if (input.includes('ArrowUp') && this.onGround()) this.y -= this.game.height - this.height; // go up

    this.y += this.vy;

    // else if (input.includes('ArrowDown') && !this.onGround()) this.y = 400;

    if (!this.onGround()) this.vy += this.weight;
    //this.EARTH_G * (this.DELTA_TIME += this.DELTA_TIME); //reducing the velocity due to pull of gravity
    else {
      this.vy = 0;
      //   this.DELTA_TIME = 0;
      //   this.y = this.game.height - this.height;
    }

    //sprite animations
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      this.frameX = this.frameX < this.maxFrame ? this.frameX + 1 : 0;
    } else this.frameTimer += deltaTime;
  }

  draw() {
    // context.fillRect(this.x, this.y, this.width, this.height);
    this.game.context.drawImage(
      this.image,
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

  onGround(): boolean {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  setState(state: PlayerState, speed: number) {
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState = this.states[state.valueOf()];
    this.currentState.enter();
  }

  checkCollision() {
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
      }
    });
  }
}

export { Player };
