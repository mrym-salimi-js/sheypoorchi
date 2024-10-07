import moment from 'moment'
import axios from "axios"

export async function getDifferDate(created_at, setDateCallback) {
    const timeAgo = moment(created_at).fromNow()

    const translateLocationName = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&ie=UTF-8&oe=UTF-8&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&dt=at&sl=en&tl=fa&hl=hl&q=${timeAgo}`)

    setDateCallback(translateLocationName.data[0][0][0])
}