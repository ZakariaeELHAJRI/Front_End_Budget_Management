import React, { useState, useEffect, useLayoutEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { Button, Modal, TextInput, View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontAwesome5, AntDesign, SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import { collection, addDoc,getDocs, orderBy, query, onSnapshot } from 'firebase/firestore';
import { auth, database } from '../../config/firebase';
import { useNavigation } from '@react-navigation/native';
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

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
  };

  const handleCancelSearch = () => {
    setSearchText("");
    setShowSearch(false);
    setMessages([]);
  };

  useEffect(() => {
    const hideTabBar = navigation.addListener("focus", () => {
      navigation.setOptions({
        tabBarStyle: { display: "none" },
      });
    });

    return hideTabBar;
  }, [navigation]);

  const openModal = () => {
    setShowModal(true);
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

      <View style={{ flex: 1 }}>
        
        <Modal visible={showModal} onRequestClose={closeModal} transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
                style={styles.input}
              />
              <TextInput
                placeholder="Product Name"
                value={productName}
                onChangeText={setProductName}
                style={styles.input}
              /> 
              <TextInput
                placeholder="Product Price"
                value={productPrice}
                onChangeText={setProductPrice}
                keyboardType="numeric"
                style={styles.input}
              />
              <Button title="Submit" onPress={handleAddExpense} />
            </View>
          </View>
        </Modal>

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
  searchInputText: {
    width: 200,
    color: "white",
    fontSize: 16,
    marginLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  addButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  addButton: {
    width: 80,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#018abe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    height: "50%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },
  input: {
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  expenseText: {
    marginBottom: 10,
  },
});
