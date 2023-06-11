import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
const backImage = require("../../assets/4.jpg");
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {AuthenticatedUserContext} from '../navigation/RootNavigator';

export default function Login({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {login} = useContext(AuthenticatedUserContext);
  const onHandleLogin = async() => {

    login(email, password)
    // axios.post('https://budgetmanagement.herokuapp.com/auth/signin', {
    //   email: email,
    //   password: password,
    // })
    // .then(function (res) {
    //   // window.localStorage.setItem('user' , res.data.user._id)
    //   // window.localStorage.setItem('token' , res.data.token)
    //   AsyncStorage.removeItem('user').then(()=>console.log('user removed'))
    //   AsyncStorage.removeItem('token').then(()=>console.log('token removed'))
    //   AsyncStorage.setItem('user', res.data.user._id).then(()=>console.log('user saved'))
    //   AsyncStorage.setItem('token', res.data.token).then(()=>console.log('token saved'))
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  };

 useEffect(() => {
  
 }, [])
  
  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Log In</Text>
         <TextInput
        style={styles.input}
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={true}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Log In</Text>
      </TouchableOpacity>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={{color: '#f57c00', fontWeight: '600', fontSize: 14}}> Sign Up</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});