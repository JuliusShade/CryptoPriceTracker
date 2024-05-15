// apiManager.js
import axios from "axios";
import getBinanceData from "./binanceApi"; // Adjust path as necessary
import getCryptoCompareData from "./cryptoCompareApi"; // Adjust path as necessary
import combineData from "../utils/dataHelper"; // Adjust path as necessary

const API_KEY = process.env.API_KEY; // Your CryptoCompare API key

const fetchDataAndCombine = async () => {
  try {
    const binanceData = await getBinanceData();
    // Extract symbols and clean them for CryptoCompare compatibility
    const symbols = binanceData.map((item) =>
      item.symbol.replace(/USD$|USDT$/, "")
    );

    const uniqueSymbols = Array.from(new Set(symbols)); // Remove duplicates
    const cryptoCompareData = await getCryptoCompareData(
      uniqueSymbols,
      API_KEY
    );

    // Create a map for quick lookup of cleaned symbols
    const symbolMap = binanceData.reduce((acc, item) => {
      acc[item.symbol] = item.symbol.replace(/USD$|USDT$/, "");
      return acc;
    }, {});

    return combineData(binanceData, cryptoCompareData, symbolMap);
  } catch (error) {
    console.error("Error fetching or combining data:", error);
    return [];
  }
};

export default fetchDataAndCombine;
