import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button,TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from './Checkbox';

const ExpenseForm = ({ group, users }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [products, setProducts] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productBeneficiaries, setProductBeneficiaries] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = [
    { id: 1, title: 'Category 1', icon: 'icon1' },
    { id: 2, title: 'Category 2', icon: 'icon2' },
    { id: 3, title: 'Category 3', icon: 'icon3' },
    { id: 4, title: 'Category 4', icon: 'icon4'}
    // Add more categories as needed
  ];
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
      _id: Math.random().toString(),
      name: productName,
      price: productPrice,
      description: '',
      image: '',
      category: selectedCategory, // Add the selected category here
      members: productBeneficiaries,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setProducts((prevProducts) => [...prevProducts, product]);

    setProductName('');
    setProductPrice('');
    setProductBeneficiaries([]);

   //setShowProductModal(false); 
  };

  const handleSubmit = () => {
    const expense = {
      description,
      amount,
      idGroup: group._id,
      paiby: paidBy,
      products,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log(expense);
    console.log(productBeneficiaries);

    setDescription('');
    setAmount('');
    setPaidBy('');
    setProducts([]);
  };
const handleBackToCategory = () => {
    setSelectedCategory(null);
    //setShowProductModal(false);
    };
  return (
    <View>
      <Text>Description:</Text>
      <TextInput value={description} onChangeText={(text) => setDescription(text)} />

      <Text>Amount:</Text>
      <TextInput
        value={amount}
        onChangeText={(text) => setAmount(text)}
        keyboardType="numeric"
      />

      <Text>Paid by:</Text>
      <Picker selectedValue={paidBy} onValueChange={(value) => setPaidBy(value)}>
        <Picker.Item label="Select user" value="" />
        {group.members.map((memberId) => {
          const user = users.find((user) => user._id === memberId);
          return <Picker.Item key={user._id} label={user.name} value={user._id} />;
        })}
      </Picker>

      <Text>Products:</Text>
      {products.map((product) => (
        <Text key={product._id}>{product.name}</Text>
      ))}
      <Button title="Add Product" onPress={handleAddProduct} />

      <Button onPress={handleSubmit} title="Add Expense" />

      <Modal visible={showProductModal} transparent>
      <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
      {selectedCategory === null ? (
              <View style={styles.categoryContainer}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryCard,
                      selectedCategory === category.id && styles.selectedCategoryCard,
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    {/* Render the category icon and title */}
                    <Text>{category.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
        <View>
          <Text>Product Name:</Text>
          <TextInput value={productName} onChangeText={(text) => setProductName(text)} />
          {console.log('product is ', products)}
          <Text>Product Price:</Text>
          <TextInput
            value={productPrice}
            onChangeText={(text) => setProductPrice(text)}
            keyboardType="numeric"
          />

          <Text>Beneficiaries:</Text>
          {group.members.map((memberId) => {
            const user = users.find((user) => user._id === memberId);
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
                      console.log('user includes :', productBeneficiaries);
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

            <Button title="Add Product" onPress={handleAddProductSubmit} />
          <Button title="Back to Categorys" onPress={handleBackToCategory} />
          <Button title="Finish" onPress={() => setShowProductModal(false)} />
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
