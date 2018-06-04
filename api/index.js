import {
  GOOGLE_BASE_URL,
  GOOGLE_API_KEY,
  BOM_BASE_URL,
  BOM_API_KEY,
  BOM_OPTIONS
} from '../constants'
import { generateId } from '../utils/helpers'

export const geocodeGoogle = (location) => {
  const url = `${GOOGLE_BASE_URL}?address=${location}&key=${GOOGLE_API_KEY}`

  return fetch(url)
    .then(res => res.json())
    .then((json) => {
      const { results, status } = json
      if (results.length > 0) {
        const name = results[0].formatted_address
        const lat = results[0].geometry.location.lat
        const lng = results[0].geometry.location.lng

        return {
          status,
          name,
          lat,
          lng
        }
      }
      return json
    })
    .catch(error => Promise.reject(
      {
        error,
        message: `Google error: ${error.message}`
      }
    ))
}

export const breezoMeter = (data) => {
  const url = `${BOM_BASE_URL}?lat=${data.lat}&lon=${data.lng}&key=${BOM_API_KEY}${BOM_OPTIONS}`

  return fetch(url)
    .then((res) => {
      if (res.ok) return res.json()
      throw new Error('Bad network response')
    })
    .then((json) => {
      if (json.data_valid) {
        return {
          id: generateId(),
          data_valid: json.data_valid,
          date: json.datetime,
          location: data.name,
          aqi: json.breezometer_aqi,
          description: json.breezometer_description,
          color: json.breezometer_color
        }
      }
      return json
    })
    .catch(error => Promise.reject(
      {
        error,
        message: `BreezoMeter error: ${error.message}`
      },
    ))
}
