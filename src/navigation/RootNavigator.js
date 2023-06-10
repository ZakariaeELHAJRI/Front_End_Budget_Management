import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './../../config/firebase';
import AsyncStorage from '@react-native-community/async-storage';
import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/Login';
import Signup from '../screens/SignUp';
import Nav from './../navigation/AppNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const AuthenticatedUserContext = createContext({});

const Drawer = createDrawerNavigator();

const AuthenticatedUserProvider = ({ children }) => {

  const [user, setUser] = useState(null);

return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};



function BudgetStack() {
  return (
    <Drawer.Navigator defaultScreenOptions={HomeScreen}
        screenOptions={{
            headerShown: false,
            }}
    >
      <Stack.Screen name='BudgetApp' component={Nav} />
    </Drawer.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  );
}

function RootNavigator() {
  const wewe=AsyncStorage.getItem('token').then(()=>console.log('token saved'))
  const { user, setUser } = useState( wewe? wewe : null);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  user ? setIsLoading(false) : null
  }, [user]);
// if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size='large' />
//       </View>
//     );
//   }

return (
    <NavigationContainer>
      {user ? <BudgetStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function Root() {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}