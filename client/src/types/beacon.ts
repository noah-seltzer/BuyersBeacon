import { User } from "@/types/user";

export interface BeaconImage {
  imageId: string,
  fileName: string,
  imageUrl: string,
  externalImageId: string
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
  ItemPrice?: number
  imageSet: {
    images: BeaconImage[]
  } 
}

export interface Category {
  CategoryName: string;
  CategoryId: string;
}
