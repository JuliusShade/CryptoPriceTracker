import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";

const HomeScreen = ({ navigation }) => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.us/api/v3/ticker/price"
        );
        const data = response.data.map((item) => ({
          id: item.symbol,
          name: item.symbol,
          price: item.price,
        }));
        setCryptos(data);
      } catch (error) {
        console.error("Error fetching data from Binance", error);
      }
    };

    fetchData();
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("Details", { coinId: item.id })}
    >
      <Text style={styles.itemText}>
        {item.name} - ${item.price}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cryptos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  itemText: {
    fontSize: 18,
  },
});

export default HomeScreen;
