import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListProductsScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const storedProducts = await AsyncStorage.getItem('products');
      setProducts(storedProducts ? JSON.parse(storedProducts) : []);
    };
    loadProducts();
  }, []);

  return (
    <View>
      <Text>Lista de Produtos</Text>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Text>{item.quantity} em estoque</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Adicionar Produto" onPress={() => navigation.navigate('AddProduct')} />
      <Button title="Histórico de Movimentações" onPress={() => navigation.navigate('History')} />
    </View>
  );
};

export default ListProductsScreen;
