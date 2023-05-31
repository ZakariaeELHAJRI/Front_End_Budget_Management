import React from 'react';
import { View, Text , StyleSheet ,Image , FlatList ,TouchableOpacity } from 'react-native';
import { FontAwesome5 ,Ionicons ,SimpleLineIcons ,Feather  } from '@expo/vector-icons';


const expenses = [
  { id: 1,  image : '../../assets/my_pic.jpeg', name: 'Restaurant', date: 'May 20, 2023', amount: '-$50' },
  { id: 2, image : '../../assets/restaurant.png', name: 'Groceries', date: 'May 19, 2023', amount: '-$30' },
  // Add more expense items as needed
];
const ExpenseCard = ({ name, date, amount , image }) => {
  return (
      <View style={styles.card}>
      <View style={styles.expenseInfo}>
      <View style={styles.circle}>
      <Image source={require('../../assets/shop.jpg')} style={styles.image} />
    </View>
        <Text style={styles.expenseName}>{name}</Text>
        <Text style={styles.expenseDate}>{date}</Text>
      </View>
      <Text style={styles.expenseAmount}>{amount} &darr;</Text>
    </View>
  );
};
const HomeScreen = () => {
  return (
    <View style={styles.container}> 
    <View style = {styles.header}>
     <TouchableOpacity>
     <SimpleLineIcons name="menu" size={30} color="black" />
    </TouchableOpacity>
    <Text style = {styles.headerText}></Text>
    <TouchableOpacity>
    <Ionicons name="md-person-circle-sharp" size={40} color="#FFCA27" />
    </TouchableOpacity>
    </View>

    <View style = {styles.body}>
    
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

    

    <View style = {styles.ButtomBG}>

  <View style = {styles.Expenses}>
     <Text  style = {styles.titleExpenses} > Top Recent Expenses
      </Text>
      </View>
    <View style={styles.list}> 
   <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseCard name={item.name} date={item.date} amount={item.amount} />
        )}
        showsVerticalScrollIndicator={false} // Hide scroll indicator
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
    height: 60,
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
    width: 350,
    height: 150,
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
    padding: 10,
    width: 360,
    height: 150,
    shadowColor: '#FFCA27',
   borderTopRightRadius: 20,
   borderBottomLeftRadius: 20,
    backgroundColor: '#FFCA27', // Transparent background
    backdropFilter: 'blur(15px)', // Glass effect
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
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardAmount: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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
    fontWeight: 'bold',
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
    fontWeight: 'bold',
    marginTop: 10,
  },
  ButtomBG: {
    flex: 4,
    marginTop: 20,
    backgroundColor: '#ffca273d', //#97cadb 
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.06,

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
       marginBottom: 20,
        backgroundColor: '#FBF9F7',
    
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
       fontWeight: 'bold',
       color: 'red',
     },
      // New styles
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    overflow: 'hidden',
    
  },
  image: {
    width: '100%',
    height: '100%',
  },

});
export default HomeScreen;
