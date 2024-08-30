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

  const player1 = Player('Player 1', false)
  const player2 = Player('Computer', true)
  let currentPlayer = player1

  const coordSubmit = document.querySelector('.coord-submit')

  coordSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.classList.contains('player1')) {
      const yFrom = Number(document.querySelector('#player1-x1').value)
      const xFrom = Number(document.querySelector('#player1-y1').value)
      const yTo = Number(document.querySelector('#player1-x2').value)
      const xTo = Number(document.querySelector('#player1-y2').value)

      console.log(player1.getBoard().getOccupied())
      player1.getBoard().placeShip([xFrom, yFrom], [xTo, yTo])
      renderBoard()
    }
  })

  const renderBoard = () => {
    let playerBoard
    if (currentPlayer === player1) {
      playerBoard = document.querySelector('[data-player1-grid]')
    } else {
      playerBoard = document.querySelector('[data-player2-grid]')
    }
    const cells = Array.from(playerBoard.children)
    for (const cell of cells) {
      const cellX = Number(cell.dataset.x)
      const cellY = Number(cell.dataset.y)
      if (
        currentPlayer
          .getBoard()
          .getOccupied()
          .some((space) => {
            return space[0] === cellX && space[1] === cellY
          })
      ) {
        cell.style.backgroundColor = 'blue'
      }
    }
  }

  return {}
}
