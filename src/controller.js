
const editingMode = { rect: 0, line: 1 };

class Pencil {
	constructor(ctx, drawing, canvas) {
    this.currEditingMode = editingMode.line;
    this.currLineWidth = 5;
    this.currColour = '#000000';
    this.currentShape = 0;
    new DnD(canvas, this);

    this.ctx = ctx
    this.canvas = canvas

    this.drawing = drawing

    // Liez ici les widgets à la classe pour modifier les attributs présents ci-dessus.
    document.getElementById('spinnerWidth').onchange = (evt) => this.updateLineWidth(evt)
    document.getElementById('colour').onchange = (evt) => this.updateColour(evt)
    document.getElementById('butRect').onchange = (evt) => this.currEditingMode = editingMode.rect
    document.getElementById('butLine').onchange = (evt) => this.currEditingMode = editingMode.line
  }

  updateView() {
    this.drawing.paint(this.ctx, this.canvas)
  }

  updateShapeList() {
    const shapeListInnerHtml = this.drawing.shapes
      .map((shape) => this.shapeToButton(shape))
      .reduce((acc, val) => acc + val)

    const shapeList = document.getElementById('shapeList')
    shapeList.innerHTML = shapeListInnerHtml
  }

  shapeToButton(shape) {
    console.log('shape to button ')
    return `<button type="button"><span class="fa fa-remove"></span>${shape.toString()}</button><br/>`
  }

  updateLineWidth(evt) {
    this.currLineWidth = evt.target.value
  }

  updateColour(evt) {
    this.currColour = evt.target.value
  }

	// Implémentez ici les 3 fonctions onInteractionStart, onInteractionUpdate et onInteractionEnd
  onInteractionStart(dnd) {
    const shape = this.createShape(dnd)
    this.currentShape = this.drawing.addShape(shape)
    this.updateView()
  }

  onInteractionUpdate(dnd) {
    const shape = this.createShape(dnd)
    this.drawing.updateShape(this.currentShape, shape)
    this.updateView()
  }

  onInteractionEnd(dnd) {
    this.onInteractionUpdate(dnd)
    this.updateView()
    this.updateShapeList()
  }

  createShape(dnd) {
    return this.currEditingMode === editingMode.rect
      ? this.createRectangle(dnd)
      : this.createLine(dnd)
  }

  createRectangle(dnd) {
    return new Rectangle(
      dnd.startingPosition.x, dnd.startingPosition.y,
      this.computeRectangleWidth(dnd.startingPosition, dnd.endingPosition),
      this.computeRectangleHeight(dnd.startingPosition, dnd.endingPosition),
      this.currColour,
      this.currLineWidth
    )
  }

  computeRectangleWidth(startingPosition, endingPosition) {
    return endingPosition.x - startingPosition.x
  }

  computeRectangleHeight(startingPosition, endingPosition) {
    return endingPosition.y - startingPosition.y
  }

  createLine(dnd) {
    return new Line(
      dnd.startingPosition.x, dnd.startingPosition.y,
      dnd.endingPosition.x, dnd.endingPosition.y,
      this.currColour,
      this.currLineWidth
    )
  }

}
