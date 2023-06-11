import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ChatGroup from '../screens/ChatGroup';
import { useNavigation } from '@react-navigation/native';
export default function Card() {
  const navigation = useNavigation();

  return(
      <TouchableOpacity onPress={()=> navigation.navigate(ChatGroup)}>
        <View style={styles.groupBox}>
        <View style={styles.imagecontainer}>
          <Image style={styles.img} source={require('../../assets/group.png')}></Image>
        </View>
        <View style={styles.cont2}>
            <Text style={styles.title}>Family</Text>
            <View style={styles.containerDate}>
                <Icon name="calendar" size={16} color="gray" />
                    <Text style={styles.date}>15 July </Text>
                </View>
                <View style={styles.containerMembers}>
                    <View style={styles.members} >
                        <Image style={styles.wewe} source={require('../../assets/favicon.png')}></Image>
                        <Image style={styles.wewe} source={require('../../assets/favicon.png')}></Image>
                        <Image style={styles.wewe} source={require('../../assets/favicon.png')}></Image>
                        <Image style={styles.wewe} source={require('../../assets/favicon.png')}></Image>
                    </View>
                    <Text style={{color:'gray'}}>members</Text>

                </View>


          </View>
        <View style={styles.cont3}>
          <View style={styles.blance}>
            <Text style={styles.amount}>300$</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
 
  groupBox: {
    backgroundColor: '#D0D0D0',
    borderRadius: 20,
    padding:10,
    flexDirection: 'row',
    marginHorizontal:10,
    marginVertical:10,
    height:100,
    justifyContent:'space-between',

    alignContent:'center',   
  },
  cont2:{ 
    width:'60%',
    flexDirection:'column',
    justifyContent:'space-around',
    alignContent:'center',
    padding:10,
  },
  containerDate:{
    flexDirection:'row',
    gap:10,
     alignItems:'center',

},
  title:{
    marginBottom:5,
    color:'#212A37',
    fontSize:20,
    fontWeight:'bold',
  },
    date:{
    color:'gray',
    fontSize:13,
    },
    members:{
    },

  cont3:{
    width:'17%',
    justifyContent:'center',
   // right:0,
   // backgroundColor:'red',
  },
  imagecontainer:{
  // backgroundColor:'red',
    alignContent:'center', 
  },
  img:{ 
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  blance:{
    backgroundColor:'#FFCA27',
    borderRadius:10,
    paddingHorizontal:10,
    paddingVertical:5,
  },
    amount:{
    color:'black',
    fontSize:15,
    fontWeight:'bold',
    },
    containerMembers:{
        flexDirection:'row',
        marginTop:10,
        gap:10,
        alignItems:'center',
    },
    members:{
        flexDirection:'row',
         gap:-11,
        alignItems:'center',
    },
    wewe:{
        width:20,
        height:20,
        borderRadius:10,
        marginHorizontal:1,
        gap:100,
    }

});

