import * as React from 'react';
import { View, KeyboardAvoidingView, Platform, StyleSheet, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import GroupStack from './GroupStack';
import ReportScreen from '../screens/ReportScreen';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function Nav() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.tabContent}>
          <Tab.Navigator
            screenOptions={{
              tabBarShowLabel: false,
              tabBarStyle: styles.tabBar,
            }}
          >
            <Tab.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                header: () => null,
                tabBarIcon: ({ focused }) => (
                  <View style={styles.tabIcon}>
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
                tabBarStyle: styles.hiddenTabBar,
                header: () => null,
                tabBarIcon: ({ focused }) => (
                  <View style={styles.tabIcon}>
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
                  <View style={styles.tabIcon}>
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
                  <View style={styles.tabIcon}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
  },
  tabBar: {
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
  hiddenTabBar: {
    display: 'none',
  },
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
