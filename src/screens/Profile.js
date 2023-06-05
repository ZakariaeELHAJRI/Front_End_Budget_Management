import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, Keyboard } from 'react-native';
import { AntDesign , MaterialCommunityIcons , Ionicons ,Octicons ,SimpleLineIcons  } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [rewritePassword, setRewritePassword] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [profileImage, setProfileImage] = useState(require('./../../assets/my_pic.jpeg'));
  const [name, setName] = useState('E.Zakariae'); // Replace with the actual user name value
  useEffect(() => {
    requestMediaLibraryPermission();
  }, []);

  // use effect to hide tab navigation when keyboard is open
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: { display: "none" },
    });
 /*   const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      navigation.setOptions({
        tabBarStyle: { display: "none" },
      });
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      navigation.setOptions({
        tabBarStyle: { display: "flex" },
      });
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };*/
  }, [navigation]);

  const requestMediaLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileImage({ uri: result.uri });
    }
  };

  const handlePasswordChange = () => {
    // Logic to change the password
    // You can implement your own password change functionality here
    console.log('Changing password...');
  };

  const handleEditName = () => {
    setIsEditable(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.color1} />
      <View style={styles.color2} />
      {/* title screen : Profile*/}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>PROFILE</Text>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image source={profileImage} style={styles.profileImage} />
            <AntDesign name="camerao" size={24} style={styles.cameraIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.nameContainer}>
          <TextInput
            value={name} // Replace with the actual user name value
            style={styles.nameInput}
            onChangeText={text => setName(text)}
            editable={isEditable}
          />
         
          <TouchableOpacity onPress={handleEditName}>
            <AntDesign name="edit" size={24} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
         <Text style={styles.name2}>@EZakariae</Text>
      </View>

      {/*list of options ( dashboard, Statics, Change password, Logout)
      <MaterialCommunityIcons name="view-dashboard-outline" size={24} color="black" />
      <Ionicons name="stats-chart-outline" size={24} color="black" />
  */} 
      <View style={styles.options}>
        <TouchableOpacity style={styles.optionsBtn} onPress={() => navigation.navigate('HomeScreen')}>
        <View style={styles.circle}>
        <MaterialCommunityIcons name='view-dashboard-outline' size={30} color="#f1f3f5"  />
              </View>
          <Text style={styles.optionText}>Dashboard</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.optionsBtn} onPress={() => navigation.navigate('repport')}>
        <View style={styles.circle}>
                <Ionicons name='stats-chart-outline' size={30} color="#f1f3f5"  />
              </View>
          <Text style={styles.optionText}>Statics</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.optionsBtn}>
        <View style={styles.circle}>
                <Octicons name='key-asterisk' size={30} color="#f1f3f5"  />
              </View>
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionsBtn} onPress={() => navigation.navigate('Login')}>
        <View style={styles.circle}>
                <AntDesign name='logout' size={30} color="#f1f3f5"  />
              </View>
          <Text style={styles.optionText}>Logout</Text>
        </TouchableOpacity>

        </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e3541',
  },
  color1: {
    flex: 3,
    backgroundColor: '#3576f6',
  },
  color2: {
    flex: 7,
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    position: 'absolute',
    top: '5%',
    width: '100%',
    alignItems: 'center',
    
  },
  title: {
    fontSize: 23,
   fontFamily: 'Roboto',
    color: '#fdfdfd',
  },
  cardContainer: {
    position: 'absolute',
    top: '12%',
    width: '80%',
    height: 200,
    backgroundColor: '#fdfdfd',
    borderRadius: 8,
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    height: '70%',
  },
  profileImage: {
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 3,
  },
  nameContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameInput: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  name2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#a4a4a4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    marginLeft: 10,
  },
  options: {
   position: 'absolute',
    top: '40%',
    width: '90%',
    height: 300,
   // backgroundColor: '#fdfdfd',
   // borderRadius: 8,
   // elevation: 20,
    justifyContent: 'center',
    
    alignSelf: 'center',
  },
  optionsBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#a4a4a4',
    alignItems: 'center',
    marginTop: 20,
   flexDirection: 'row',
  },
  optionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 30,
  },
  circle: {
    backgroundColor: '#3576f6',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
   // paddingBottom: 1,
    borderRadius: 25,
  },
});

export default ProfileScreen;
