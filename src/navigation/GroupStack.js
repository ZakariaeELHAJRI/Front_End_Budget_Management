import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GroupScreen from '../screens/GroupScreen';
import DetailsGroup from '../screens/DetailsGroup';
import ChatGroup from '../screens/ChatGroup';

const Stack = createStackNavigator();

const GroupStack = () => {
  
    
  return (
    <Stack.Navigator screenOptions={() => ({
      headerShown: false,
    })}
    >
      <Stack.Screen name="Group" component={GroupScreen}/>
      <Stack.Screen name="ChatGroup" component={ChatGroup} />
      
      <Stack.Screen name="DetailsGroup" component={DetailsGroup} />
    </Stack.Navigator>
  );
};

export default GroupStack;
