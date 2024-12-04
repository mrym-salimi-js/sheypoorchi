import { useContext } from 'react';
import { TextFiledContext } from '../text/TextComponent';

export default function SubText() {
  const { validation, adLable, subFiled } = useContext(TextFiledContext);
  return (
    <>
      {(() => {
        if (validation && validation[adLable]?.error) {
          return (
            <p className='text-[12px] text-[#fc3b3b] '>
              {validation[adLable]?.error}
            </p>
          );
        } else {
          return <p className='text-[12px] text-[#e4aac5] '>{subFiled}</p>;
        }
      })()}
    </>
  );
}
