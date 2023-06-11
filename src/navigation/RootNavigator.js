import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './../../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import HomeScreen from '../screens/HomeScreen';
import Login from '../screens/Login';
import Signup from '../screens/SignUp';
import Nav from './../navigation/AppNavigator';
const Stack = createStackNavigator();
export const AuthenticatedUserContext = createContext({});
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

return (
    <AuthenticatedUserContext.Provider value={{ user, setUser, 
    login : async (email, password) => {
     await axios.post('http://10.0.2.2:3000/auth/signin', {
      email: email,
      password: password,
    })
    .then(function (res) {
      // window.localStorage.setItem('user' , res.data.user._id)
      // window.localStorage.setItem('token' , res.data.token)
      setUser(res.data.user._id)
      AsyncStorage.setItem('user', res.data.user._id).then(()=>console.log('user saved'))
      AsyncStorage.setItem('token', res.data.token).then(()=>console.log('token saved'))
    })
    .catch(function (error) {
      console.log(error);
    });
    },
    logout : async () => {
      AsyncStorage.removeItem('user').then(()=>console.log('user removed'))
      AsyncStorage.removeItem('token').then(()=>console.log('token removed'))
      setUser(null)
    } 
  }}
    >
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
      <Stack.Screen name='Login' component={Login} />
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
  const { user, setUser } = useContext(AuthenticatedUserContext);
  console.log('user', user);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          setUser(value);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error retrieving user from AsyncStorage:', error);
      }
    };
  
    getUserFromStorage();
  }, []);


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