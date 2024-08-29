import { Gameboard } from './gameboard'

export const Player = (gridElement) => {
  const playerBoard = Gameboard()
  return { playerBoard, gridElement }
}
