export enum PropertyType {
  House = 'House',
  Apartment = 'Apartment',
  Villa = 'Villa',
  Condo = 'Condo'
}

export enum ListingType {
  Buy = 'Buy',
  Rent = 'Rent'
}

export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  type: PropertyType;
  listingType: ListingType;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  agent: {
    name: string;
    phone: string;
    image: string;
  };
}