import { Property, PropertyType, ListingType } from './types';

export const PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Luxury Villa in Juhu',
    price: 125000000,
    address: 'Plot 45, Juhu Tara Road, Mumbai, Maharashtra',
    beds: 5,
    baths: 4,
    sqft: 4500,
    type: PropertyType.Villa,
    listingType: ListingType.Buy,
    image: 'https://picsum.photos/id/122/800/600',
    gallery: ['https://picsum.photos/id/122/800/600', 'https://picsum.photos/id/123/800/600', 'https://picsum.photos/id/124/800/600'],
    description: 'Experience the epitome of luxury living in this stunning modern villa. Featuring floor-to-ceiling windows, a private infinity pool, and a state-of-the-art smart home system.',
    features: ['Pool', 'Smart Home', 'Garage', 'Garden', 'Security System'],
    agent: {
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      image: 'https://picsum.photos/id/64/100/100'
    }
  },
  {
    id: '2',
    title: 'Premium Apartment in Cyber City',
    price: 45000,
    address: 'Tower B, DLF Cyber City, Gurgaon, Haryana',
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: PropertyType.Apartment,
    listingType: ListingType.Rent,
    image: 'https://picsum.photos/id/129/800/600',
    gallery: ['https://picsum.photos/id/129/800/600', 'https://picsum.photos/id/130/800/600', 'https://picsum.photos/id/131/800/600'],
    description: 'A stylish modern apartment in the heart of Cyber City. High ceilings, contemporary interiors, and easy access to the best restaurants and corporate offices.',
    features: ['Gym Access', 'Concierge', 'Rooftop Garden', 'Pet Friendly'],
    agent: {
      name: 'Rajesh Kumar',
      phone: '+91 98123 45678',
      image: 'https://picsum.photos/id/91/100/100'
    }
  },
  {
    id: '3',
    title: 'Spacious Family Home in Koramangala',
    price: 8500000,
    address: '156, 5th Block, Koramangala, Bangalore, Karnataka',
    beds: 3,
    baths: 2,
    sqft: 2100,
    type: PropertyType.House,
    listingType: ListingType.Buy,
    image: 'https://picsum.photos/id/142/800/600',
    gallery: ['https://picsum.photos/id/142/800/600', 'https://picsum.photos/id/143/800/600', 'https://picsum.photos/id/144/800/600'],
    description: 'Perfect for families, this charming house features a spacious backyard, renovated kitchen, and is located in a top-rated school district near IT parks.',
    features: ['Backyard', 'Modular Kitchen', 'Power Backup', 'Quiet Neighborhood'],
    agent: {
      name: 'Anjali Patel',
      phone: '+91 97456 78901',
      image: 'https://picsum.photos/id/65/100/100'
    }
  },
  {
    id: '4',
    title: 'Beachfront Condo in Candolim',
    price: 15000000,
    address: 'Sea Pearl Residency, Candolim Beach Road, Goa',
    beds: 2,
    baths: 2,
    sqft: 1500,
    type: PropertyType.Condo,
    listingType: ListingType.Buy,
    image: 'https://picsum.photos/id/152/800/600',
    gallery: ['https://picsum.photos/id/152/800/600', 'https://picsum.photos/id/153/800/600', 'https://picsum.photos/id/154/800/600'],
    description: 'Wake up to the sound of waves. This premium condo offers direct beach access, a private balcony with ocean views, and resort-style amenities.',
    features: ['Ocean View', 'Pool', 'Beach Access', 'Valet Parking'],
    agent: {
      name: 'Vikram Singh',
      phone: '+91 93456 78912',
      image: 'https://picsum.photos/id/177/100/100'
    }
  },
  {
    id: '5',
    title: 'Executive Penthouse in Bandra',
    price: 125000,
    address: 'Oberoi Sky Heights, Bandra West, Mumbai, Maharashtra',
    beds: 3,
    baths: 3,
    sqft: 2800,
    type: PropertyType.Apartment,
    listingType: ListingType.Rent,
    image: 'https://picsum.photos/id/180/800/600',
    gallery: ['https://picsum.photos/id/180/800/600', 'https://picsum.photos/id/181/800/600', 'https://picsum.photos/id/182/800/600'],
    description: 'Luxury redefined. This penthouse offers panoramic city and sea views, a private elevator, and exclusive access to the sky lounge.',
    features: ['Panoramic View', 'Private Elevator', 'Smart Lighting', 'Home Theatre'],
    agent: {
      name: 'Kavita Reddy',
      phone: '+91 98888 77766',
      image: 'https://picsum.photos/id/237/100/100'
    }
  },
  {
    id: '6',
    title: 'Hill Station Cottage in Shimla',
    price: 6500000,
    address: 'Pine Valley Estate, Mashobra Road, Shimla, Himachal Pradesh',
    beds: 4,
    baths: 3,
    sqft: 2600,
    type: PropertyType.House,
    listingType: ListingType.Buy,
    image: 'https://picsum.photos/id/204/800/600',
    gallery: ['https://picsum.photos/id/204/800/600', 'https://picsum.photos/id/206/800/600', 'https://picsum.photos/id/208/800/600'],
    description: 'Escape to nature in this beautiful hill cottage. Features a large stone fireplace, wooden interiors, and proximity to snow-capped mountains and pine forests.',
    features: ['Mountain View', 'Stone Fireplace', 'Wooden Deck', 'Valley View'],
    agent: {
      name: 'Arjun Mehta',
      phone: '+91 94567 89123',
      image: 'https://picsum.photos/id/338/100/100'
    }
  }
];