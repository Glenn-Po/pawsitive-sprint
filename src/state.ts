import { Dust, Fire, Splash } from './particles';
import { Player } from './player';

export enum PlayerState {
  SITTING = 0,
  RUNNING,
  JUMPING,
  FALLING,
  ROLLING,
  DIVING,
  HIT,
}

export abstract class State {
  state: PlayerState;
  constructor(state: PlayerState) {
    this.state = state;
  }

  enter() {}
  handleUpdate(input: Array<string>) {}
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
    } else if (input.includes('Enter')) {
      this.player.setState(PlayerState.ROLLING, 2);
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

    this.player.maxFrame = 8;
    this.player.frameY = 3;
  }
  handleUpdate(input: string[]): void {
    //i
    this.player.game.particles.push(
      new Dust(this.player.game, this.player.x + this.player.width * 0.5, this.player.y + this.player.height)
    );
    if (input.includes('ArrowDown')) {
      this.player.setState(PlayerState.SITTING, 0);
    } else if (input.includes('ArrowUp')) {
      this.player.setState(PlayerState.JUMPING, 1);
    } else if (input.includes('Enter')) {
      this.player.setState(PlayerState.ROLLING, 2);
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
    } else if (input.includes('Enter')) {
      this.player.setState(PlayerState.ROLLING, 2);
    } else if (input.includes('ArrowDown')) {
      this.player.setState(PlayerState.DIVING, 0);
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
    } else if (input.includes('ArrowDown')) {
      this.player.setState(PlayerState.DIVING, 0);
    }
  }
}

export class Rolling extends State {
  player: Player;
  constructor(player: Player) {
    super(PlayerState.ROLLING);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 6;
  }
  handleUpdate(input: string[]): void {
    this.player.game.particles.push(
      new Fire(this.player.game, this.player.x + this.player.width * 0.5, this.player.y + this.player.height * 0.5)
    );
    if (!input.includes('Enter') && this.player.onGround()) {
      this.player.setState(PlayerState.RUNNING, 1);
    } else if (!input.includes('Enter') && !this.player.onGround()) {
      this.player.setState(PlayerState.FALLING, 1);
    } else if (input.includes('Enter') && input.includes('ArrowUp') && this.player.onGround()) {
      this.player.vy -= 27;
    } else if (input.includes('ArrowDown') && !this.player.onGround()) {
      this.player.setState(PlayerState.DIVING, 0);
    }
  }
}

export class Diving extends State {
  player: Player;
  constructor(player: Player) {
    super(PlayerState.DIVING);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 6;
    this.player.vy = 15;
  }
  handleUpdate(input: string[]): void {
    this.player.game.particles.push(
      new Fire(this.player.game, this.player.x + this.player.width * 0.5, this.player.y + this.player.height * 0.5)
    );
    if (this.player.onGround()) {
      this.player.setState(PlayerState.RUNNING, 1);
      for (let i = 0; i < 50; i++)
        this.player.game.particles.push(
          new Splash(this.player.game, this.player.x + this.player.width * 0.5, this.player.y + this.player.height)
        );
    } else if (input.includes('Enter') && !this.player.onGround()) {
      this.player.setState(PlayerState.ROLLING, 1);
    }
  }
}

export class Hit extends State {
  player: Player;
  constructor(player: Player) {
    super(PlayerState.HIT);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 10;
    this.player.frameY = 4;
  }
  handleUpdate(input: string[]): void {
    if (this.player.frameX >= 10 && this.player.onGround()) {
      this.player.setState(PlayerState.RUNNING, 1);
    } else if (this.player.frameX >= 10 && !this.player.onGround()) {
      this.player.setState(PlayerState.FALLING, 1);
    }
  }
}
