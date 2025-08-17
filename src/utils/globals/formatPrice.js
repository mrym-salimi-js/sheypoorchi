export const formatPrice = (val, valueType) => {
  // Check valueType for being numberType input
  if (valueType !== undefined && valueType === 1) {
    //convert fa number to en number
    const faToEnMap = {
      '۰': '0',
      '۱': '1',
      '۲': '2',
      '۳': '3',
      '۴': '4',
      '۵': '5',
      '۶': '6',
      '۷': '7',
      '۸': '8',
      '۹': '9',
    };
    const enNum = val?.toString().replace(/[۰-۹]/g, (d) => faToEnMap[d]);
    // console.log(typeof enNum, enNum);
    const formated = enNum?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return formated;
  } else {
    return val;
  }
};
