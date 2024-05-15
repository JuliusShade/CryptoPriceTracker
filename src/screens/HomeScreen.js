// HomeScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import fetchDataAndCombine from "../api/apiManager"; // Adjust path as necessary

const HomeScreen = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const loadCryptoData = async () => {
      const data = await fetchDataAndCombine(); // This should return the combined data
      setCryptoData(data);
    };

    loadCryptoData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => console.log("Pressed", item.symbol)} // Placeholder for navigation or other interaction
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={styles.coinImage}
        onError={(e) => console.log("Image load error:", e.nativeEvent.error)}
      />
      <View style={styles.textContainer}>
        <Text style={styles.coinName}>{item.symbol}</Text>
        <Text style={styles.coinPrice}>{`${item.price} USD`}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={cryptoData}
      renderItem={renderItem}
      keyExtractor={(item) => item.symbol}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  textContainer: {
    marginLeft: 10,
  },
  coinImage: {
    width: 50,
    height: 50,
  },
  coinName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  coinPrice: {
    fontSize: 14,
  },
});

export default HomeScreen;
