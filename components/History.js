import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { formatDate } from '../utils/helpers'
import { dangerRed, white } from '../utils/colors'

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  header: {
    marginBottom: 10,
    paddingLeft: 5,
    fontWeight: 'bold'
  },
  headerCell: {
    fontWeight: 'bold'
  },
  row: {
    flexDirection: 'row'
  },
  cell: {
    flex: 1,
    padding: 5
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 50
  },
  aqi: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resetBtn: {
    backgroundColor: dangerRed,
    padding: 10,
    borderRadius: 4,
    height: 40,
    marginTop: 30,
    marginLeft: 40,
    marginRight: 40
  },
  resetBtnText: {
    color: white,
    textAlign: 'center'
  }
})

const renderHeader = () => (
  <View style={styles.row}>
    <View style={styles.cell}>
      <Text style={styles.headerCell}>Date</Text>
    </View>
    <View style={styles.cell}>
      <Text style={styles.headerCell}>Location</Text>
    </View>
    <View style={styles.cell}>
      <Text style={styles.headerCell}>Air Quality Index</Text>
    </View>
    <View style={styles.cell}>
      <Text style={styles.headerCell}>Description</Text>
    </View>
  </View>
)

const renderRow = (item) => {
  const { id, location, aqi, color, description } = item
  const date = formatDate(item.date)

  return (
    <View key={id} style={styles.row}>
      <View style={styles.cell}>
        <Text>{date}</Text>
      </View>
      <View style={styles.cell}>
        <Text>{location}</Text>
      </View>
      <View style={styles.cell}>
        <View style={[styles.circle, { backgroundColor: color }]}>
          <View style={styles.aqi}>
            <Text>{aqi}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cell}>
        <Text>{description}</Text>
      </View>
    </View>
  )
}

const History = ({ data, handleReset }) => (
  <View style={styles.container}>
    <Text style={styles.header}>Recent Searches</Text>
    { renderHeader() }
    <View>
      { data.map(item => renderRow(item)) }
    </View>
    <TouchableOpacity
      style={styles.resetBtn}
      onPress={handleReset}
    >
      <Text style={styles.resetBtnText}>Reset</Text>
    </TouchableOpacity>
  </View>
)

History.propTypes = {
  data: PropTypes.array.isRequired,
  handleReset: PropTypes.func.isRequired
}

export default History
