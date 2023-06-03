import React ,{useEffect,useState} from 'react';
import { View, Text, StyleSheet ,Button } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { MaterialCommunityIcons ,AntDesign } from '@expo/vector-icons';
import DatePicker from '../components/Calendar';
import { TextInput } from 'react-native-gesture-handler';
;


const Profile = ({navigation }) => {
    const [firstName, setFirstName ]= useState("");
    onPressLearnMore=()=>{
        console.log("learn more");
        console.log(firstName);
    }
    const group = {
        _id: Math.random().toString(),
        name: firstName,
      
       
      };
    useEffect(() => {
    const hideTabBar = navigation.addListener("focus", () => {
      console.log("focus");
      navigation.setOptions({
        tabBarStyle: { display: "none" },
      });
     
    });
    return hideTabBar;
  }, [navigation]);
  return (
    <View style={styles.container}>
        <TextInput  
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder="First Name"
            onChangeText={(text)=> setFirstName(text)}
            />
            <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder="Last Name"
            />
                    <Button
                onPress={onPressLearnMore}
                title="submit"
                backgroundColor="#000"
                accessibilityLabel=" button"
                />
      <Text>Profilr Screen</Text>
      <DatePicker/>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown1BtnStyle: {
    width: '70%',
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1SelectedRowStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
  dropdown1searchInputStyleStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
});
