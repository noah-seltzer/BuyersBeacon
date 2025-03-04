import { User } from "@/types/user";

export interface BeaconImage {
  file: File | string;
  isCover: boolean;
}

export interface Beacon {
  Category?: Category;
  BeaconId?: string;
  ItemName: string;
  CategoryId: string;
  ItemDescription: string;
  Images: BeaconImage[];
}

export interface Category {
  CategoryName: string;
  CategoryId: string;
}
