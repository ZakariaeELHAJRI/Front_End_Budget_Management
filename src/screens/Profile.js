import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const goToAnotherScreen = (navigation) => {
  navigation.navigate('ChatGroup'); 
};

const Profile = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Profilr Screen</Text>
      <TouchableOpacity onPress={() => goToAnotherScreen(navigation)} style={styles.button}>
        <Text style={styles.buttonText}>Go to chat Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

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
