
// Implémenter ici les fonctions paint à ajouter dans chacune des classes du modèle.
Drawing.prototype.paint = function(ctx, canvas) {
  ctx.fillStyle = '#F0F0F0'; // set canvas' background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);  // now fill the canvas

  this.shapes.forEach((shape) => shape.paint(ctx))
}

Shape.prototype.paint = function(ctx) {
  ctx.lineWidth = this.lineWidth
  ctx.strokeStyle = this.color
}

Rectangle.prototype.paint = function(ctx) {
  Object.getPrototypeOf(this.__proto__).paint.call(this, ctx)

  ctx.beginPath()
  ctx.rect(
    this.topLeftCornerCoordinates.x,
    this.topLeftCornerCoordinates.y,
    this.width,
    this.height
  )
  ctx.stroke()
}

Line.prototype.paint = function(ctx) {
  Object.getPrototypeOf(this.__proto__).paint.call(this, ctx)

  ctx.beginPath()
  ctx.moveTo(this.firstPointCoordinates.x, this.firstPointCoordinates.y)
  ctx.lineTo(this.secondPointCoordinates.x, this.secondPointCoordinates.y)
  ctx.stroke()
}
