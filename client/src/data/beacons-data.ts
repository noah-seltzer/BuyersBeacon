import { Beacon, Category } from "@/types/beacon";

const AUTOMOTIVE: Category = {
    category_name: 'Automotive',
    category_id: '1'
}

const LUXURY: Category = {
    category_name: 'Luxury',
    category_id: '2'
}

const now = new Date()

export const SAMPLE_BEACONS: Beacon[] = [
    {
        beacon_id: '1',
        category: LUXURY,
        contact_email: 'ryan@gmail.com',
        contact_phone: '7785555454',
        date_create: now,
        date_update: now,
        item_descrip: 'Looking for a YSL Kate shoulder bag in black',
        item_name: 'YSL Kate bag Black',
        item_price: 2000,
        loc_city: 'Vancouver',
        loc_country: 'Canada',
        loc_postal_code: 'V66868',
        loc_region: 'Mount Pleasant',
        user: {
            clerk_user_id: '1',
            id: '1'
        }
    },

    {
        beacon_id: '2',
        category: AUTOMOTIVE,
        contact_email: 'noah@gmail.com',
        contact_phone: '7785555454',
        date_create: now,
        date_update: now,
        item_descrip: 'Looking for side skirts kit for a mitsubishi lancer',
        item_name: 'lancer side skirts',
        item_price: 2000,
        loc_city: 'Surrey',
        loc_country: 'Canada',
        loc_postal_code: 'V92368',
        loc_region: 'Guilford',
        user: {
            clerk_user_id: '2',
            id: '2'
        }
    },

    {
        beacon_id: '3',
        category: AUTOMOTIVE,
        contact_email: 'cadan@gmail.com',
        contact_phone: '7785555454',
        date_create: now,
        date_update: now,
        item_descrip: 'Looking for side skirts kit for a mitsubishi lancer',
        item_name: 'lancer side skirts',
        item_price: 2000,
        loc_city: 'Surrey',
        loc_country: 'Canada',
        loc_postal_code: 'V92368',
        loc_region: 'Guilford',
        user: {
            clerk_user_id: '3',
            id: '3'
        }
    }
]