import { User } from "@/types/user"

export interface Beacon {
    beaconId: string,
    dateCreate: Date,
    dateUpdate: Date,
    itemName: string,
    itemDescription: string,
    itemPrice: number,
    locCity: string,
    locRegion: string,
    locCountry: string,
    locPostal_code: string,
    contactEmail: string,
    contactPhone: string,
    category: Category,
    user: User
}

export interface Category {
    category_id: string
    category_name: string
}