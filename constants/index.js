export const GOOGLE_BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json'
export const GOOGLE_API_KEY = 'AIzaSyCs8iHIiSD7O0f15VNk5mmerXBLO-0BKsY'

export const BOM_BASE_URL = 'https://api.breezometer.com/baqi/'
export const BOM_API_KEY = 'e9f6aa80c7104ee3b5f0bff2bd749fbb'
export const BOM_OPTIONS = '&fields=breezometer_aqi,datetime,breezometer_color,breezometer_description,data_valid'

export const APP_STATUSES = {
  DEFAULT: 'Search air quality by location',
  ERROR_GENERIC: 'Something went wrong',
  ERROR_LOCATION: 'Invalid location',
  SUCCESS_SEARCH: 'Search successful'
}

export const DATA_STATUSES = {
  OK: 'OK',
  ZERO_RESULTS: 'ZERO_RESULTS',
  REQUEST_DENIED: 'REQUEST_DENIED'
}

export const STORAGE_KEY = 'AirTony:history'
