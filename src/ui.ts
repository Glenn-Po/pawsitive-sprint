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

    ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    ctx.textAlign = 'left';
    ctx.fillStyle = this.fontColor;
    //score

    ctx.fillText(`Score: ${this.game.score}`, 20, 50);
  }
}
