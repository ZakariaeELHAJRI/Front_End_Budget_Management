import React ,{useEffect,useState} from 'react';
import { View, Text, StyleSheet  } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { MaterialCommunityIcons ,AntDesign } from '@expo/vector-icons'

const groups= [
    {
      "_id": "1",
      "name": "Group 1",
      "balance": 1000,
      "members": ["1", "2", "3"],
      "expenses": ["1", "2", "3"],
      "reimbursement": ["1"],
      "createdAt": "2023-05-30T10:00:00.000Z",
      "updatedAt": "2023-05-30T10:00:00.000Z"
    },
    {
      "_id": "2",
      "name": "Group 2",
      "balance": 500,
      "members": ["1", "3"],
      "expenses": ["2"],
      "reimbursement": [],
      "createdAt": "2023-05-29T15:30:00.000Z",
      "updatedAt": "2023-05-29T15:30:00.000Z"
    },
    {
      "_id": "3",
      "name": "Group 3",
      "balance": 1500,
      "members": ["2", "3"],
      "expenses": ["1", "3"],
      "reimbursement": ["1"],
      "createdAt": "2023-05-28T09:45:00.000Z",
      "updatedAt": "2023-05-28T09:45:00.000Z"
    }
  ];

  const DropGroup = () => {
    return (
      <View style={styles.container}>
         <SelectDropdown
           data={groups.map(group => group.name)}
           onSelect={(selectedItem, index) => {
             console.log(selectedItem, index);
           }}
          //  defaultValueByIndex={1}
           // defaultValue={'Egypt'}
           
            defaultButtonText={'Select group'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
          
            renderDropdownIcon={isOpened => {
              return <MaterialCommunityIcons name={isOpened ? 'chevron-up-circle' : 'chevron-down-circle'} color={'#555'} size={18} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
            selectedRowStyle={styles.dropdown1SelectedRowStyle}
            search
            searchInputStyle={styles.dropdown1searchInputStyleStyle}
            searchPlaceHolder={'Search here'}
            searchPlaceHolderColor={'darkgrey'}
            renderSearchInputLeftIcon={() => {
              return   <AntDesign name={"search1"} size={24} color="white" />;
            }}
          />
      </View>
    );
  };
  export default DropGroup
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dropdown1BtnStyle: {
     height: 35,
        width: '100%',
     justifyContent: 'center',
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
