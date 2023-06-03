import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, View , ActivityIndicator } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
    backgroundColor: '#000',
  },
  drawerContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
