"use client";
import { useGetBeaconQuery } from "@/redux/api";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "next-themes";
import BeaconDetailsPageTemplate from "@/components/templates/beacon-deatails.template";

const BeaconDetailsPage = () => {
    const path = usePathname();
    const router = useRouter();
    const [beaconId, setBeaconId] = useState<string | undefined>(undefined);
    const { data: beacon, error, isLoading } = useGetBeaconQuery(beaconId ?? "", {
        skip: !beaconId,
    });

    useEffect(() => {
        const pathArr = path.split("/");
        if (pathArr.length < 3) {
            toast("Id not found.", {
                type: "error",
            });
            router.back();
            return;
        }

        setBeaconId(pathArr[2]);
    }, [path]);


    console.log("BEACON", beacon)

    return <BeaconDetailsPageTemplate
        beacon={beacon}
        isLoading={isLoading}
    />;
};

export default BeaconDetailsPage;
