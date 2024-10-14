import supabase from './supabase';

export async function insertNewAd(
  photo,
  category,
  attributes,
  adTitle,
  adDesc,
  location,
  coordinate,
  userType
) {
  const { data, error } = await supabase
    .from('ads_list')
    .insert([
      {
        title: adTitle,
        description: adDesc,
        photo: photo,
        category: category,
        location: location,
        coordinate: coordinate,
        attributes: attributes,
        userType: userType,
        user_id: 1,
      },
    ])
    .select();

  if (error) {
    throw new Error('خطا در ازسال اطلاعات');
  }
  return data;
}
