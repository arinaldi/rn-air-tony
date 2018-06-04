import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppStatusBar from './components/AppStatusBar'
import Form from './components/Form'
import History from './components/History'
import { white, green, red, black } from './utils/colors'
import { geocodeGoogle, breezoMeter } from './api'
import { ERROR_GENERIC, ERROR_LOCATION, SUCCESS_SEARCH } from './constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title: {
    marginTop: 20,
    fontSize: 30
  },
  status: {
    marginTop: 10,
    fontSize: 15
  },
  form: {
    alignSelf: 'stretch'
  },
  history: {
    alignSelf: 'stretch'
  }
})

export default class App extends React.Component {
  state = {
    status: 'Search air quality by location',
    color: black,
    searches: []
  }

  fetchData (location) {
    const { searches } = this.state

    geocodeGoogle(location)
      .then(data => {
        switch (data.status) {
          case 'OK':
            return data
          case 'ZERO_RESULTS':
            return Promise.reject({ message: ERROR_LOCATION })
          case 'REQUEST_DENIED':
            return Promise.reject({ message: data.error_message })
          default:
            return Promise.reject({ message: ERROR_GENERIC })
        }
      })
      .then(data => breezoMeter(data))
      .then((data) => {
        if (!data.data_valid) {
          this.setState({ status: data.error.message, color: red })
        } else {
          const newData = [data, ...searches.slice(0, 4)]
          this.setState({
            status: SUCCESS_SEARCH,
            color: green,
            searches: newData
          })
          // TODO: save data to asyncstorage
        }
      })
      .catch((err) => {
        const error = err.message ? err.message : ERROR_GENERIC
        this.setState({ status: error, color: red })
      })
  }

  handleSearch = (location) => {
    this.setState(
      { status: `Searching for ${location}...`, color: black },
      this.fetchData(location)
    )
  }

  render () {
    const { status, color, searches } = this.state

    return (
      <View style={styles.container}>
        <AppStatusBar backgroundColor={white} barStyle='dark-content' />
        <Text style={styles.title}>Air Tony</Text>
        <Text style={[styles.status, { color }]}>{status}</Text>
        <View style={styles.form}>
          <Form onSubmit={this.handleSearch} placeholder='Location name' />
        </View>
        <View style={styles.history}>
          { searches.length > 0 && <History data={searches} /> }
        </View>
      </View>
    )
  }
}
