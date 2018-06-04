import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppStatusBar from './components/AppStatusBar'
import Form from './components/Form'
import History from './components/History'
import { white } from './utils/colors'

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
    status: 'Search air quality by location'
  }

  handleSearch = (text) => {
    console.log(text)
  }

  render () {
    const { status } = this.state

    return (
      <View style={styles.container}>
        <AppStatusBar backgroundColor={white} barStyle='dark-content' />
        <Text style={styles.title}>Air Tony</Text>
        <Text style={styles.status}>{status}</Text>
        <View style={styles.form}>
          <Form onSubmit={this.handleSearch} placeholder='Location name' />
        </View>
        <View style={styles.history}>
          <History />
        </View>
      </View>
    )
  }
}
