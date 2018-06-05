import { AsyncStorage } from 'react-native'
import { STORAGE_KEY } from '../constants'

export const generateId = () => Math.random().toString(36).substr(2, 9)

export const formatDate = (isoDate) => {
  const date = new Date(isoDate)

  return date.toDateString().substring(4)
}

export const getHistory = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export const saveToHistory = async (newHistory) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory))
}

export const clearHistory = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY)
}
