import { useContext } from 'react';
import { BorderRoundedBtn } from '../globals/BorderRoundedBtn';
import { Filter } from '../globals/Icons';
import { CategoryPageContext } from '../../components/CategoryPageDetails';

export function FilterBtn() {
  const { setFilterFormDisplay } = useContext(CategoryPageContext);

  const handleFilterFormDisplay = () => {
    setFilterFormDisplay('opacity-100 visible');
  };
  return (
    <BorderRoundedBtn
      borderColor={'border-[#84105C]'}
      bgColor={'bg-[#84105C]'}
      textColor={'text-[#ffffff]'}
      label={'فیلتر'}
      handleAction={handleFilterFormDisplay}
      icon={<Filter color={'#ffffff'} size={'size-6'} />}
    />
  );
}
