import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EvilIcons ,SimpleLineIcons,AntDesign ,MaterialCommunityIcons ,MaterialIcons ,Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import TestChart from '../components/chart';
import { FlatList } from 'react-native-gesture-handler';
<MaterialIcons name="restaurant" size={24} color="black" />
const expenses = [
  { id: 1, icon: 'home', name: 'Home', date: 'May 20, 2023', amount: '$50' },
  { id: 2, icon: 'car-back', name: 'Gasoil', date: 'May 19, 2023', amount: '$30' },
  { id: 3, icon: 'shopping', name: 'Shopping', date: 'May 19, 2023', amount: '$80' },
  { id: 4, icon: 'bus-marker', name: 'Shopping', date: 'May 19, 2023', amount: '$80' },
  { id: 5, icon: 'shopping', name: 'Shopping', date: 'May 19, 2023', amount: '$80' },
  // Add more expense items as needed
];
const sliceColor = ['#fdaf00', '#fd336b', '#00cdc0', '#fd336b', '#00cdc0'];

const ExpenseCard = ({ icon, name, date, amount, color }) => {
  return (
    <View style={styles.card}>
      <View style={styles.expenseInfo}>
        <View style={[styles.circle, { backgroundColor: color }]}>
          <MaterialCommunityIcons name={icon} size={32} color="white"  />
        </View>
        <Text style={styles.expenseName}>{name}</Text>
        <Text style={styles.expenseDate}>{date}</Text>
      </View>
      <View style={styles.rightHeader}>
      <Text style={styles.expenseAmount}>{amount}  </Text>
     <MaterialIcons style={styles.expenseDetails} name="keyboard-arrow-right" size={24} color="black" />
     </View>
    </View>
  );
};
const ReportScreen = () => {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const toggleCalendarVisibility = () => {
    setCalendarVisible(!isCalendarVisible);
  };

  return (
    <View style={styles.container}>
       <View style={styles.header}>
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
      {/* ... */}
      <View style={styles.body}>
           <View style={styles.dropdown}>
        
          <View style={styles.leftHeader}>
            <TouchableOpacity>
            <Ionicons name="arrow-back" size={25} color="#212A37" style={styles.arrow} />
            </TouchableOpacity>
          </View>

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
          <View style={styles.rightHeader}>
            <TouchableOpacity>
            <Ionicons name="arrow-forward" size={25} color="#212A37" style={styles.arrow}/>
            </TouchableOpacity>
          </View>
          

        </View>

        <View style={styles.chart}>
        <TestChart/>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBF9F7',
    height: '8%',
    justifyContent: 'space-between',
    padding: 10,
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
  groupMembers: {
    fontSize: 12,
    color: '#fff',
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
    height: '90%',
    backgroundColor: '#FBF9F7',
  },
  dropdown: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBF9F7',
    height: '8%',
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
    marginTop: 20,
  },
  chart: {
    marginTop: 10,
    height: '40%',
    backgroundColor: '#FBF9F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  expenseCategories : {
    height: '40%',
    backgroundColor: '#FBF9F7',
   
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    borderBottomColor: '#E5E5E5',
    
  },

  list: {
    marginTop: 10,
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
