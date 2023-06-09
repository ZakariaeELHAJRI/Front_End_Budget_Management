import React,{useState} from 'react';
import { View, Text ,StyleSheet, SafeAreaView,TouchableOpacity, Image} from 'react-native';
import AddGroup from '../components/popupAddgroup.js';

const DetailsGroup = ({ navigation }) => {

  const [balanceVisible, setBalanceVisible] = useState(true);
  const [balance, setBalance] = useState("");

const [isViewVisible, setViewVisibility] = useState(false);
  const ModifyPress = () => {
    setViewVisibility(!isViewVisible);
  };
return(

      <View style={styles.container}>
          <View style={styles.containerFirst}>
              <Image source={require('../../assets/group.png')} style={{width: '100%',height: '100%'}} />
          </View>
          <View style={styles.containerSecond}>
            <View>
              <View style={styles.header}>
                <View>
                  <Text style={styles.text} >title</Text>
                  <Text style={styles.leader}>leader : AbdessamadPas</Text>
                </View>
                <View ><Text style={styles.text}> 33£</Text></View>
              </View>
              
            </View>
            <View style={styles.containerMembers}>
              <View style={styles.members} >
                  <Image style={styles.membrePicture} source={require('../../assets/favicon.png')}></Image>
                  <Image style={styles.membrePicture} source={require('../../assets/favicon.png')}></Image>
                  <Image style={styles.membrePicture} source={require('../../assets/favicon.png')}></Image>
                  <Image style={styles.membrePicture} source={require('../../assets/favicon.png')}></Image>
              </View>
              <Text style={{color:'gray',fontSize:15}}>+10 </Text>
            </View>
            <View >
              <Text style={{fontSize:22, fontWeight:"400"}}>Description</Text>
              <Text style={{fontSize:13, fontWeight:"400", color:'gray'}}>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</Text>
            </View>
            <View style={{ display:'flex', justifyContent:'center',alignItems:'center'}}>
              <Text style={styles.modifyGroup}
              onPress={ModifyPress }>Modifier</Text>
          </View>
          </View>
          {isViewVisible && (
            <AddGroup handlePress ={ModifyPress} balanceVisible={balanceVisible} setbalance={setBalance} />
          )}
      </View>
 
);
};

export default DetailsGroup


const styles = StyleSheet.create({
  container:{
    height:"100%"
  },
containerFirst: {
  height:"30%",
 
},
containerSecond:{
  display:"flex",
  flexDirection:"column",
  gap:50,
  padding:20,
  height:'73 %',
  top:-16,

  backgroundColor: "white",
borderRadius:20,
borderBottomLeftRadius:0,
borderBottomRightRadius:0,

},
header:{
  display:"flex",
  flexDirection:"row",
  justifyContent:"space-between",
},
text:{
  fontSize:28, fontWeight:"500",
  borderRadius:20,
},
leader:{
  color:"gray",
  fontSize:16,
  
},
containerMembers:{
  flexDirection:'row',
  gap:10,
  alignItems:'center',
  justifyContent:'center'
},
members:{
  flexDirection:'row',
   gap:-11,
  alignItems:'center',
},
membrePicture:{
  width:50,
  height:50,
  borderRadius:10,
  marginHorizontal:1,
  gap:100,
},
modifyGroup:{
  borderWidth: 1,
  borderColor: '#FF6238',
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal:10,
  paddingVertical:5,
  backgroundColor: '#FF6238',
  borderRadius: 20,
  fontWeight:'bold',fontSize:15
},
 })