import { getStorage } from "./storage"

export const getGameVersion = () => {
  const gameVersion = getStorage('selected-game-version') || 'dst'
  return gameVersion
}