import { BaseModel } from './base_model'

class FriendGraphicsAreasID extends BaseModel {
    protected table: string = 'friend_graphics__areas_id'
    column = []
    areaTrans = {
        "unknown": "unknown",
        "Bali": "bali",
        "Bandung": "bandung",
        "Banjarmasin": "banjarmasin",
        "Jabodetabek": "jabodetabek",
        "Makassar": "makassar",
        "Medan": "medan",
        "Palembang": "palembang",
        "Samarinda": "samarinda",
        "Semarang": "semarang",
        "Surabaya": "surabaya",
        "Yogyakarta": "yogyakarta",
        "Lainnya": "lainnya",
    }

}

export { FriendGraphicsAreasID }