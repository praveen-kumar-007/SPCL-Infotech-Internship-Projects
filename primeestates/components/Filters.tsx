import React from 'react';
import { Search } from 'lucide-react';
import { ListingType, PropertyType } from '../types';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';

interface FiltersProps {
  filters: {
    query: string;
    listingType: ListingType | 'All';
    propertyType: PropertyType | 'All';
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    query: string;
    listingType: ListingType | 'All';
    propertyType: PropertyType | 'All';
  }>>;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg -mt-10 relative z-20 border border-gray-100 mx-4 md:mx-auto max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Search */}
        <div className="lg:col-span-2">
          <Input
            name="query"
            value={filters.query}
            onChange={handleChange}
            placeholder="City, Neighborhood, or Address"
            leftIcon={<Search className="h-5 w-5" />}
          />
        </div>

        {/* Listing Type */}
        <div>
          <Select
            name="listingType"
            value={filters.listingType}
            onChange={handleChange}
          >
            <option value="All">Buy or Rent</option>
            <option value={ListingType.Buy}>Buy</option>
            <option value={ListingType.Rent}>Rent</option>
          </Select>
        </div>

        <div>
          <Select
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
          >
            <option value="All">All Property Types</option>
            <option value={PropertyType.House}>House</option>
            <option value={PropertyType.Apartment}>Apartment</option>
            <option value={PropertyType.Villa}>Villa</option>
            <option value={PropertyType.Condo}>Condo</option>
          </Select>
        </div>

        <div className="flex items-center justify-center">
          <Button fullWidth size="lg">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Filters;