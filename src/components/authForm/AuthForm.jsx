import { Logo } from '../header/Logo';
import Header from './Header';
import AuthRoundedBtn from '../globals/AuthRoundedBtn';
import OtherLink from './OtherLink';
import Field from './Field';
export default function AuthForm({
  headerLabel,
  fieldes,
  inputRefs,
  validation,
  setValidation,
  handleBtn,
  loading,
  otherLink,
  btnLabel,
  passVis,
  setPassVis,
}) {
  return (
    <div className='w-full h-full absolute flex justify-center items-center'>
      <div className='w-[90%]  md:w-[52%] lg:w-[58%] xl:w-[35%] flex flex-col gap-10 items-center  rounded-[2rem]  '>
        {/* Logo */}
        <div className='w-auto h-auto p-3 flex rounded-3xl'>
          <Logo
            color={'#84105C'}
            size={'size-10'}
            textStyle={'text-black text-2xl'}
          />
        </div>

        <div className='w-full flex flex-col'>
          {/*  Header */}
          <Header label={headerLabel} />
          {/*  Fileds */}
          <Field
            fieldes={fieldes}
            inputRefs={inputRefs}
            setValidation={setValidation}
            validation={validation}
            passVis={passVis}
            setPassVis={setPassVis}
          />
          {/*Footer */}
          <div className='w-full p-2 mt-2 flex justify-between items-start'>
            {/* Other Link */}
            <OtherLink otherLink={otherLink} />
            {/* Submit Btn */}
            <AuthRoundedBtn
              label={btnLabel}
              handleBtn={handleBtn}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
