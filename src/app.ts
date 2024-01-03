import { Player } from './player';

window.addEventListener('load', function () {
  const canvas = document.querySelector<HTMLCanvasElement>('#canvas')!;
  canvas.width = 500;
  canvas.height = 500;
  const ctx = canvas.getContext('2d')!;

  const game = new Game(canvas.width, canvas.height, ctx);
  console.log(game);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw();
    requestAnimationFrame(animate);
  }

  animate();
});

class Game {
  width: number;
  height: number;
  player: Player;
  context: CanvasRenderingContext2D;
  constructor(width: number, height: number, context: CanvasRenderingContext2D) {
    this.width = width;
    this.height = height;
    this.context = context;
    this.player = new Player(this);
  }

  update() {
    this.player.update();
  }

  draw() {
    this.player.draw(this.context);
  }
}

export { Game };
