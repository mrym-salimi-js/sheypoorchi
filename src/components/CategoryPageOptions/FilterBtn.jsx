import { useContext } from 'react';
import { BorderRoundedBtn } from '../globals/BorderRoundedBtn';
import { Filter } from '../globals/Icons';
import { HomeContext } from '../../pages/Home';

export function FilterBtn() {
  const { setFilterFormDisplay } = useContext(HomeContext);

  const handleFilterFormDisplay = () => {
    setFilterFormDisplay('block');
  };
  return (
    <BorderRoundedBtn
      borderColor={'border-[#84105C]'}
      bgColor={'bg-[#84105C]'}
      textColor={'text-[#ffffff]'}
      lable={'فیلتر'}
      handleAction={handleFilterFormDisplay}
      icon={<Filter color={'#ffffff'} size={'size-6'} />}
    />
  );
}
