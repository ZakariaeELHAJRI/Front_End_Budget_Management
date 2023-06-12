import { StyleSheet ,FlatList, Text, View, TouchableOpacity} from 'react-native';
import React ,{useEffect ,useContext} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Card from '../components/groupeCard.js';
import AddGroup from '../components/popupAddgroup.js';
import { useState } from 'react';
import axios from 'axios';
import { AuthenticatedUserContext } from "../navigation/RootNavigator";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { async } from '@firebase/util';



const GroupScreen = ({ navigation }) => {
 const { user } = useContext(AuthenticatedUserContext);



    
  const [data, setData] = useState([]);
 // const [token, setToken] = useState(null);
 // const [userId, setUserId] = useState(null);
  const [isViewVisible, setViewVisibility] = useState(false);
  const [users, setUsers] = useState([]);
  const token = user.token;
  const userId = user.id;
  console.log('token session', token);
   console.log(' user', user);
   console.log('userId session', userId);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
  useEffect(() => {
   /* const fetchTokenID = async () => {
     const tok = await  AsyncStorage.getItem('token');
     const user =  await AsyncStorage.getItem('user');
     setToken(tok);
     setUserId(user);
     
    };
    fetchTokenID();*/
 
    fetchData();
    fetchUsers();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/service/group/${userId}`, { headers });
      console.log('group by user', response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchUsers = async () => {
     try {
      const response = await axios.get(`http://10.0.2.2:3000/auth/getAllUsers`, { headers });
     console.log('all users **********************', response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  const handlePress = () => {     
          setViewVisibility(!isViewVisible);
          console.log('users passed ======', users);
  };

  const goToChatGroup = () => {
    navigation.navigate('ChatGroup');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Groups</Text>
        <View>
          <TouchableOpacity style={styles.buttonAddgroup} onPress={handlePress}>
            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Add Group</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({ item: group }) => (
          <TouchableOpacity onPress={goToChatGroup}>
            <Card
              title={group.name}
              date={group.createdAt}
              members={group.members}
              balance={group.balance}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item._id}
      />

      {isViewVisible && <AddGroup handlePress={handlePress} allusers={users}  />}
    </View>
  );
};

export default GroupScreen;
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
  
