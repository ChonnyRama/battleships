import { Player } from './player'

export const DomController = () => {
  const playerBoards = document.querySelectorAll('.player-grid')
  const populateBoards = () => {
    playerBoards.forEach((board) => {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cell = document.createElement('div')
          cell.dataset.x = i
          cell.dataset.y = j
          cell.classList.add('cell')
          board.appendChild(cell)
        }
      }
    })
  }

  populateBoards()
  return {}
}
