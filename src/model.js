
// Implémenter ici les 4 classes du modèle.
// N'oubliez pas l'héritage !

class Drawing {
  constructor() {
    this.shapes = new Array()
  }

  addShape(shape) {
    if (shape instanceof Shape)
      return this.shapes.push(shape) - 1
    else
      console.error('AppModel.addShape - the given parameter is not an instance of Shape. This object is:' + shape)
      return -1
  }

  updateShape(index, shape) {
    if (!shape instanceof Shape) {
      console.error('AppModel.updateShape - the given parameter is not an instance of Shape. This object is:' + shape)
    } else {
      this.shapes[index] = shape
    }
  }

  removeShape(shape) {
    this.shapes.splice(this.shapes.indexOf(shape), 1)
  }

}

class Shape {
  constructor(color, lineWidth) {
    this.color = color
    this.lineWidth = lineWidth
  }
}

class Rectangle extends Shape {
  constructor(x0, y0, width, height, color, lineWidth) {
    super(color, lineWidth)
    this.topLeftCornerCoordinates = { x: x0, y: y0 }
    this.width = width
    this.height = height
  }

  toString() {
    return `Rectangle(${this.topLeftCornerCoordinates.x}, ${this.topLeftCornerCoordinates.y}, ${this.width}, ${this.height})`
  }
}

class Line extends Shape {
  constructor(x0, y0, x1, y1, color, lineWidth) {
    super(color, lineWidth)
    this.firstPointCoordinates = { x: x0, y: y0 }
    this.secondPointCoordinates = { x: x1, y: y1 }
  }

  toString() {
    return `Line(${this.firstPointCoordinates.x}, ${this.firstPointCoordinates.y}, ${this.secondPointCoordinates.x}, ${this.secondPointCoordinates.y})`
  }
}
