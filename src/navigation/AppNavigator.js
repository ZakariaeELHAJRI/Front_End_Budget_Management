import * as React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import GroupScreen from '../screens/GroupScreen';
import ReportScreen from '../screens/ReportScreen';
import { FontAwesome5 } from '@expo/vector-icons';
import chatGroup from '../screens/ChatGroup';


const Tab = createBottomTabNavigator();

export default function Nav() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
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
                color={focused ? '#001b48' : '#748c94'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ChatGroup"
        component={chatGroup}
        options={{
          header: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome5
                name="comments"
                size={24}
                color={focused ? '#001b48' : '#748c94'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="GroupScreen"
        component={GroupScreen}
        options={{
          header: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome5
                name="comments"
                size={24}
                color={focused ? '#001b48' : '#748c94'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ReportScreen"
        component={ReportScreen}
        options={{
          header: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <FontAwesome5
                name="user-alt"
                size={24}
                color={focused ? '#001b48' : '#748c94'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
