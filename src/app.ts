import { BackGround } from './background';
import { ClimbingEnemy, Enemy, FlyingEnemy, GroundEnemy } from './enemy';
import { InputHandler } from './input';
import { Player } from './player';
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
    requestAnimationFrame(animate);
  }

  animate(0);
});

class Game {
  width: number;
  height: number;
  groundMargin: number;

  score: number = 0;

  speed: number = 0; //pixels per frame
  maxSpeed = 4;
  player: Player;

  context: CanvasRenderingContext2D;
  background = new BackGround(this);
  input: InputHandler = new InputHandler();

  enemies: Array<Enemy>;
  enemyTimer: number = 0;
  enemyInterval: number = 1000;

  constructor(width: number, height: number, context: CanvasRenderingContext2D) {
    this.width = width;
    this.height = height;
    this.groundMargin = 80;
    this.context = context;
    this.player = new Player(this);
    this.enemies = new Array<Enemy>();
  }

  update(deltaTime: number) {
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
  }

  draw() {
    this.background.draw();
    this.enemies.forEach((enemy) => enemy.draw());
    this.player.draw();
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
