export const formatPrice = (val, valueType) => {
  // Check valueType for being numberType input
  if (valueType !== undefined && valueType === 1) {
    const formated = val?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // if (formated !== undefined && formated !== '') {
    //   const faFormater = new Intl.NumberFormat('fa-IR');
    //   const num = faFormater.format(+formated);
    //   console.log(num);
    // }
    return formated;
  } else {
    return val;
  }
};
