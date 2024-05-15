// dataHelper.js
const combineData = (binanceData, cryptoCompareData, symbolMap) => {
  if (!Array.isArray(binanceData) || !cryptoCompareData) {
    console.error("Invalid data types:", { binanceData, cryptoCompareData });
    return [];
  }

  return binanceData.map((coin) => {
    const cleanedSymbol = symbolMap[coin.symbol];
    const cryptoInfo =
      cryptoCompareData[cleanedSymbol] && cryptoCompareData[cleanedSymbol].USD
        ? cryptoCompareData[cleanedSymbol].USD
        : undefined;

    const imageUrl =
      cryptoInfo && cryptoInfo.IMAGEURL
        ? `https://www.cryptocompare.com${cryptoInfo.IMAGEURL}`
        : "https://www.cryptocompare.com/media/37746251/default-coin-logo.png";

    console.log(
      `Coin: ${coin.symbol}, Cleaned Symbol: ${cleanedSymbol}, Crypto Info: `,
      cryptoInfo
    );

    return {
      symbol: coin.symbol,
      price: coin.price,
      imageUrl,
      ...cryptoInfo,
    };
  });
};

export default combineData;
