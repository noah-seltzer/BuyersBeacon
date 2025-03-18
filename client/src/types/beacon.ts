export interface BeaconImage {
  imageId: string;
  imageSetId: string;
  fileName: string;
  imageUrl: string;
  externalImageId: string;
  mimeType: string;
  file?: File;
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
  imageSet: ImageSet;
}

export interface Category {
  CategoryName: string;
  CategoryId: string;
}
