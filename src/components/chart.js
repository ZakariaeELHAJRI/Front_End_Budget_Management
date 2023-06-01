import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import PieChart from 'react-native-pie-chart';

const TestChart = () => {
  const widthAndHeight = 250;
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ['#fdaf00', '#537cf2', '#537cf2', '#fd336b', '#00cdc0'];

  return (
   
      <View style={styles.container}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.75}
          coverFill={'#FFF'}
          style={styles.chart}
        />
        <Text style={styles.title}>1 200,58 $</Text>
        <Text style={styles.titleBalance}>Total Spending</Text>
      </View>
   
  );
};

export default TestChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
 chart: {
    position: 'absolute',
    marginTop: 20,
    },
    title: {
    position : 'relative',
    fontSize: 24,
    top: '45%',
    },
    titleBalance: {
    position : 'relative',
    fontSize: 16,
    top: '45%',
    color: 'gray',
    },
});
