import React, { useState, useEffect, useLayoutEffect } from "react";
import { GiftedChat , Bubble, SystemMessage  } from "react-native-gifted-chat";
import {TextInput, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import {AntDesign, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { collection, addDoc,getDocs, orderBy, query, onSnapshot } from 'firebase/firestore';
import { auth, database } from '../../config/firebase';
import ModalComponent from "../components/ModelExpences";
import { signOut } from "firebase/auth";

const onSignOut = () => {
  signOut(auth).catch(error => console.log('Error logging out: ', error));
};

export default function ChatGroup({ navigation }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesRef = collection(database, 'depences');
         // Replace 'depences' with your actual collection name
        const querySnapshot = await getDocs(messagesRef);
        const fetchedMessages = [];
        querySnapshot.forEach((doc) => {
          const messageData = doc.data();
          fetchedMessages.push(messageData);
        });
        setMessages(fetchedMessages);
        console.log('Messages retrieved from Firebase');
      } catch (error) {
        console.error('Error retrieving messages from Firebase:', error);
      }
    };
    fetchMessages();
  }, []);

 const getdata= useEffect(() => {
    const messagesRef = collection(database, 'depences'); // Replace 'depences' with your actual collection name
    const q = query(messagesRef, orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const updatedMessages = [];
      querySnapshot.forEach((doc) => {
        const messageData = doc.data();
        messageData.createdAt = doc.data().createdAt.toDate(),
        messageData.user = {
          _id: doc.data().user._id,
          name: doc.data().user.name,
          avatar: "https://placeimg.com/140/140/any",
        },
        updatedMessages.push(messageData);
      });
      setMessages(updatedMessages);
      console.log('Messages updated in real-time');
    });
    return () => unsubscribe();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const groups =[
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
  ]
  const selectedGroup = groups[0];
  console.log(selectedGroup.members);
  const users = [
    {
      "_id": "1",
      "name": "User 1",
      "email": "user1@example.com",
      "password": "password1",
      "phone": "1234567890",
      "createdAt": "2023-05-30T10:00:00.000Z",
      "updatedAt": "2023-05-30T10:00:00.000Z"
    },
    {
      "_id": "2",
      "name": "User 2",
      "email": "user2@example.com",
      "password": "password2",
      "phone": "9876543210",
      "createdAt": "2023-05-29T15:30:00.000Z",
      "updatedAt": "2023-05-29T15:30:00.000Z"
    },
    {
      "_id": "3",
      "name": "User 3",
      "email": "user3@example.com",
      "password": "password3",
      "phone": "5555555555",
      "createdAt": "2023-05-28T09:45:00.000Z",
      "updatedAt": "2023-05-28T09:45:00.000Z"
    }
  ];

  const handelbackgroup = () => {
    navigation.navigate('Group');
  };
  
  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  const handleCancelSearch = () => {
    setSearchText("");
    setShowSearch(false);
   // getdata();
  // setMessages(messages);
  };

 /* useEffect(() => {
    const hideTabBar = navigation.addListener("focus", () => {
      console.log("focus");
      navigation.setOptions({
        tabBarStyle: { display: "none" },
      });
     
    });
    return hideTabBar;
  }, [navigation]);*/

  const openModal = () => {
    setShowModal(true);
    //setSelectedCategory(null);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddExpense = () => {
    const expense = {
      category,
      productName,
      productPrice,
    };
    setExpenses([...expenses, expense]);
    setCategory("");
    setProductName("");
    setProductPrice("");
    closeModal();
  
    const newMessage = {
      _id: `${messages.length + 1}-${new Date().getTime()}`,
      text: `Item added: ${expense.category} - ${expense.productName} ($${expense.productPrice})`,
      createdAt: new Date(),
      user: {
        _id: auth.currentUser.uid,
      },
      idGroup: 1,
      depencesName: '', 
      categorie: '', 
      price: '',
    };
    try {
      const messagesRef = collection(database, 'depences'); // Replace 'messages' with your actual collection name
      addDoc(messagesRef, newMessage);
      console.log('Message added to Firebase');
    } catch (error) {
      console.error('Error adding message to Firebase:', error);
    }
    setMessages(prevMessages => GiftedChat.append(prevMessages, [newMessage]));
  };

  const handleSearch = () => {
    // Perform search logic here using the searchText state
    const filteredMessages = messages.filter((message) => {
      const messageText = message.text.toLowerCase();
      const searchTerm = searchText.toLowerCase();
      return messageText.includes(searchTerm);
    });
    setMessages(filteredMessages);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
        <TouchableOpacity onPress={handelbackgroup}>
        <MaterialIcons style={styles.expenseDetails} name="keyboard-arrow-left" size={30} color="white" />
        </TouchableOpacity>
          <Image
            style={styles.groupImage}
            source={require('../../assets/my_pic.jpeg')}
          />
          <View>
            {showSearch ? (
              <TextInput
                style={styles.searchInputText}
                value={searchText}
                onChangeText={setSearchText}
                autoFocus={true}
                onBlur={handleSearch} // Call handleSearch when input loses focus
                onSubmitEditing={handleSearch} // Call handleSearch when enter is pressed
                placeholder="Search" // i need to change the color of the placeholder
                placeholderTextColor="white"
              />
            ) : (
                <React.Fragment>
                  <Text style={styles.groupTitle}>Group Name</Text>
                  <Text style={styles.groupMembers}>3 members</Text>
                </React.Fragment>
              )}
          </View>
        </View>
        <View style={styles.rightHeader}>
          {showSearch ? (
            <TouchableOpacity onPress={handleCancelSearch}>
              <MaterialIcons name="cancel" size={24} color="white" />
            </TouchableOpacity>
          ) : (
              <TouchableOpacity onPress={handleSearchToggle}>
                <AntDesign name={showSearch ? "close" : "search1"} size={24} color="white" />
              </TouchableOpacity>
            )}
          <TouchableOpacity>
            <SimpleLineIcons name="options-vertical" size={24} color="white"  onPress={onSignOut}  />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.conversation}>
            
            <ModalComponent
        showModal={showModal}
        closeModal={closeModal}
        users={users}
        selectedGroup={selectedGroup}
        handleAddExpense={handleAddExpense}
      />
            <GiftedChat
  messages={messages} 
  showUserAvatar={true}
  onSend={(newMessage) => setMessages(GiftedChat.append(messages, newMessage))}
  user={{
    _id: auth.currentUser.uid,
    avatar: "https://placeimg.com/140/140/any",
  }}
  renderInputToolbar={() => (
    <View style={styles.addButtonContainer}>
      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <MaterialIcons name="add-shopping-cart" size={30} color="white" />
      </TouchableOpacity>
    </View>
  )}
  renderBubble={(props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#ddddddf5', // Color for received messages
          },
          right: {
            backgroundColor: '#FFCA27',// Color for sent messages        
          },
        }}
      />
    );
  }}
  renderSystemMessage={(props) => (
    <SystemMessage
      {...props}
      containerStyle={{
        backgroundColor: '#FBF9F7', // Color for system messages
        borderRadius: 4,
        padding: 5,
      }}
      textStyle={{
        color: 'black',
        fontWeight: 'bold',
      }}

    />
  )}
/>

</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#02457a',
    height: 60,
    justifyContent: 'space-between',
    padding: 10,
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    // Add any image source or styling as per your requirement
  },
  groupTitle: {
    fontSize: 16,
    color: '#fff',
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
  searchIcon: {
    marginRight: 10,
    // Add icon source or styling as per your requirement
  },
  optionsIcon: {
    // Add icon source or styling as per your requirement
  },
  conversation: {
    flex: 1,
    backgroundColor: '#FBF9F7',
  },
  searchInputText: {
    width: 200,
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  btnModel: {
    backgroundColor: '#FFCA27',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
  btnModelText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#FFCA27',
    borderRadius: 20,
    padding: 10,
  },
  expenseText: {
    marginBottom: 10,
  },
  checkbox: {
    alignSelf: "center",
  },
});
