import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from './Checkbox';
import axios from 'axios';
import { AuthenticatedUserContext } from '../navigation/RootNavigator';
import { set } from 'react-native-reanimated';

const ExpenseForm = ({ group, users }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState();
  const [paidBy, setPaidBy] = useState('');
  const [products, setProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState();
  const [productBeneficiaries, setProductBeneficiaries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [descptionPrd, setDescptionPrd] = useState('');
  const [expense, setExpense] = useState('');

  const { user } = useContext(AuthenticatedUserContext);
  const token = user.token;
  const userId = user.id;
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    fetchCategories();
    console.log('group selected expense', group);
    console.log('all users **********************', users);
    console.log('all categories after **********************', categories);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3000/expensetype/', { headers });
      console.log('all categories before **********************', response.data);
      setCategories(response.data.expenetype);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('Updated productBeneficiaries:', productBeneficiaries);
    console.log('back to list category:', selectedCategory);
  }, [productBeneficiaries, selectedCategory]);

  const handleAddProduct = () => {
    setShowProductModal(true);
    setSelectedCategory(null);
  };

  const handleAddProductSubmit = () => {
    const product = {
      name: productName,
      price: productPrice,
      description: descptionPrd,
      image: '',
      category: selectedCategory,
      members: productBeneficiaries,
    };

    setProducts((prevProducts) => [...prevProducts, product]);

    setProductName('');
    setProductPrice('');
    setDescptionPrd('');
    setProductBeneficiaries([]);
  };

  const handleAddExpense = async (data) => {
    try {
      console.log('expense to add', data);
      const response = await axios.post('http://10.0.2.2:3000/service/createExpenseWithProducts', data, { headers });
      console.log('expense added', response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    const expenseData = {
      description,
      amount,
      Group: group._id,
      paiby: user.id,
      products,
    };

    console.log("expense  details =========+> : "+JSON.stringify(expenseData));
    setExpense(expenseData);

    if (description === '' || amount === '' || products.length === 0) {
      console.log('Please fill all the fields');
    } else {
       handleAddExpense(expenseData);
      console.log('expense added', expenseData);
    }
    console.log(productBeneficiaries);

    setDescription('');
    setAmount();
    setPaidBy('');
    setProducts([]);
  };
  handelCancelCategory = () => {  
    setSelectedCategory(null);
    setShowProductModal(false);
    };
const handleBackToCategory = () => {
    setSelectedCategory(null);
    //setShowProductModal(false);
    };
  return (
    <View>
      <Text>Description:</Text>
      <TextInput style={styles.input} value={description} onChangeText={(text) => setDescription(text)} />

      <Text>Amount:</Text>
      <TextInput style={styles.input}
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
      />

      {/* <Text>Paid by:</Text>
    
       <Picker selectedValue={paidBy} onValueChange={(value) => setPaidBy(value)}>
      <Picker.Item label="Select user" value="" />
      {users.map((user) => (
        <Picker.Item key={user._id} label={user.name} value={user._id} />
      ))}
    </Picker>
    */} 

      <Text>Products:</Text>
      {products.map((product) => (
        <Text key={product._id}>{product.name}</Text>
      ))}
      <TouchableOpacity onPress={handleAddProduct}  style={styles.btnModel}>
      <Text style={styles.btnModelText}>Add Product</Text>
      </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit}  style={styles.btnModel}>
        <Text style={styles.btnModelText}>Add Expences</Text>
      </TouchableOpacity>

      <Modal visible={showProductModal} transparent>
      <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
      {selectedCategory === null ? (
              <View style={styles.categoryContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category._id}
                    style={[
                      styles.categoryCard,
                      selectedCategory === category._id && styles.selectedCategoryCard,
                    ]}
                    onPress={() => setSelectedCategory(category._id)}
                  >
                    {/* Render the category icon and title */}
                    <Text>{category.name}</Text>
                  </TouchableOpacity>
                ))}
                  <TouchableOpacity onPress={handelCancelCategory}  style={styles.btnModel}>
                <Text style={styles.btnModelText}>Cancel</Text>
              </TouchableOpacity>
              </View>
            ) : (
        <View>
          <Text>Product Name:</Text>
          <TextInput style={styles.input} value={productName} onChangeText={(text) => setProductName(text)} />
          {console.log('product is ', products)}
          <Text>Product Price:</Text>
          <TextInput
          style={styles.input}
            value={productPrice}
            onChangeText={(text) => setProductPrice(text)}
            keyboardType="numeric"
          />
          <Text>Product Description:</Text>
          <TextInput style={styles.input} value={descptionPrd} onChangeText={(text) => setDescptionPrd(text)} />

          <Text>Beneficiaries:</Text>
        {users.map((user) => {
            return (
              <Checkbox
                key={user._id}
                title={user.name}
                isChecked={productBeneficiaries.includes(user._id)}
                onPress={(isChecked) => {
                  setProductBeneficiaries((prev) => {
                    if (isChecked) {
                      const updatedBeneficiaries = [...prev, user._id];
                      console.log('user includes:', updatedBeneficiaries);
                      console.log('user includes:', productBeneficiaries);
                      return updatedBeneficiaries;
                    } else {
                      const updatedBeneficiaries = prev.filter((id) => id !== user._id);
                      console.log('user includes - excludes:', updatedBeneficiaries);
                      return updatedBeneficiaries;
                    }
                  });
                }}
              />
            );
          })}
          
       <TouchableOpacity onPress={handleAddProductSubmit}  style={styles.btnModel}>
      <Text style={styles.btnModelText}>Add Product</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBackToCategory}  style={styles.btnModel}>
      <Text style={styles.btnModelText}>Back to Categorys</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowProductModal(false)} style={styles.btnModel}>
      <Text style={styles.btnModelText}>Finish</Text>
      </TouchableOpacity>
          
        </View>
        )}
        </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExpenseForm;
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
        btnModel: {
        backgroundColor: '#f57c00',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        },
        btnModelText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        },
        selectedCategoryCard: {
        backgroundColor: '#f57c00',
        },
        });
