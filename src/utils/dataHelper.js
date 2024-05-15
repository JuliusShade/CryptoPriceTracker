const combineData = (binanceData, cryptoCompareData) => {
  if (!Array.isArray(binanceData) || !cryptoCompareData) {
    console.error("Invalid data types:", { binanceData, cryptoCompareData });
    return [];
  }

  return binanceData.map((coin) => {
    // Remove 'USDT' to match with CryptoCompare symbols
    const cleanSymbol = coin.symbol.replace("USDT", "");
    const cryptoInfo = cryptoCompareData[cleanSymbol]
      ? cryptoCompareData[cleanSymbol].USD
      : undefined;
    const imageUrl =
      cryptoInfo && cryptoInfo.IMAGEURL
        ? `https://www.cryptocompare.com${cryptoInfo.IMAGEURL}`
        : "https://www.cryptocompare.com/media/37746251/default-coin-logo.png";

    return {
      symbol: cleanSymbol,
      price: coin.price,
      imageUrl,
      ...cryptoInfo,
    };
  });
};

export default combineData;
