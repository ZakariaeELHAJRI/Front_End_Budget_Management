import * as React from 'react';
import { View, KeyboardAvoidingView, Platform, StyleSheet, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import GroupStack from './GroupStack';
import ReportScreen from '../screens/ReportScreen';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import Profile from '../screens/Profile';
import {style1 , style2} from './styles'; // Import the styles

const Tab = createBottomTabNavigator();

export default function Nav() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <SafeAreaView style={style1.container}>
        <View style={style1.tabContent}>
          <Tab.Navigator
            screenOptions={{
              tabBarShowLabel: false,
              tabBarStyle: style1.tabBar,
            }}
          >
            <Tab.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                header: () => null,
                tabBarIcon: ({ focused }) => (
                  <View style={style1.tabIcon}>
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
                tabBarStyle: style1.hiddenTabBar,
                header: () => null,
                tabBarIcon: ({ focused }) => (
                  <View style={style1.tabIcon}>
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
                  <View style={style1.tabIcon}>
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
                  <View style={style1.tabIcon}>
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

