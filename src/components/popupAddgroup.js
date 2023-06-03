import { StyleSheet, Text, View, TouchableOpacity ,Image,SafeAreaView} from 'react-native';
import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';
import  Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';



import SelectBox from 'react-native-multi-selectbox';
 import { xorBy } from 'lodash';
import { TextInput } from 'react-native-paper';

const K_OPTIONS = [
  {
    item: 'Juventus',
    id: 'JUVE',
  },
  {
    item: 'Real Madrid',
    id: 'RM',
  },
  {
    item: 'Barcelona',
    id: 'BR',
  },
  {
    item: 'PSG',
    id: 'PSG',
  },
  {
    item: 'FC Bayern Munich',
    id: 'FBM',
  },
  {
    item: 'Manchester United FC',
    id: 'MUN',
  },
  {
    item: 'Manchester City FC',
    id: 'MCI',
  },
  {
    item: 'Everton FC',
    id: 'EVE',
  },
  {
    item: 'Tottenham Hotspur FC',
    id: 'TOT',
  },
  {
    item: 'Chelsea FC',
    id: 'CHE',
  },
  {
    item: 'Liverpool FC',
    id: 'LIV',
  },
  {
    item: 'Arsenal FC',
    id: 'ARS',
  },

  {
    item: 'Leicester City FC',
    id: 'LEI',
  },
]


export default function AddGroup(props) {
    const handlePress = props.handlePress;

    const [selectedTeams, setSelectedTeams] = useState([])

    function onMultiChange() {
      return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
    }

// function onChange() {
//       return (val) => setSelectedTeam(val)
//     }



const [image, setImage] = useState('./assets/group.png');
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log(result);

  if (!result.canceled) {
    setImage(result.uri);
  }
};
useEffect(()=>{
  console.log(image);
},[image]);
    return(
        
      <SafeAreaView>
            
        <Modal  transparent isVisible={true}>
            
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.colsebutton} onPress={handlePress}>
            <Fontisto name='close-a'></Fontisto>
          </TouchableOpacity>
          <View style={styles.imagecontainer}>     
            <View style={styles.circle}>
            {image && 
              <Image
                source={{ uri: image, backgroundColor:'black'}} 
                style={styles.image}
              />}
            </View>
           
            <TouchableOpacity style={styles.addButton} onPress={pickImage}>
              <MaterialIcons style={styles.addButtonIcon} name='add'></MaterialIcons>
            </TouchableOpacity>   
          </View>
      <TextInput  style={{marginVertical:10, }} label="Group Name" />
      <Text style={{ fontSize: 20, paddingBottom: 10 }}>Select Demo</Text>
      <SelectBox
        label="Select memebers"
        options={K_OPTIONS}
        selectedValues={selectedTeams}
        onMultiSelect={onMultiChange()}
        onTapClose={onMultiChange()}
        isMulti
      />
        </View>     
        </Modal>

      </SafeAreaView>
    );
 }
const styles = StyleSheet.create({
    modalContainer: {
        
        backgroundColor:'white',
        padding:10,
        marginHorizontal:20,
        marginVertical:50,
        borderRadius:10,
        
      },
      colsebutton:{
        position:'absolute',
        right:20,
        top:10,
        zIndex:1,
      },
      imagecontainer:{
        flexDirection:'row',
        alignItems:'flex-end', 
        justifyContent:'center',
        
      },
      circle: {
        width: 100,
        height: 100,
        borderRadius: 100,
        overflow: 'hidden',
        borderWidth:2,
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
        position:'absolute',
        right:120,
        
       
        
      },
      addButtonIcon: {
        fontSize:22,
        fontWeight:'bold',
        color: 'white',
      },
});

 