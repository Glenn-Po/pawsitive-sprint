import { Game } from './app';

export class UI {
  game: Game;
  fontSize: number;
  fontFamily: string;
  fontColor: string;
  constructor(game: Game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = 'Helvetica';
    this.fontColor = 'black';
  }

  draw() {
    const ctx = this.game.context;
    ctx.save();
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 0;
    ctx.textAlign = 'left';
    ctx.fillStyle = this.fontColor;

    ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    ctx.fillText(`Score: ${this.game.score}`, 20, 50);

    ctx.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
    ctx.fillText(`Time: ${(this.game.timer / 1000).toFixed(1)}`, 20, 80);
    ctx.textAlign = 'center';

    if (this.game.gameOver) {
      if (this.game.score > 5) {
        ctx.font = `${this.fontSize * 2}px ${this.fontFamily}`;
        ctx.fillText(`Boo-Yah`, this.game.width * 0.5, this.game.height * 0.5 - 20);
        ctx.font = `${this.fontSize * 0.7}px ${this.fontFamily}`;
        ctx.fillText(
          `What are creatures of the night afraid of? YOU!!!`,
          this.game.width * 0.5,
          this.game.height * 0.5 + 20
        );
      } else {
        ctx.font = `${this.fontSize * 2}px ${this.fontFamily}`;
        ctx.fillText(`Love at first bite?`, this.game.width * 0.5, this.game.height * 0.5 - 20);
        ctx.font = `${this.fontSize * 0.7}px ${this.fontFamily}`;
        ctx.fillText(`Nope. Better Luck Next time!`, this.game.width * 0.5, this.game.height * 0.5 + 20);
      }
    }
    ctx.restore();
  }
}
