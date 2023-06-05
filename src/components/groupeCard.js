import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DetailsGroup from '../screens/DetailsGroup';
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
    marginHorizontal:20,
    marginVertical:10,
    height:160,
    justifyContent:'center',
    alignContent:'center',   
  },
  cont2:{ 
    width:'52%',
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
  },
  imagecontainer:{
    backgroundColor:'red',

    alignContent:'center', 
    borderRadius:20,
    width:"30%",
    
  },
  img:{
    flex:1 , 
    width: undefined, 
    height: undefined,
    borderRadius:15,
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

