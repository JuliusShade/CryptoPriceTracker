import axios from "axios";

const getBinanceData = async () => {
  const url = "https://api.binance.us/api/v3/ticker/price";
  try {
    const response = await axios.get(url);
    if (!response.data) throw new Error("No data received from Binance");
    // Filter to include only USDT pairs
    const filteredData = response.data.filter((coin) =>
      coin.symbol.endsWith("USDT")
    );
    return filteredData;
  } catch (error) {
    console.error("Error fetching data from Binance:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

export default getBinanceData;
