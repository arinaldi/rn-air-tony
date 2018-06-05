import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppStatusBar from './components/AppStatusBar'
import Form from './components/Form'
import History from './components/History'
import { white, green, red, black } from './utils/colors'
import { getHistory, saveToHistory, clearHistory } from './utils/helpers'
import { geocodeGoogle, breezoMeter } from './api'
import { APP_STATUSES, DATA_STATUSES } from './constants'

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
    status: APP_STATUSES.DEFAULT,
    color: black,
    searches: []
  }

  componentDidMount () {
    getHistory()
      .then(searches => {
        this.setState({ searches })
      })
  }

  fetchData (location) {
    const { searches } = this.state

    geocodeGoogle(location)
      .then(data => {
        switch (data.status) {
          case DATA_STATUSES.OK:
            return data
          case DATA_STATUSES.ZERO_RESULTS:
            return Promise.reject({ message: APP_STATUSES.ERROR_LOCATION })
          case DATA_STATUSES.REQUEST_DENIED:
            return Promise.reject({ message: data.error_message })
          default:
            return Promise.reject({ message: APP_STATUSES.ERROR_GENERIC })
        }
      })
      .then(data => breezoMeter(data))
      .then((data) => {
        if (!data.data_valid) {
          this.setState({ status: data.error.message, color: red })
        } else {
          const newData = [data, ...searches.slice(0, 4)]
          this.setState({
            status: APP_STATUSES.SUCCESS_SEARCH,
            color: green,
            searches: newData
          })
          saveToHistory(newData)
        }
      })
      .catch((err) => {
        const error = err.message ? err.message : APP_STATUSES.ERROR_GENERIC
        this.setState({ status: error, color: red })
      })
  }

  handleSearch = (location) => {
    this.setState(
      { status: `Searching for ${location}...`, color: black },
      this.fetchData(location)
    )
  }

  handleReset = () => {
    clearHistory()
    this.setState({
      status: APP_STATUSES.DEFAULT,
      color: black,
      searches: []
    })
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
          { searches.length > 0 && <History data={searches} handleReset={this.handleReset} /> }
        </View>
      </View>
    )
  }
}
