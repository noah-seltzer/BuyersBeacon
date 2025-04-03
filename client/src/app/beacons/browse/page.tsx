"use client";

import { Suspense } from "react";
import BrowseBeaconsPage from "@/components/organisms/beacons/browse-beacon-page";


const Browse: FC = () => <Suspense>
  <BrowseBeaconsPage />
</Suspense>

export default Browse;
