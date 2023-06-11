// styles.js

import { StyleSheet } from 'react-native';

export const style1 = StyleSheet.create({
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

export const style2 = StyleSheet.create({
    container: {
      flex: 1,
    },
    tabContent: {
      flex: 1,
    },
    tabBar: {
        display: 'none',
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
  