import { CollisionAnimation } from './animation';
import { BackGround } from './background';
import { ClimbingEnemy, Enemy, FlyingEnemy, GroundEnemy } from './enemy';
import { InputHandler } from './input';
import { Particle } from './particles';
import { Player } from './player';
import { UI } from './ui';
window.addEventListener('load', function () {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext('2d')!;

  const game = new Game(canvas.width, canvas.height, ctx);
  console.log(game);

  let lastTime = 0;

  function animate(timeStamp: number) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw();
    if (!game.gameOver) requestAnimationFrame(animate);
  }

  animate(0);
});

class Game {
  width: number;
  height: number;
  groundMargin: number;

  score: number = 0;
  timer: number = 0;
  maxTime: number = 10_000;
  gameOver = false;

  speed: number = 0; //pixels per frame
  maxSpeed = 4;
  player: Player;

  context: CanvasRenderingContext2D;
  background = new BackGround(this);
  input: InputHandler = new InputHandler();

  enemies: Array<Enemy>;
  enemyTimer: number = 0;
  enemyInterval: number = 1000;

  particles: Array<Particle>;
  maxParticles = 100;

  collisions: Array<CollisionAnimation>;
  ui: UI;

  constructor(width: number, height: number, context: CanvasRenderingContext2D) {
    this.width = width;
    this.height = height;
    this.groundMargin = 80;
    this.context = context;
    this.player = new Player(this);
    this.enemies = new Array<Enemy>();
    this.particles = new Array<Particle>();
    this.collisions = new Array<CollisionAnimation>();
    this.ui = new UI(this);
  }

  update(deltaTime: number) {
    this.timer += deltaTime;
    if (this.timer > this.maxTime) this.gameOver = true;
    this.background.update();
    this.enemies.forEach((enemy) => enemy.update(deltaTime));
    this.player.update(this.input.keys, deltaTime);

    //handle enemies
    this.enemyTimer += deltaTime;

    if (this.enemyTimer >= this.enemyInterval) {
      this.enemyTimer = 0;
      this.addEnemy();
    }

    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

    //handle particles
    this.particles.forEach((particle) => particle.update());
    this.particles = this.particles.filter((particle) => !particle.markedForDeletion);
    if (this.particles.length >= this.maxParticles) this.particles = this.particles.slice(-this.maxParticles);

    //handle collision sprites
    this.collisions.forEach((collision) => collision.update(deltaTime));
    this.collisions = this.collisions.filter((collision) => !collision.markedForDeletion);
  }

  draw() {
    this.background.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    this.particles.forEach((particle) => particle.draw());
    this.collisions.forEach((collision) => collision.draw());
    this.player.draw();
    this.ui.draw();
  }

  addEnemy() {
    if (this.speed > 0 && Math.random() < 0.5) {
      this.enemies.push(new GroundEnemy(this));
    } else if (this.speed > 0) {
      this.enemies.push(new ClimbingEnemy(this));
    }
    this.enemies.push(new FlyingEnemy(this));
  }
}

export { Game };
