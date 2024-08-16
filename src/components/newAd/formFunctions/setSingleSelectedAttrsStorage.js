export function setSingleSelectedAttrsStorage(setStorageCallback, item, storagePram, setOpenList) {
    storagePram !== "location" &&
        (item.attributes !== undefined ?

            item.attributes.forEach(attrItem => {

                (
                    (attrItem.order == 0 && attrItem.type != 7 || attrItem.isSeparated) &&

                    setStorageCallback(prev => ({
                        ...prev, [`${attrItem.id}`]: attrItem.options.length > 0 ? { "id": '', "title": attrItem.title, "lable": '', "options": attrItem.options, "type": attrItem.type }
                            :
                            ""
                    })))
            })

            :

            (setStorageCallback(prev => ({
                ...prev,
                [`${storagePram}`]:
                {
                    ...prev[storagePram], lable: item.name, id: item.id
                }

            })),
                setOpenList(false)))

}