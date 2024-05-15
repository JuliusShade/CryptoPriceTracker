import axios from "axios";

const getCryptoCompareData = async (symbols, api_key) => {
  const maxSymbolsPerRequest = 50; // Adjust based on testing what works best under the limit
  const tsyms = "USD,EUR";
  const responses = [];

  // Update the regular expression to more robustly strip unwanted suffixes
  const cleanedSymbols = symbols.map((symbol) =>
    symbol.replace(
      /(USD|USDT|EUR|8USD|8USDT|USD4|USDC|DAI|BUSD|TUSD|USDP|PAX)$/,
      ""
    )
  );

  console.log("Cleaned Symbols:", cleanedSymbols); // Log the cleaned symbols for verification

  // Split symbols into chunks to manage API limits
  for (let i = 0; i < cleanedSymbols.length; i += maxSymbolsPerRequest) {
    const chunk = cleanedSymbols.slice(i, i + maxSymbolsPerRequest);
    const fsyms = chunk.join(",");
    console.log("API Call with fsyms:", fsyms); // Log the symbols being used in the API call

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${fsyms}&tsyms=${tsyms}&api_key=${api_key}`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.RAW) {
        responses.push(response.data.RAW);
      } else {
        console.error("Invalid or no data received for chunk:", chunk);
      }
    } catch (error) {
      console.error(
        "Error fetching data from CryptoCompare for chunk:",
        chunk,
        error
      );
      // Optionally, handle these errors more gracefully
    }
  }

  // Combine all responses into one object
  const combinedData = Object.assign({}, ...responses);
  return combinedData;
};

export default getCryptoCompareData;
