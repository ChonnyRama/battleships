import { Ship } from './ship'

export const Gameboard = () => {
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

  const getShips = () => [...ships]

  const getOccupied = () => [...occupiedSpaces]

  const shotsFired = [
    {
      hit: [],
    },
    {
      missed: [],
    },
  ]

  const receiveAttack = (coord) => {
    if (
      !shotsFired[1].missed.some(
        (space) => space[0] === coord[0] && space[1] === coord[1],
      )
    ) {
      for (const ship of ships) {
        if (
          ship
            .getShipSpaces()
            .some((space) => space[0] === coord[0] && space[1] === coord[1])
        ) {
          ship.hit()
          shotsFired[0].hit.push(coord)
        }
      }
      return shotsFired[1].missed.push(coord)
    }
    throw new Error('shot has already been fired')
  }

  const allSunk = () => {
    return ships.every((ship) => ship.isSunk())
  }

  return { placeShip, receiveAttack, allSunk, getOccupied, getShips }
}
