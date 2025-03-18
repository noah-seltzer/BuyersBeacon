import { Beacon } from "@/types/beacon";

export const createBeaconFormdata = (beacon: Beacon) => {
    var formData = new FormData()
    formData.append('ItemName', beacon.ItemName || 'Draft')
    formData.append(
        'ItemDescription',
        beacon.ItemDescription || 'Description'
    )
    if (beacon.CategoryId) {
        formData.append('CategoryId', beacon.CategoryId)
    }
    formData.append(
        'UserId',
        'D11FAABB-2B72-4E25-88B5-1B9AD7B8A530'
    )

    // Add price and location fields
    formData.append('ItemPrice', beacon.ItemPrice ? beacon.ItemPrice.toString() : '0')

    if (beacon.LocCity) {
        formData.append('LocCity', beacon.LocCity)
    }
    if (beacon.LocRegion) {
        formData.append('LocRegion', beacon.LocRegion)
    }
    if (beacon.LocCountry) {
        formData.append('LocCountry', beacon.LocCountry)
    }
    if (beacon.LocPostalCode) {
        formData.append('LocPostalCode', beacon.LocPostalCode)
    }

    if (beacon.Images?.length > 0) {
        beacon.Images.forEach((image) => {
            if (image.file instanceof File) {
                formData.append('Images', image.file)
            }
        })
    }

    formData.append('IsDraft', beacon.IsDraft ? 'false' : 'true')
    return formData
}