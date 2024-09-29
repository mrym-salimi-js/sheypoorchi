import { BorderRoundedBtn } from '../globals/BorderRoundedBtn';
import { XCircle } from '../globals/Icons';

export default function FilterItemBtn({ lable }) {
  return (
    <BorderRoundedBtn
      borderColor={'border-[#84105C]'}
      bgColor={'bg-pink-50'}
      textColor={'text-[#84105C]'}
      lable={lable}
      icon={<XCircle color={'#84105C'} size={'size-6'} />}
    />
  );
}
