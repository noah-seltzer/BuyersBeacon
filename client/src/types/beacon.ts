import { User } from "@/types/user";

export interface BeaconImage {
  imageId?: string;
  fileName?: string;
  imageUrl?: string;
  externalImageId?: string;
  file?: File | string;
  isCover?: boolean;
}

export interface Beacon {
  Category?: Category;
  BeaconId?: string;
  ItemName: string;
  CategoryId?: string;
  ItemDescription: string;
  Images: BeaconImage[];
  ItemPrice?: number;
  IsDraft?: boolean;
  LastDraftSave?: string;
  LocCity?: string;
  LocRegion?: string;
  LocCountry?: string;
  LocPostalCode?: string;
  imageSet: {
    images: BeaconImage[];
  };
}

export interface Category {
  CategoryName: string;
  CategoryId: string;
}
