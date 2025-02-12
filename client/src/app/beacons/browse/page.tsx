'use client'
import { useGetBeaconsQuery } from "@/redux/api"
import { FC, useEffect } from "react"
import { Beacon } from "@/types/beacon"
import { Image, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"


const BeaconThumbnail: FC<{beacon: Beacon}> = ({beacon}) => {
    return <Card className="p-4 flex flex-col flex-nowrap ">
        <Image className="w-32 h-32 mb-4" />
        <p className="font-bold">{beacon.itemName}</p>
        <div className="text-xs">
            <p>category</p>
            <p>{beacon.itemDescription}</p>
            <div className="w-full flex flex-row items-center justify-between">
                <p className="text-primary text-base">${beacon.itemPrice}</p>
                <div className="flex flex-row items-center gap-1">
                    <MapPin className="w-4" />
                    Location
                    </div>
            </div>
        </div>

    </Card>

}

const BrowseBeaconsPage: FC = () => {
    const { data: beacons, isLoading: beaconsLoading, error: beaconError } = useGetBeaconsQuery()

    return <div className='w-3/4 mx-auto'>

        <div className='container px-4 pt-6 text-center items-center justify-center bg-gray-600 h-auto'>
            <div>Search goes here</div>
        </div>
        
        <h1 className="text-5xl mt-8 font-bold text-primary">Vancouver Beacons</h1>
        {beacons && <p className="text-tertiary text-lg text-bold mt-2 mb-8">{beacons.length} Beacons</p>}

        <Card className="flex p-6 mx-auto flex-row gap-8 justify-start">
        {
            beacons && beacons.map(element => <BeaconThumbnail key={element.beaconId} beacon={element} />)
        }    
        </Card>
    </div>

}

export default BrowseBeaconsPage