import React ,{useEffect} from 'react';
import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native';

const goToAnotherScreen = (navigation) => {
  navigation.navigate('ChatGroup'); 
};
const GroupScreen = ({ navigation }) => {
  useEffect(() => {
    const hideTabBar = navigation.addListener("focus", () => {
      console.log("focus");
      navigation.setOptions({
        tabBarStyle: {
         display: "flex",
         backgroundColor: '#000',
         position: 'relative',
        },
      });
    });
    return hideTabBar;
  }, [navigation]);
  return (
    <View style={styles.container}>
    <Text>Group Screen</Text>
    <TouchableOpacity onPress={() => goToAnotherScreen(navigation)} style={styles.button}>
      <Text style={styles.buttonText}>Go to chat Screen</Text>
    </TouchableOpacity>
  </View>
  );
};

export default GroupScreen;

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
