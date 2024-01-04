import { Player } from './player';

export enum PlayerState {
  SITTING = 0,
  RUNNING,
  JUMPING,
  FALLING,
}

export abstract class State {
  state: PlayerState;
  constructor(state: PlayerState) {
    this.state = state;
  }

  enter() {}
  handleUpdate(input?: Array<string>) {}
}

export class Sitting extends State {
  player: Player;
  constructor(player: Player) {
    super(PlayerState.SITTING);
    this.player = player;
  }

  override enter() {
    this.player.frameX = 0;

    this.player.maxFrame = 4;
    this.player.frameY = 5;
  }
  override handleUpdate(input: Array<string>): void {
    //if the player wants to move, then change teh state to running
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
      this.player.setState(PlayerState.RUNNING, 1);
    }
  }
}

export class Running extends State {
  player: Player;
  constructor(player: Player) {
    super(PlayerState.RUNNING);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;

    this.player.maxFrame = 6;
    this.player.frameY = 3;
  }
  handleUpdate(input: string[]): void {
    //i
    if (input.includes('ArrowDown')) {
      this.player.setState(PlayerState.SITTING, 0);
    } else if (input.includes('ArrowUp')) {
      this.player.setState(PlayerState.JUMPING, 1);
    }
  }
}

export class Jumping extends State {
  player: Player;
  constructor(player: Player) {
    super(PlayerState.JUMPING);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;

    this.player.maxFrame = 6;
    this.player.frameY = 1;
    if (this.player.onGround()) this.player.y -= 200; //this.player.game.height - this.player.height; // go up
  }
  handleUpdate(input: string[]): void {
    //if the player wants to move, then change teh state to running
    if (this.player.vy > this.player.weight) {
      this.player.setState(PlayerState.FALLING, 1);
    }
  }
}

export class Falling extends State {
  player: Player;
  constructor(player: Player) {
    super(PlayerState.FALLING);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 2;
    if (this.player.onGround()) this.player.y -= 30; //this.player.game.height - this.player.height; // go up
  }
  handleUpdate(input: string[]): void {
    //if the player wants to move, then change teh state to running
    if (this.player.onGround()) {
      this.player.setState(PlayerState.RUNNING, 1);
    }
  }
}
