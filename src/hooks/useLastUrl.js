import { useEffect } from 'react';
import { useMainCats } from './useMainCats';

export const useLastUrl = (locationUrl, category) => {
  const mainCat = useMainCats();
  useEffect(() => {
    localStorage.setItem('last-url-pathname', locationUrl.pathname);
    localStorage.setItem('last-url-search', locationUrl.search);

    // Set Title For Metatag
    if (!locationUrl.pathname.includes('/s/iran')) return;
    if (!category) {
      document.title = 'شیپورچی مرجع نیازمندی های سرتاسر ایران';
    } else {
      const currentCat = mainCat?.find((item) => {
        return item.slug === category;
      });

      currentCat !== undefined &&
        (document.title = `اگهی های مربوط یه ${currentCat?.name}`);
    }
  }, [locationUrl]);
};
