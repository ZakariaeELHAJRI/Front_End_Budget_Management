import { StyleSheet ,FlatList, Text, View, TouchableOpacity} from 'react-native';
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Card from '../components/groupeCard.js';
import AddGroup from '../components/popupAddgroup.js';
import { useState } from 'react';
const GroupScreen = ({navigation}) => {
    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f3',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-1455719d72',
          title: 'Third Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-5571e29d72',
          title: 'Third Item',
        }
      ];
      
      const [isViewVisible, setViewVisibility] = useState(false);
      const handlePress = () => {
        setViewVisibility(!isViewVisible);
      };
  return (
    <View  style={{ flex: 1 }}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Groups</Text>
            <View>
            <TouchableOpacity
              style={styles.buttonAddgroup}
              onPress={handlePress}
          >
              <Text style={{fontWeight:'bold',fontSize:15}}>Add Group</Text>
          </TouchableOpacity></View>
          </View>
          <FlatList
            data={DATA}
            renderItem={({group}) => <Card group={group} />}
            keyExtractor={item => item.id}
        />
          
            
        {isViewVisible && (
            <AddGroup handlePress={handlePress} />
          )}
        </View>
  )
}
const styles = StyleSheet.create({
    container: {
     // flex: 1,
      // marginTop: StatusBar.currentHeight || 0,
    },
    headerContainer:{
      display:'flex',
      paddingVertical:10,
      paddingHorizontal:20,
      
      flexDirection:'row', 
      alignItems:'center',
      
      justifyContent:'space-between',
     
    },
    header:{
      color:'#212A37',
     
      fontSize:30,
      fontWeight:'bold',
    },
  
    item: {
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 10,
    },
    title: {
      fontSize: 32,
    },
    
    buttonAddgroup:{
      borderWidth: 1,
      borderColor: '#FF6238',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      paddingHorizontal:10,
      paddingVertical:5,
      backgroundColor: '#FF6238',
      borderRadius: 20,
    },
  
    addgroupicone:{
      color:'#212A37',
      fontSize:40,
      fontWeight:'bold',
      // margin:10,
    },
  
    overlayVisible:{
      opacity:1,
    }
  });
  
  

export default GroupScreen