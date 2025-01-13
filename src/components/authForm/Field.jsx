import { useState } from 'react';
import TextComponent from '../formFileds/text/TextComponent';
import { InVisible, Visible } from '../globals/Icons';

export default function Field({
  fieldes,
  inputRefs,
  validation,
  setValidation,
}) {
  const [passVis, setPassVis] = useState('password');

  const handlePassVisiblity = () => {
    passVis === 'password' ? setPassVis('text') : setPassVis('password');
  };
  return (
    <div className='w-[98%]  relative  right-[2%] mt-5 p-4 flex flex-col gap-6 justify-between'>
      {fieldes.map((item, index) => {
        return (
          <div className='w-full h-auto relative ' key={index}>
            <TextComponent
              index={index}
              inputRefs={inputRefs}
              label={item.label}
              filedType={'text'}
              valueType={item.label.includes('رمز') ? passVis : item.valueType}
              type={item.type}
              validation={validation}
              setValidation={setValidation}
            />
            {item.label.includes('رمز') && (
              <div
                onClick={handlePassVisiblity}
                className='w-auto h-auto cursor-pointer absolute top-3 left-1 '
              >
                {passVis === 'text' ? (
                  <InVisible color={'#cccccc'} size={'size-6'} />
                ) : (
                  <Visible color={'#cccccc'} size={'size-6'} />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
