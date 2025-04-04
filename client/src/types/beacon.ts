import { User } from "@/types/user";
export interface BeaconImage {
  imageId?: string;
  imageSetId?: string;
  fileName?: string;
  imageUrl?: string;
  externalImageId?: string;
  mimeType?: string;
  // file can be a File object (for new uploads) or string (for existing images)
  file?: File | string;
}

export interface ImageSet {
  imageSetId?: string;
  images?: BeaconImage[];
  beaconId?: string;
}

export interface Beacon {
  Category?: Category;
  BeaconId?: string;
  UserId?: string;
  User?: User;
  ItemName: string;
  CategoryId?: string;
  ItemDescription: string;
  ItemPrice: number;
  Images: BeaconImage[];
  IsDraft?: boolean;
  LastDraftSave?: string;
  LocCity?: string;
  LocRegion?: string;
  LocCountry?: string;
  LocPostalCode?: string;
  imageSet?: ImageSet;
};


export interface Category {
  CategoryName: string;
  CategoryId: string;
}
