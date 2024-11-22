export function getCost(attributes, setCostCallback) {
  attributes?.map((attrItem) => {
    attrItem.name === 'قیمت (تومان)' &&
      setCostCallback([{ name: 'قیمت', lable: attrItem.lable }]);
    attrItem.name === 'رهن (تومان)' &&
      setCostCallback([{ name: 'رهن', lable: attrItem.lable }]);
    attrItem.name === 'اجاره (تومان)' &&
      setCostCallback((prev) => [
        ...prev,
        { name: 'اجاره', lable: attrItem.lable },
      ]);
  });
}
