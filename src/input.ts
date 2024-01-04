export class InputHandler {
  keys: Array<string>;
  constructor() {
    this.keys = new Array<string>(); // will contain only active keys
    const acceptedKeys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Enter'];
    window.addEventListener('keydown', (event: KeyboardEvent) => {
      //add key only if it is accepted and it is not in the keys array
      if (acceptedKeys.includes(event.key) && !this.keys.includes(event.key)) this.keys.push(event.key);
    });

    window.addEventListener('keyup', (event: KeyboardEvent) => {
      //remove key from list
      if (acceptedKeys.includes(event.key)) this.keys.splice(this.keys.indexOf(event.key), 1);
    });
  }
}
