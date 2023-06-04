import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EvilIcons ,SimpleLineIcons,AntDesign ,MaterialCommunityIcons ,MaterialIcons ,Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import TestChart from '../components/chart';
import { FlatList } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import DropGroup from '../components/DropGroup';
import DropMembres from '../components/DropMembres';
import ExpenseCard from './../components/ExpencesCard';
const ReportScreen = () => {
const expenses = [
  { id: 1, icon: 'home', name: 'Home', date: 'May 20, 2023', amount: '$50' },
  { id: 2, icon: 'car-back', name: 'Gasoil', date: 'May 19, 2023', amount: '$30' },
  { id: 3, icon: 'shopping', name: 'Shopping', date: 'May 19, 2023', amount: '$80' },
  { id: 4, icon: 'bus-marker', name: 'Shopping', date: 'May 19, 2023', amount: '$80' },
  { id: 5, icon: 'shopping', name: 'Shopping', date: 'May 19, 2023', amount: '$80' },
  { id: 6, icon: 'shopping', name: 'Shopping', date: 'May 19, 2023', amount: '$80' },
  { id: 7, icon: 'car-back', name: 'Shopping', date: 'May 19, 2023', amount: '$10' },
  // Add more expense items as needed
];
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
const sliceColor = ['#fdaf00', '#fd336b', '#00cdc0', '#fd336b', '#00cdc0'];
const [selectedGroup, setSelectedGroup] = useState('');
const handleGroupChange = (itemValue) => {
  setSelectedGroup(itemValue);
};
const Component1 = () => {
  return <Text>All </Text>;
};

const Component2 = () => {
  return (
   <DropGroup />
  );
};

const Component3 = () => {
  return (
     <DropMembres />
  );
 
};

  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(0);
  const components = [Component1, Component2, Component3];

  const handleNext = () => {
    setCurrentComponent((prevComponent) => (prevComponent + 1) % components.length);
  };

  const handleBack = () => {
    setCurrentComponent((prevComponent) =>prevComponent === 0 ? components.length - 1 : prevComponent - 1 );
  };

  const CurrentContent = components[currentComponent];
  const toggleCalendarVisibility = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <View style={styles.header1}>
        <View style={styles.leftHeader}>
          <View>
                <React.Fragment>
                  <Text style={styles.RepportTitle}>Repport</Text>
                </React.Fragment>
          </View>
        </View>
        <View style={styles.rightHeader}>
          <TouchableOpacity>
            <SimpleLineIcons name="options-vertical" size={24} color="#212A37"   />
          </TouchableOpacity>
        </View>
        </View>
        <View style={styles.header2}>
          <View style={styles.dropdown}>
          <View style={styles.leftHeader}>
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="arrow-back" size={25} color="#212A37" style={styles.arrow} />
            </TouchableOpacity>
          </View>

          <View style={styles.centerHeaderselect}>    
          <CurrentContent style={styles.components}/>
          </View>

          <View style={styles.rightHeader}>
            <TouchableOpacity onPress={handleNext}>
              <Ionicons name="arrow-forward" size={25} color="#212A37" style={styles.arrow} />
            </TouchableOpacity>
          </View>
        </View>
        </View>
        <View style={styles.header3}>
        <View style={styles.dropdown}>
        
       

        <View style={styles.centerHeader}>
          
          <Text style={styles.dropdownText}>Today</Text>
          <TouchableOpacity onPress={toggleCalendarVisibility}>
          <AntDesign name="calendar" size={24} color="black" />
          </TouchableOpacity>
      

        {isCalendarVisible && (
          <View style={styles.calendar}>
            <Calendar /* Calendar component props go here */ />
          </View>
        )}
     </View>
      
        

      </View>
      </View>
      </View>
      {/* ... */}
      <View style={styles.body}>
    
        <View style={styles.chart}>
        <TestChart/>
        </View>

      </View>
        {/* i need FlatList component goes here for the expense categories*/}
       <View style={styles.expenseCategories}>  
      
        
       <View style={styles.list}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ExpenseCard
            icon={item.icon}
            name={item.name}
            date={item.date}
            amount={item.amount}
            color={sliceColor[index % sliceColor.length]}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
    
            </View>
            
     
    </View>
  );
};

export default ReportScreen;

// Styles...


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: '#FBF9F7',
    flexDirection: 'column',
  },
  header: {
    marginTop: 10,
    flexDirection: 'column',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: '#FBF9F7',//#FBF9F7
    flex: 1,
    justifyContent: 'space-between',
   paddingBottom: 20,
  },
  header1: {
    flexDirection: 'row',
    marginTop: 5,
    width: '100%',
    justifyContent: 'space-between',
  },
  header2: {
    flexDirection: 'row',
    marginTop: 5,
  },
header3: {
    flexDirection: 'row',
    marginTop: 5,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  RepportTitle: {
   
    fontSize: 25,
    color: '#212A37',
    fontWeight: 'bold',
  },

  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    borderRadius: 50,
    borderWidth: 0.4,
    borderColor: '#83c7f5',
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  body: {
    flex: 2,
    backgroundColor: '#FBF9F7',//#FBF9F7
    padding : 10,
    
  },
  dropdown: {
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBF9F7',
    width: '100%',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    borderBottomColor: '#E5E5E5',
  },
  centerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  
    width: '30%',
    justifyContent  : 'space-between',
  },
  components: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
  },
  dropdownText: {
    flexDirection: 'row',
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  dropdownIcon: {
    marginRight: 10,
  },
  calendar: {
   flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  chart: {
   flex: 1,
    backgroundColor: '#FBF9F7',  
    justifyContent: 'center',
    alignItems: 'center',
  },
  expenseCategories : {
    flex: 2.5,
    backgroundColor: '#FBF9F7',

    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    borderBottomColor: '#E5E5E5',
    
  },

  list: {
    height: '78%',
    marginTop: 5,
    marginHorizontal: 20,
    
  },
  card: {
    flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
       padding: 8,
       borderRadius: 10,
          shadowColor: '#000',
          shadowOpacity: 0.9,
          shadowOffset: {
            width: 10,
            height: 10,
          },
       marginBottom: 5,
        backgroundColor: '#FBF9F7', 
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
     },
     expenseInfo: {
       flexDirection: 'row',
       alignItems: 'center',
       
     },
     expenseName: {
        color: '#001b48',
        fontWeight: 'bold',
       marginLeft: 8,
       marginRight: 8,
       fontSize: 16,
     },
     expenseDate: {
       fontSize: 12,
       color: '#000',
     },
     expenseAmount: {
       fontSize: 18,
       color: '#001b48',
     },
      expenseDetails: {
        right: 0,
        color: '#d1d7db',
      },
      // New styles
    circle: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 1,
    borderRadius: 25,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
