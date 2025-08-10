export const formatPrice = (val, label) => {
  if (
    label.includes('قیمت') ||
    label.includes('حداقل') ||
    label.includes('حداکثر')
  ) {
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
