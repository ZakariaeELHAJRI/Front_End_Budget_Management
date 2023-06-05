import React from 'react';
import { Modal, View, TouchableOpacity, Text ,StyleSheet } from 'react-native';
import ExpenseForm from "../components/ExpenseForm";
const ModalComponent = ({ showModal, closeModal, users, selectedGroup, handleAddExpense }) => {
    return (
      <Modal visible={showModal} onRequestClose={closeModal} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <ExpenseForm group={selectedGroup} users={users} />
  
              <TouchableOpacity style={styles.btnModel} onPress={handleAddExpense}>
                <Text style={styles.btnModelText}>Submit</Text>
              </TouchableOpacity>
  
            </View>
            <TouchableOpacity style={styles.btnModel} onPress={closeModal}>
              <Text style={styles.btnModelText}>Close</Text>
            </TouchableOpacity>
  
          </View>
        </View>
      </Modal>
    );
  };
  
  export default ModalComponent;
const styles = StyleSheet.create({
modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position : 'absolute',
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
  },
  categoryContainer: {
    position: 'relative',
    marginBottom: 20,
    flexDirection: 'column',
  },
  categoryCard: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
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