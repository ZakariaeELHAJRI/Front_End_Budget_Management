import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, View , ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native'; 
import GroupScreen from './src/screens/GroupScreen';
import ReportScreen from './src/screens/ReportScreen';
import ChatGroup from './src/screens/ChatGroup';
import Nav from './src/navigation/AppNavigator';
import { FontAwesome5 } from '@expo/vector-icons';
import Login from './src/screens/Login';
import Signup from './src/screens/SignUp';
import HomeScreen from './src/screens/HomeScreen';
import { onAuthStateChanged } from 'firebase/auth';
import Root from './src/navigation/RootNavigator';

const Drawer = createDrawerNavigator();




const App = () => {
  return (
    <View style={styles.container}>
    <Root/>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
