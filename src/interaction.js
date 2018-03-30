'use strict'
// La création d'un Dnd requière un canvas et un interacteur.
// L'interacteur viendra dans un second temps donc ne vous en souciez pas au départ.
class DnD {
  constructor(canvas, interactor) {
      this.canvas = canvas
      this.interactor = interactor

      // Définir ici les attributs de la classe
      this.startingPosition = { x: 0, y: 0 }
      this.endingPosition = { x: 0, y: 0 }
      this.userStartedDrawing = false

      // Associer les évènements du canvas aux fonctions ci-dessous.
      canvas.addEventListener('mousedown', (evt) => this.storeStartingPosition(evt), false)
      canvas.addEventListener('mousemove', (evt) => this.onMovingMouse(evt), false)
      canvas.addEventListener('mouseup', (evt) => this.storeEndingPosition(evt), false);
  }

	// Developper les 3 fonctions gérant les événements
  storeStartingPosition(evt) {
    this.userStartedDrawing = true
    this.startingPosition = this.getMousePosition(evt)
    this.endingPosition = this.startingPosition
    // console.log(this.startingPosition)
    this.interactor.onInteractionStart(this)
  }

  onMovingMouse(evt) {
    if (this.userStartedDrawing) {
      this.endingPosition = this.getMousePosition(evt)
      // console.log(this.currentPosition)
      this.interactor.onInteractionUpdate(this)
    }
  }

  storeEndingPosition(evt) {
    if (this.userStartedDrawing) {
      this.userStartedDrawing = false
      // console.log(this.endingPosition)
      this.interactor.onInteractionEnd(this)
    }
  }

  // Place le point de l'événement evt relativement à la position du canvas.
  getMousePosition(evt) {
    const rect = this.canvas.getBoundingClientRect()
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    }
  }

}
