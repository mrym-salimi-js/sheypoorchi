import { adsCategoriesList } from '../../services/adsCategoriesList';
import { adsLocationsList } from '../../services/adsLocationsList';

const firstRenderingLocsAndCatsObj = () => {
  const cats = JSON.parse(localStorage.getItem('ads_categories_list'));
  const locs = JSON.parse(localStorage.getItem('ads_locations_list'));

  !cats &&
    localStorage.setItem(
      'ads_categories_list',
      JSON.stringify(adsCategoriesList)
    );
  !locs &&
    localStorage.setItem(
      'ads_locations_list',
      JSON.stringify(adsLocationsList)
    );
};

export default firstRenderingLocsAndCatsObj;
