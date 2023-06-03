import React ,{useEffect,useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
    },
    {
      "_id": "4",
      "name": "Group 4",
      "balance": 1500,
      "members": ["2", "3"],
      "expenses": ["1", "3"],
      "reimbursement": ["1"],
      "createdAt": "2023-05-28T09:45:00.000Z",
      "updatedAt": "2023-05-28T09:45:00.000Z"
    },
    {
      "_id": "5",
      "name": "Group 5",
      "balance": 1500,
      "members": ["2", "3"],
      "expenses": ["1", "3"],
      "reimbursement": ["1"],
      "createdAt": "2023-05-28T09:45:00.000Z",
      "updatedAt": "2023-05-28T09:45:00.000Z"
    },
    {
      "_id": "6",
      "name": "Group 6",
      "balance": 1500,
      "members": ["2", "3"],
      "expenses": ["1", "3"],
      "reimbursement": ["1"],
      "createdAt": "2023-05-28T09:45:00.000Z",
      "updatedAt": "2023-05-28T09:45:00.000Z"
    },
    {
      "_id": "7",
      "name": "Group 7",
      "balance": 1500,
      "members": ["2", "3"],
      "expenses": ["1", "3"],
      "reimbursement": ["1"],
      "createdAt": "2023-05-28T09:45:00.000Z",
      "updatedAt": "2023-05-28T09:45:00.000Z"
    },
    {
      "_id": "8",
      "name": "Group 8",
      "balance": 1500,
      "members": ["2", "3"],
      "expenses": ["1", "3"],
      "reimbursement": ["1"],
      "createdAt": "2023-05-28T09:45:00.000Z",
      "updatedAt": "2023-05-28T09:45:00.000Z"
    },
    {
      "_id": "9",
      "name": "Group 9",
      "balance": 1500,
      "members": ["2", "3"],
      "expenses": ["1", "3"],
      "reimbursement": ["1"],
      "createdAt": "2023-05-28T09:45:00.000Z",
      "updatedAt": "2023-05-28T09:45:00.000Z"
    }
  ];

  const DropMembres = () => {
    return (
      <View style={styles.container}>
         <SelectDropdown
           data={groups.map(group => group.name)}
           onSelect={(selectedItem, index) => {
             console.log(selectedItem, index);
           }}
          //  defaultValueByIndex={1}
           // defaultValue={'Egypt'}
           
            defaultButtonText={'Select membre'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
          
            renderDropdownIcon={isOpened => {
              return <MaterialCommunityIcons name={isOpened ? 'chevron-up-circle' : 'chevron-down-circle'} color={'#555'} size={18} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
            selectedRowStyle={styles.dropdown2SelectedRowStyle}
            search
            searchInputStyle={styles.dropdown2searchInputStyleStyle}
            searchPlaceHolder={'Search here'}
            searchPlaceHolderColor={'darkgrey'}
            renderSearchInputLeftIcon={() => {
              return   <AntDesign name={"search1"} size={24} color="white" />;
            }}
          />
          
      </View>
    );
  };
  export default DropMembres
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dropdown2BtnStyle: {
        height: 35,
        width: '100%',
     justifyContent: 'center',
        backgroundColor: '#444',
        borderRadius: 8,
      },
      dropdown2BtnTxtStyle: {
        color: '#FFF',
        textAlign: 'center',
       
      },
      dropdown2DropdownStyle: {
        backgroundColor: '#444',
        borderRadius: 12,
      },
      dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
      dropdown2RowTxtStyle: {
        color: '#FFF',
        textAlign: 'center',
      
      },
      dropdown2SelectedRowStyle: {backgroundColor: 'rgba(255,255,255,0.2)'},
      dropdown2searchInputStyleStyle: {
        backgroundColor: '#444',
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
      },
  });
