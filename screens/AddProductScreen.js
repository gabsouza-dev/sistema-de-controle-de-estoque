import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddProductScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  const addProduct = async () => {
    const newProduct = { id: Date.now(), name, quantity: parseInt(quantity) };
    const storedProducts = await AsyncStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : [];
    products.push(newProduct);
    await AsyncStorage.setItem('products', JSON.stringify(products));
    navigation.goBack();
  };

  return (
    <View>
      <Text>Adicionar Produto</Text>
      <TextInput
        placeholder="Nome do Produto"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
      />
      <Button title="Salvar Produto" onPress={addProduct} />
    </View>
  );
};

export default AddProductScreen;
