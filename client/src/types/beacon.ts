import { User } from "@/types/user";

export interface BeaconImage {
  file: File | string;
  isCover: boolean;
}

export interface Beacon {
  title: string;
  category: string;
  description: string;
  images: BeaconImage[];
}

export interface Category {
  categoryId: string;
  categoryName: string;
}
