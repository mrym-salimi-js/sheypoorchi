import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Header } from '../components/header/Header';
import { NewAdForm } from '../components/newAd/NewAdForm';
import { createContext } from 'react';

export const NewAdContext = createContext();
export default function NewAd() {
  const navigateTo = useNavigate();
  return (
    <NewAdContext.Provider value={{ navigateTo }}>
      <div className='w-[85%] h-full relative flex flex-col gap-6 items-center mb-14  p-2'>
        <Header />
        <NewAdForm />
      </div>
      <NavBar />
    </NewAdContext.Provider>
  );
}
