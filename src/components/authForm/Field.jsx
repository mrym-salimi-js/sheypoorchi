import TextComponent from '../formFileds/text/TextComponent';

export default function Field({
  fieldes,
  inputRefs,
  validation,
  setValidation,
}) {
  return (
    <div className='w-[98%]  relative  right-[2%] mt-5 p-4 flex flex-col gap-6 justify-between'>
      {fieldes.map((item, index) => {
        return (
          <TextComponent
            key={index}
            index={index}
            inputRefs={inputRefs}
            label={item.label}
            filedType={'text'}
            valueType={item.valueType}
            type={item.type}
            validation={validation}
            setValidation={setValidation}
          />
        );
      })}
    </div>
  );
}
