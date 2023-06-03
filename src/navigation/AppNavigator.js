import * as React from 'react';
import { View ,KeyboardAvoidingView, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import GroupStack from './GroupStack';
import ReportScreen from '../screens/ReportScreen';
import { FontAwesome5,AntDesign } from '@expo/vector-icons';
import Profile from '../screens/Profile';


const Tab = createBottomTabNavigator();

export default function Nav() {
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
  >
     <View style={{ flex: 1 }}>
     <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute',
              bottom: 15,
              marginHorizontal: 20,
              height: 60,
              borderRadius: 10,
              shadowColor: '#000',
              shadowOpacity: 0.9,
              shadowOffset: {
                width: 10,
                height: 10,
              },
            },
          }}
        >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          
          header: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome5
                name="home"
                size={24}
                color={focused ? '#FF6238' : '#748c94'}
              />
            </View>
          ),
        }}
      />
     
      <Tab.Screen
        name="GroupStack"
        component={GroupStack}
        options={({ route }) => ({
          
          header: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome5
                name="comments"
                size={24}
                color={focused ? '#FF6238' : '#748c94'}
              />
            </View>
          ),
        })}
      /> 
      <Tab.Screen
        name="repport"
        component={ReportScreen}
        options={{
         
          header: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <AntDesign name="piechart" size={24} color={focused ? '#FF6238' : '#748c94'} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
        
          header: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome5
                name="user-alt"
                size={24}
                color={focused ? '#FF6238' : '#748c94'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
    </View>
     </KeyboardAvoidingView>
  );
}
