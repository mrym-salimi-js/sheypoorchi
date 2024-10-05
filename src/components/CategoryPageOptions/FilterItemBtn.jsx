import { useContext } from 'react';
import { BorderRoundedBtn } from '../globals/BorderRoundedBtn';
import { XCircle } from '../globals/Icons';
import { HomeContext } from '../../pages/Home';

export default function FilterItemBtn({ lable, slug }) {
  const { locationUrl, navigateTo } = useContext(HomeContext);

  const split = slug.split('/');

  const handleDisplaySlug = () => {
    const searchItems = new URLSearchParams(locationUrl.search);

    if (split.length > 1) {
      navigateTo({
        pathname: `/s/iran/${split[0]}`,
        search: searchItems.toString(),
      });
    } else {
      slug && searchItems.delete(slug);
      navigateTo({
        pathname: locationUrl.pathname,
        search: searchItems.toString(),
      });
    }
  };

  return (
    <BorderRoundedBtn
      borderColor={'border-[#84105C]'}
      bgColor={'bg-pink-50'}
      textColor={'text-[#84105C]'}
      lable={lable}
      icon={
        <XCircle
          handleDisplaySlug={handleDisplaySlug}
          color={'#84105C'}
          size={'size-6'}
        />
      }
    />
  );
}
