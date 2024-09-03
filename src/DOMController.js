import { Player } from './player'

export const DomController = () => {
  const playerBoards = document.querySelectorAll('.player-grid')
  const playButton = document.querySelector('.game-start')

  const populateBoards = () => {
    playerBoards.forEach((board) => {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cell = document.createElement('div')
          cell.dataset.x = i
          cell.dataset.y = j
          cell.classList.add('cell')
          if (board.hasAttribute('data-player1-grid')) {
            cell.classList.add('player1-cell')
          } else {
            cell.classList.add('player2-cell')
          }
          cell.style.cursor = 'pointer'
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

      try {
        player1.getBoard().placeShip([xFrom, yFrom], [xTo, yTo])
      } catch (error) {
        return error
      }

      renderBoard()
      player2.computerPlacement()

      // currentPlayer = player2

      // renderBoard()
      // currentPlayer = player1
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

  playButton.addEventListener('click', () => {
    const toHide = document.querySelectorAll('.player1, .player2')
    for (const element of toHide) {
      element.classList.add('hidden')
    }
    const playerGrids = document.querySelectorAll(
      '[data-player1-grid],[data-player2-grid]',
    )
    playerGrids.forEach((grid) => {
      grid.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell')) {
          if (e.target.classList.contains('.player2-cell')) {
            const attackX = Number(e.target.dataset.x)
            const attackY = Number(e.target.dataset.Y)
            player1.attack([attackX, attackY], player2.getBoard())
          }
        }
      })
    })
  })

  return {}
}
