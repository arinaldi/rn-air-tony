import React from 'react'
import { View, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import { Constants } from 'expo'
import { white } from '../utils/colors'

const AppStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

AppStatusBar.propTypes = {
  backgroundColor: PropTypes.string
}

AppStatusBar.defaultProps = {
  backgroundColor: white
}

export default AppStatusBar
