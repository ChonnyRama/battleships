export const Ship = (coord1, coord2) => {
  //objects that include their length, the number of times they've been hit and whether or not they've been sunk
  let shipLength =
    Math.max(Math.abs(coord1[0] - coord2[0]), Math.abs(coord1[1] - coord2[1])) +
    1
  let hits = 0
  let sunk = false

  shipLength

  const hit = () => {
    hits += 1
  }

  const getHits = () => {
    return hits
  }

  const isSunk = () => {
    if (hits >= shipLength) {
      sunk = true
      return sunk
    }
    return sunk
  }

  const shipSpaces = []

  const updateShipSpaces = (coord) => {
    shipSpaces.push(coord)
  }

  const getShipSpaces = () => [...shipSpaces]

  return {
    hit,
    getHits,
    isSunk,
    updateShipSpaces,
    getShipSpaces,
  }
}

const newShip = Ship([0, 0], [0, 2])
newShip
