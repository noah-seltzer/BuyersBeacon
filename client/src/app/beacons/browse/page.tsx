'use client'
import { useGetBeaconsQuery } from "@/redux/api"
import { FC, useEffect, useState } from "react"
import { Beacon } from "@/types/beacon"
import { Image, MapPin } from "lucide-react"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import SearchBar from "@/components/molecules/search-bar";

const BeaconThumbnail: FC<{ beacon: Beacon }> = ({ beacon }) => {
    return <Link href={`/beacons/${beacon.BeaconId}`}>
        <Card className="p-4 flex flex-col flex-nowrap ">
            {beacon.imageSet ? (
                <img src={beacon.imageSet.images[0].imageUrl} alt="Loaded from API" style={{ maxHeight: "auto", maxWidth: "128px" }} />
            ) : (
                <Image className="w-32 h-32 mb-4" />
            )}
            <p className="font-bold">{beacon.ItemName}</p>
            <div className="text-xs">
                <p>{beacon.Category?.CategoryName}</p>
                <p>{beacon.ItemDescription}</p>
                <div className="w-full flex flex-row items-center justify-between">
                    <p className="text-primary text-base">${beacon.ItemPrice ?? "DEMO"}</p>
                    <div className="flex flex-row items-center gap-1">
                        <MapPin className="w-4" />
                        Location
                    </div>
                </div>
            </div>
        </Card>
    </Link>
}

const BrowseBeaconsPage: FC = () => {
    const { data: beacons } = useGetBeaconsQuery();
    
    const [searchResults, setSearchResults] = useState(beacons);

    const handleSearchResults = (results) => {
        setSearchResults(results); 
        console.log(results);
        console.log(searchResults);
    };

    return <div className='w-3/4 mx-auto'>
        <SearchBar onSearchResults={handleSearchResults}/>

        <h1 className="text-5xl mt-8 font-bold text-primary">Vancouver Beacons</h1>
        {searchResults && <p className="text-tertiary text-lg text-bold mt-2 mb-8">{searchResults.length} Beacons</p>}

        <Card className="flex p-6 mx-auto flex-row gap-8 justify-start" >
            {
                searchResults && searchResults.map(element => <BeaconThumbnail key={element.BeaconId} beacon={element} />)
            }
        </Card>
    </div>

}

export default BrowseBeaconsPage