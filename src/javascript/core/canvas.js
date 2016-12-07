class Canvas {
  constructor(parent) {
    this.createCanvas(parent);
  }

  createCanvas(parent) {
    this.element = document.createElement('canvas');
    this.element.id = 'canvas';
    this.element.className = 'canvas';
    parent.appendChild(this.element);
  }

  set width(value) {
    console.log(value);
    this.element.width = value;
  }

  set height(value) {
    console.log(value);
    this.element.height = value;
  }
}

export default Canvas;
