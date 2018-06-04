import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import { formatDate } from '../utils/helpers'

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

const History = ({ data }) => (
  <View style={styles.container}>
    <Text style={styles.header}>Recent Searches</Text>
    { renderHeader() }
    <View>
      { data.map(item => renderRow(item)) }
    </View>
  </View>
)

History.propTypes = {
  data: PropTypes.array
}

export default History
