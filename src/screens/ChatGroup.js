import React, { useState, useEffect, useContext } from "react";
import { GiftedChat, Bubble, SystemMessage } from "react-native-gifted-chat";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign, SimpleLineIcons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { io } from 'socket.io-client';

import ModalComponent from "../components/ModelExpences";
import { AuthenticatedUserContext } from "../navigation/RootNavigator";

export default function ChatGroup({ navigation, route }) {
  const { user } = useContext(AuthenticatedUserContext);
  console.log("current user " + user.id);
  const [messages, setMessages] = useState([]);
  const { group } = route.params;
  const users = group.usersInfo;
  const token = user.token;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const socket = io('http://10.0.2.2:3000'); // Replace with your server URL

  useEffect(() => {
    console.log("current group info: ", JSON.stringify(group));
    console.log("users: ", users);

    // Fetch expenses from MongoDB database
    fetchExpenses();

    socket.on('expensesUpdated', handleExpenseAdded);

    return () => {
      socket.off('expensesUpdated', handleExpenseAdded);
    };
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3000/expense`, { headers });
      const expenses = response.data.filter((expense) => expense.Group === group._id);
      console.log("Expenses: ", expenses);

      // Convert expenses to chat messages format
      const chatMessages = expenses.map((expense) => {
        console.log("expense: ", expense);
        return {
          _id: expense._id,
          text: `expense : ${expense.description}`,
          createdAt: new Date(expense.createdAt),
          user: {
            _id: expense.paiby,
            avatar: "https://placeimg.com/140/140/any",
          },
        };
      });

      // Append the fetched chat messages to the existing messages state
      setMessages((prevMessages) => GiftedChat.append(prevMessages, chatMessages));
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleExpenseAdded = (expense) => {
    // Convert the received expense to a chat message format
    const chatMessage = {
      _id: expense._id,
      text: `expense : ${expense.description}`,
      createdAt: new Date(expense.createdAt),
      user: {
        _id: expense.paidBy,
        avatar: "https://placeimg.com/140/140/any",
      },
    };

    // Append the new chat message to the existing messages state
    setMessages((prevMessages) => GiftedChat.append(prevMessages, [chatMessage]));
  };

  const [showModal, setShowModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handelbackgroup = () => {
    navigation.navigate("Group");
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

  const openModal = () => {
    setShowModal(true);
    //setSelectedCategory(null);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAddExpense = async (expense) => {
    try {
      // Send the new expense to the server
      await axios.post('http://10.0.2.2:3000/expense', expense, { headers });

      // Emit the `expenseAdded` event to notify other clients
      socket.emit('expenseAdded', expense);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
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
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.navigate(DetailsGroup)}
      >
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={handelbackgroup}>
            <MaterialIcons
              style={styles.expenseDetails}
              name="keyboard-arrow-left"
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <Image
            style={styles.groupImage}
            source={require("../../assets/my_pic.jpeg")}
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
                placeholder="Search"
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
              <AntDesign
                name={showSearch ? "close" : "search1"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity>
            <SimpleLineIcons
              name="options-vertical"
              size={24}
              color="white"
             
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <View style={styles.conversation}>
        <ModalComponent
          showModal={showModal}
          closeModal={closeModal}
          users={users}
          selectedGroup={group}
          handleAddExpense={handleAddExpense}
        />
        <GiftedChat
          messages={messages}
          showUserAvatar={true}
          onSend={(newMessage) =>
            setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage))
          }
          user={{
            _id: user.id,
            avatar: "https://placeimg.com/140/140/any",
          }}
          renderInputToolbar={() => (
            <View style={styles.addButtonContainer}>
              <TouchableOpacity style={styles.addButton} onPress={openModal}>
                <MaterialIcons
                  name="add-shopping-cart"
                  size={30}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          )}
          renderBubble={(props) => {
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  right: {
                    backgroundColor: "#3370d4",
                  },
                  left: {
                    backgroundColor: "#ccc",
                  },
                }}
              />
            );
          }}
          renderSystemMessage={(props) => {
            return (
              <SystemMessage
                {...props}
                textStyle={{ color: "white" }}
                wrapperStyle={{ backgroundColor: "#ccc" }}
              />
            );
          }}
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
