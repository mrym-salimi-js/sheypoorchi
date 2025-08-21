export const convertFaToEn = (val) => {
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
  return val?.toString().replace(/[۰-۹]/g, (d) => faToEnMap[d]);
};
