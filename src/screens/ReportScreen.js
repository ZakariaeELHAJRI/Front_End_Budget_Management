import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const goToAnotherScreen = (navigation) => {
  navigation.navigate('ChatGroup'); // Replace 'AnotherScreen' with the actual screen name you want to navigate to
};

const ReportScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Report Screen</Text>
      <TouchableOpacity onPress={() => goToAnotherScreen(navigation)} style={styles.button}>
        <Text style={styles.buttonText}>Go to Another Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
