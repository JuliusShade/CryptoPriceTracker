import axios from "axios";

const baseURL = "https://api.coingecko.com/api/v3";

export const fetchCryptoPrices = async () => {
  try {
    const response = await axios.get(`${baseURL}coins/markets`, {
      params: {
        vs_currency: "usd",
        ids: "bitcoin,ethereum", // Add more coin IDs as needed
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto prices", error);
    return [];
  }
};
