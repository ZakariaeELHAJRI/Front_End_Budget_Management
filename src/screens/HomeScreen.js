import React from 'react';
import { View, Text , StyleSheet ,Image , FlatList ,TouchableOpacity } from 'react-native';
import {FontAwesome5  ,SimpleLineIcons ,Feather , EvilIcons ,AntDesign ,MaterialCommunityIcons ,MaterialIcons ,Ionicons } from '@expo/vector-icons';
import ExpenseCard from './../components/ExpencesCard';

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
const HomeScreen = () => {
const sliceColor = ['#fdaf00', '#fd336b', '#00cdc0', '#fd336b', '#00cdc0'];

  return (
    <View style={styles.container}> 
    <View style = {styles.body}>
    <View style = {styles.header}>
     <TouchableOpacity>
     <SimpleLineIcons name="menu" size={30} color="black" />
    </TouchableOpacity>
    <Text style = {styles.headerText}></Text>
    <TouchableOpacity>
    <Ionicons name="md-person-circle-sharp" size={40} color="#FFCA27" />
    </TouchableOpacity>
    </View>

    
    
    <View style = {styles.cardProfile}>
      {/* image  profile*/}
    <Image source = {require('../../assets/my_pic.jpeg')} style = {styles.img}/>
    <View style = {styles.details}>

    <Text style = {styles.cardText}>E.Zakariae</Text>
    <Text style = {styles.cardProfession}>Computer Engineer</Text>
    </View>
    </View>
    <View style = {styles.cardIncome}>
      {/* image  profile*/}
      <Feather style={styles.FontAwesome} name="arrow-up-circle" size={35} color="#212A37" />
      <View style = {styles.details}>
      <Text style = {styles.IncomeTitle}>Income</Text>
      <Text style = {styles.IncomeAmount}>$64.00</Text>
      </View>
      <View style = {styles.dashVertical}>
      </View>
      <Feather style={styles.FontAwesome} name="arrow-down-circle" size={35} color="#212A37" />
    <View style = {styles.details}>
    <Text style = {styles.IncomeTitle}>Expenses</Text>
    <Text style = {styles.IncomeAmount}>$54.00</Text>

    </View>
    </View>

    <View style = {styles.cardBalance}>
      {/* image  profile*/}

    <View style = {styles.details}>

    <Text style = {styles.balanceText}>Total Balance</Text>
    <Text style = {styles.balanceAmount}>$ 564.00</Text>

    </View>
    <View style = {styles.solde}>
    <Text style = {styles.soldeUp}>-20%</Text>
    </View>
    </View>

    </View>

    <View style = {styles.ButtomBG}>

  <View style = {styles.Expenses}>
     <Text  style = {styles.titleExpenses} > Top Recent Expenses
      </Text>
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBF9F7', // #1e1d2d
   
    justifyContent: 'space-between',
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    color: '#212A37',
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    backgroundColor: '#FBF9F7',
    
  },
  cardProfile: {
    marginTop: 5,
    flex : 1,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '90%',
   
    borderRadius: 10,
   
  },
  cardProfession: {
    color: '#212A37',
    fontSize: 17,
    marginTop: 10,
    fontFamily: 'sans-serif-light',
  },
  cardIncome: {
    flex : 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    width: 350,
    height: 150,
    borderRadius: 10,
   
  },
  FontAwesome: {  
    marginLeft: 20,
    marginTop: 15,
    justifyContent : 'center',
    alignItems: 'center',
    
  },
  IncomeTitle: {
    color: '#212A37',
    fontSize: 15,
    marginTop: 10,
  },
  dashVertical: {
    borderStyle: 'dashed',
    borderColor: '#212A37',
    borderWidth: 1,
    borderRadius: 1,
    marginTop: 10,
    height: 60,
    backgroundColor: '#fff',
    marginLeft: 30,
  },
  IncomeAmount: {
    color: '#FF6238',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 5,
  },
    IncomeAmount: {
    color: '#FF6238',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 5,
  },
  cardBalance: {
    marginTop: 20,
    flex : 1,
    marginHorizontal:20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    width: 360,
    shadowColor: '#FFCA27',
    borderWidth: 0.5, 
   borderTopRightRadius: 20,
   borderBottomLeftRadius: 20,
    backgroundColor: '#ffca274a', // Transparent background
    backdropFilter: 'blur(20px)', // Glass effect
    zIndex: 1, // To make it appear above the background image
  },
  details: {
    alignItems: 'flex-start',
    marginLeft: 10,

  },
  img: {
    position: 'relative',
    width: 90,
    height: 90,
    borderRadius: 20,
    marginTop: 10,
  },
  cardText: {
    color: '#212A37',
    fontSize: 30,
    //fontWeight: 'bold',
    marginTop: 10,
  },
  cardAmount: {
    color: '#fff',
    fontSize: 20,
   // fontWeight: 'bold',
    marginTop: 5,
  },
  balanceText: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  balanceAmount: {
    color: '#000',
    fontSize: 30,
   // fontWeight: 'bold',
    marginTop: 5,
  }, 
  solde: {
  marginRight: 10,
  },  
  soldeUp: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#e41e95',
    backgroundColor: '#FBF9F7',
    borderRadius: 10,
    padding: 5,
  },
  Expenses: {

    marginHorizontal: 10,
    flexDirection: 'row',
    padding: 10,
    width: 350,

 
   
  },
  titleExpenses: {
    color: '#000',
    fontSize: 25,
  // fontWeight: 'bold',
    marginTop: 10,
  },
  ButtomBG: {
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#FBF9F7', //#97cadb 
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,

  },
  list: {
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
export default HomeScreen;
