import { SAMPLE_BEACONS } from "../../data/beacons-data"


const BeaconPage: React.FC = () => {
    
    return <div className="columns-4">
        {
            SAMPLE_BEACONS.map(beacon => <div>{beacon.item_name}</div>)
        }

    </div>
    return SAMPLE_BEACONS.map(beacon => {
        return <div>
            <ul>

            </ul>
        </div>
    })
}

export default BeaconPage