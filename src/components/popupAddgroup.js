import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Keyboard, TouchableOpacity, Image, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import SelectBox from 'react-native-multi-selectbox';
import axios from 'axios';
import { AuthenticatedUserContext } from "../navigation/RootNavigator";
import {TextInput } from 'react-native-paper';
export default function AddGroup(props) {
  const { user } = useContext(AuthenticatedUserContext);
  const [nom, setNomGroup] = useState("");
  const [balance, setBalanceGroup] = useState(0);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [mappedUsers, setMappedUsers] = useState([]);
  const data = [
    { item: 'item 1', id: 1 },
    { item: 'item 2', id: 2 },
  ]
  const { handlePress ,allusers } = props;
  const token = user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    setUsers(allusers);
  }, [allusers]);
  
  useEffect(() => {
    console.log('all users 2:', allusers);
    console.log('users 2:', users);
    const mappedU = allusers.data.map(user => ({
      item: user.name,
      id: user._id,
    }));
    setMappedUsers(mappedU);
    console.log('mappedUsers:', mappedUsers);
  }, [users]);

  const AddGroupe = () => {
    // Create the group object
    console.log('selectedTeams:', selectedTeams);
    const group = {
      name: nom,
      balance: balance || 0,
      members: selectedTeams.map(team => team.id),
    };
console.log('group before send :', group);
    // Send the group object to the server
    axios.post('http://10.0.2.2:3000/group/add', group, { headers })
      .then(response => {
        console.log('Group added successfully:', response.data);
      })
      .catch(error => {
        console.error('Error adding group:', error);
      });
  };

  const onMultiChange = (item) => {
    setSelectedTeams([...selectedTeams, item]);
  };

  const onMultiRemove = (item) => {
    setSelectedTeams(selectedTeams.filter(team => team.id !== item.id));
  };

  const [image, setImage] = useState('https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    console.log('image ..', image);
  }, [image]);

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Modal transparent isVisible={true}>
          <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={handlePress} >
            <Fontisto name='close-a' />
          </TouchableOpacity>
            <View style={styles.imageContainer}>
              <View style={styles.circle}>
                {image && <Image source={{ uri: image }} style={styles.image} />}
              </View>

              <TouchableOpacity style={styles.addButton} onPress={pickImage}>
                <MaterialIcons style={styles.addButtonIcon} name='add' />
              </TouchableOpacity>
            </View>

            <TextInput  style={{marginVertical:2,backgroundColor:'white'}} label="Group Name" onChangeText={setNomGroup}/>
          <TextInput  style={{marginVertical:2,backgroundColor:'white'}} label="Group Balance" onChangeText={setBalanceGroup}/>
            <SelectBox
              label="Select members"
              options={mappedUsers}
              selectedValues={selectedTeams}
              onMultiSelect={onMultiChange}
              onTapClose={onMultiRemove}
              isMulti
            />

            <TouchableOpacity style={styles.confirmAddGroup} onPress={AddGroupe}>
              <Text style={styles.confirmAddGroupText}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 50,
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 10,
    zIndex: 1,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: -30,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  addButton: {
    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: '#D0D0D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    marginVertical: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#D0D0D0',

  },
  confirmAddGroup: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    height: 40,
    marginTop: 20,
    backgroundColor: '#FF6238',
    borderRadius: 20,
  },
  confirmAddGroupText: {
    color: '#212A37',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
