import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EvilIcons ,SimpleLineIcons,AntDesign ,MaterialCommunityIcons ,MaterialIcons ,Ionicons } from '@expo/vector-icons';


const ExpenseCard = ({ icon, name, date, amount, color }) => {

        return (
          <View style={styles.card}>
            <View style={styles.expenseInfo}>
              <View style={[styles.circle, { backgroundColor: color }]}>
                <MaterialCommunityIcons name={icon} size={32} color="white"  />
              </View>
              <Text style={styles.expenseName}>{name}</Text>
              <Text style={styles.expenseDate}>{date}</Text>
            </View>
            <View style={styles.rightHeader}>
            <Text style={styles.expenseAmount}>{amount}  </Text>
           <MaterialIcons style={styles.expenseDetails} name="keyboard-arrow-right" size={24} color="black" />
           </View>
          </View>
        );
      };
const styles = StyleSheet.create({
  
    list: {
        marginTop: 5,
        marginHorizontal: 20,
        
      },
      card: {
        flexDirection: 'row',
           alignItems: 'center',
           justifyContent: 'space-between',
           padding: 8,
           borderRadius: 10,
              shadowColor: '#000',
              shadowOpacity: 0.9,
              shadowOffset: {
                width: 10,
                height: 10,
              },
           marginBottom: 5,
            backgroundColor: '#FBF9F7', 
            borderBottomWidth: 1,
            borderBottomColor: '#E5E5E5',
         },
         expenseInfo: {
           flexDirection: 'row',
           alignItems: 'center',
           
         },
         expenseName: {
            color: '#001b48',
            fontWeight: 'bold',
           marginLeft: 8,
           marginRight: 8,
           fontSize: 16,
         },
         expenseDate: {
           fontSize: 12,
           color: '#000',
         },
         expenseAmount: {
           fontSize: 18,
           color: '#001b48',
         },
          expenseDetails: {
            right: 0,
            color: '#d1d7db',
          },
          // New styles
        circle: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 1,
        borderRadius: 25,
      },
      image: {
        width: '100%',
        height: '100%',
      },
      rightHeader: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    });
export default ExpenseCard;

