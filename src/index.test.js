import { Ship } from './ship'
import { Gameboard } from './gameboard'

// jest.mock('./ship')

// beforeEach(() => {
//   Ship.mockClear()
// })

// it('Check if the consumer called the constructor', () => {
//   const testShip = Ship()
//   expect(Ship).toHaveBeenCalledTimes(1)
//   testShip.hit()
//   expect(testShip.getHits()).tobe(1)
// })

describe('Ship factory function', () => {
  it('should correctly increment hits when hit is called', () => {
    const testShip = Ship([0, 0], [0, 1])
    expect(testShip.isSunk()).toBe(false)
    expect(testShip.getHits()).toBe(0)
    testShip.hit()
    expect(testShip.getHits()).toBe(1)
    testShip.hit()
    expect(testShip.isSunk()).toBe(true)
  })
})

describe('gameboard factory tests', () => {
  it('Should be able to create a ship', () => {
    const gameboard = Gameboard()
  })
  it('throws an error when coords are out of bounds', () => {
    const gameboard = Gameboard()
    expect(() => {
      gameboard.placeShip([-1, 0], [0, 0])
    }).toThrow()
  })
  it('throws an error when coords are already occupied', () => {
    const gameboard = Gameboard()
    gameboard.placeShip([0, 0], [0, 2])
    expect(() => {
      gameboard.placeShip([0, 1], [1, 1])
    }).toThrow()
  })
})
