import { Gameboard } from './gameboard'

export const Player = (name, isComputer = false) => {
  const playerName = name
  const computer = isComputer
  const board = Gameboard()

  const getBoard = () => board
  const getPlayerName = () => playerName
  const isComputerPlayer = () => computer

  const attack = (coord, enemyBoard) => {
    if (!computer) {
      return enemyBoard.recieveAttack(coord)
    } else {
      let randomCoord
      do {
        randomCoord = [
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
        ]
      } while (
        enemyBoard.getShotsfired().some((space) => {
          return space[0] === randomCoord[0] && space[1] === randomCoord[1]
        })
      )
      return enemyBoard.recieveAttack(randomCoord)
    }
  }
  return { getPlayerName, getBoard, isComputerPlayer, attack }
}
