const manageCostInForm = (array, id) => {
  // console.log('del');
  const index = array.findIndex((obj) => {
    return +obj.id == id;
  });

  if (index !== -1) {
    array.splice(index, 1);
  }
};

export default manageCostInForm;
