import { Ship } from './ship'

export const Gameboard = () => {
  const occupiedSpaces = []
  const ships = []
  const placeShip = (coord1, coord2) => {
    if (
      occupiedSpaces.some(
        (space) => space[0] === coord1[0] && space[1] === coord1[1],
      ) ||
      occupiedSpaces.some(
        (space) => space[0] === coord2[0] && space[1] === coord2[1],
      )
    ) {
      throw new Error('space is already occupied')
    }

    if (
      Math.abs(coord1[0] - coord2[0]) > 4 ||
      Math.abs(coord2[1] - coord1[1]) > 4
    ) {
      throw new Error('ship too large')
    }
    if (
      Math.max(coord1[0], coord1[1]) >= 10 ||
      Math.max(coord2[0], coord2[1]) >= 10 ||
      Math.min(coord1[0], coord1[1]) < 0 ||
      Math.min(coord2[0], coord2[1]) < 0
    ) {
      throw new Error('out of bounds of grid')
    }

    if (coord1[0] !== coord2[0] && coord1[1] !== coord2[1]) {
      throw new Error('ship must be vertical or horizontal')
    }

    const newShip = Ship(coord1, coord2)
    updateOccupied(coord1, coord2, newShip)
    ships.push(newShip)
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
      !getShotsFired().some((space) => {
        return space[0] === coord[0] && space[1] === coord[1]
      })
    ) {
      for (const ship of ships) {
        if (
          ship
            .getShipSpaces()
            .some((space) => space[0] === coord[0] && space[1] === coord[1])
        ) {
          ship.hit()
          shotsFired[0].hit.push(coord)
          return true
        }
      }
      shotsFired[1].missed.push(coord)
      return false
    }
    throw new Error('shot has already been fired')
  }

  const allSunk = () => {
    return getShips().every((ship) => ship.isSunk())
  }

  const getShotsHit = () => [...shotsFired[0].hit]

  const getShotsMissed = () => [...shotsFired[1].missed]

  const getShotsFired = () => shotsFired[0].hit.concat(shotsFired[1].missed)

  return {
    placeShip,
    receiveAttack,
    allSunk,
    getOccupied,
    getShips,
    getShotsFired,
    getShotsHit,
    getShotsMissed,
  }
}
