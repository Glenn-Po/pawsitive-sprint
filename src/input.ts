type Character = string & {
  length: 1;
};

class InputHandler {
  keys: Array<Character>;
  constructor() {
    this.keys = new Array<Character>();
  }
}
