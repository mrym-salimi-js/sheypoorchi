export function getCost(attributes, setCostCallback) {
  attributes?.map((attrItem) => {
    attrItem.label === 'قیمت (تومان)' &&
      setCostCallback([{ label: 'قیمت', name: attrItem.name }]);
    attrItem.label === 'رهن (تومان)' &&
      setCostCallback([{ label: 'رهن', name: attrItem.name }]);
    attrItem.label === 'اجاره (تومان)' &&
      setCostCallback((prev) => [
        ...prev,
        { label: 'اجاره', name: attrItem.name },
      ]);
  });
}
