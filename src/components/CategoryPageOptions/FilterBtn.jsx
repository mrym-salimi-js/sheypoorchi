import { BorderRoundedBtn } from '../globals/BorderRoundedBtn';
import { Filter } from '../globals/Icons';

export function FilterBtn({ setFilterFormDisplay }) {
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
