export type HomeCategory = {
  id: string;
  name: string;
  iconUrl: string;
};

export type CategoryListResponse = {
  data?: {
    _id: string;
    name: string;
    iconUrl?: string;
  }[];
};
