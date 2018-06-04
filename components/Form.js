import React, { Component } from 'react'
import { TextInput, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { white, teal, gray } from '../utils/colors'

const styles = StyleSheet.create({
  formContainer: {
    marginLeft: 50,
    marginRight: 50
  },
  inputContainer: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: gray,
    marginTop: 15,
    marginBottom: 15
  },
  input: {
    paddingLeft: 5,
    height: 40
  },
  submitBtn: {
    backgroundColor: teal,
    padding: 10,
    borderRadius: 4,
    height: 40
  },
  submitBtnText: {
    color: white,
    textAlign: 'center'
  }
})

class Form extends Component {
  state = {
    text: ''
  }

  onChangeText = text => this.setState({ text })

  handleSubmit = () => {
    const { onSubmit } = this.props
    const { text } = this.state

    if (!text) return

    onSubmit(text)
    this.setState({ text: '' })
  }

  render () {
    const { placeholder } = this.props
    const { text } = this.state

    return (
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={text}
            placeholder={placeholder}
            onChangeText={this.onChangeText}
          />
        </View>
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={this.handleSubmit}
          disabled={!this.state.text}
        >
          <Text style={styles.submitBtnText}>Search</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
}

export default Form
