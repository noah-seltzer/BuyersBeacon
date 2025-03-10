import { Beacon } from "@/types/beacon";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const navigateToBeaconDetailsPage = (router: AppRouterInstance, beacon: Beacon) => {
    if (!beacon.BeaconId) throw Error("Beacon Id required to navigate to beacon details page")
    router.push(`/beacons/${beacon.BeaconId}`)

}