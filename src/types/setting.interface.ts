export interface SettingAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface SettingContactInfo {
  email: string;
  phone: string;
  whatsApp: string;
  address: SettingAddress;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
}

export interface SettingSocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  linkedin: string;
  youtube: string;
  tiktok: string;
  reddit: string;
  weChat: string;
  discord: string;
  telegram: string;
}

export interface Setting {
  _id: string;
  welcomeCreditAmount: number;
  contactInfo: SettingContactInfo;
  socialLinks: SettingSocialLinks;
}
