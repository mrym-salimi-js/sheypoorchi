
import supabase from "./supabase";

export const getAds = async () => {
    let { data, error } = await supabase
        .from('ads_list')
        .select('attributes,created_at, id, location, photo, title')
        .order('id')
    if (error) {
        throw new Error('خطا در ردیافت اطلاعات')
    }
    return data
}

