import supabase from "./supabase";

export async function getAd(id) {

    let { data, error } = await supabase
        .from('ads_list')
        .select('attributes, category, created_at, description, id, location,coordinate, photo, title, userType')
        .eq('id', id)
    if (error) {
        throw new Error('خطا در دریافت اطلاعات')
    }
    return data
}