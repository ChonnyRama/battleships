import { Ship } from './ship'

export const Gameboard = () => {
  //gameboard should be 10x10
  const board = []
  const createBoard = () => {
    while (board.length !== 0) {
      board.splice(0, 1)
    }
    for (let i = 0; i < 10; i++) {
      board.push([])
      for (let j = 0; j < 10; j++) {
        board[i].push([i, j])
      }
    }
  }

  const occupiedSpaces = []
  const ships = []
  const placeShip = (coord1, coord2) => {
    if (
      !occupiedSpaces.some(
        (space) => space[0] === coord1[0] && space[1] === coord1[1],
      ) &&
      !occupiedSpaces.some(
        (space) => space[0] === coord2[0] && space[1] === coord2[1],
      ) &&
      Math.max(coord1[0], coord1[0]) < 10 &&
      Math.max(coord2[0], coord2[0]) < 10 &&
      Math.max(coord1[0], coord1[0]) >= 0 &&
      Math.max(coord2[0], coord2[0]) >= 0 &&
      (coord1[0] === coord2[0] || coord1[1] === coord2[1])
    ) {
      const newShip = Ship(coord1, coord2)
      updateOccupied(coord1, coord2, newShip)
      ships.push(newShip)
    } else {
      throw new Error('invalid ship palcement')
    }
  }

  const updateOccupied = (coord1, coord2, ship) => {
    const [x1, y1] = coord1
    const [x2, y2] = coord2

    if (x1 === x2) {
      const maxY = Math.max(y1, y2)
      const minY = Math.min(y1, y2)

      for (let i = minY; i <= maxY; i++) {
        occupiedSpaces.push([x1, i])
        ship.updateShipSpaces([x1, i])
      }
    } else {
      const maxX = Math.max(x1, x2)
      const minX = Math.min(x1, x2)

      for (let i = minX; i <= maxX; i++) {
        occupiedSpaces.push([i, y1])
        ship.updateShipSpaces([i, y1])
      }
    }
  }

  const getOccupied = () => [...occupiedSpaces]

  return { placeShip, getOccupied }
}
