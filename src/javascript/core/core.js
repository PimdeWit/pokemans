import Canvas from './canvas.js';

class Pokemans {
  constructor(parent) {
    this.canvas = new Canvas(parent);
  }

  addEventListeners() {
    window.addEventListener('resize', function() {
      this.canvas.width = this.canvas.element.parentNode.offsetWidth;
      this.canvas.height = this.canvas.element.parentNode.offsetHeight;
    }.bind(this));
  }
}

export default Pokemans;
