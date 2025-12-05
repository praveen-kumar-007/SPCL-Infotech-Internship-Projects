import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { PropertyType, ListingType } from '../types';
import { CheckCircle, DollarSign, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sell: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    type: PropertyType.House,
    listingType: ListingType.Buy,
    address: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call and success response
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      title: '',
      price: '',
      type: PropertyType.House,
      listingType: ListingType.Buy,
      address: '',
      description: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-cyan-50">
      <Navbar />
      
      {/* Hero */}
      <div className="vibrant-gradient-bg py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 slide-up neon-glow">Sell Your Property with Confidence</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto fade-in">
            Join thousands of homeowners who have successfully sold their properties through PrimeEstates. 
            Get the best price with our expert agents and AI-powered valuation.
          </p>
        </div>
        {/* Floating Shapes */}
        <div className="absolute top-10 left-20 w-24 h-24 bg-white/10 rounded-full blur-2xl float"></div>
        <div className="absolute bottom-10 right-20 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl float" style={{animationDelay: '2s'}}></div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Area */}
          <div className="lg:col-span-2">
            <div className="modern-card glass backdrop-blur-xl bg-white/90 rounded-3xl shadow-2xl p-10 border border-white/40 min-h-[600px]">
              
              {isSuccess ? (
                // Success View
                <div className="h-full flex flex-col items-center justify-center text-center py-12 slide-up">
                  <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-xl pulse-badge">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>
                  <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Request Submitted!</h2>
                  <p className="text-gray-600 text-lg max-w-md mb-8 leading-relaxed">
                    Thank you for listing your property with us. One of our expert agents will review your details and contact you within 24 hours to finalize the listing.
                  </p>
                  <div className="flex gap-4 w-full sm:w-auto flex-col sm:flex-row">
                    <Link to="/" className="w-full sm:w-auto">
                      <Button variant="outline" fullWidth>Back to Home</Button>
                    </Link>
                    <Button onClick={handleReset} fullWidth>Submit Another</Button>
                  </div>
                </div>
              ) : (
                // Form View
                <>
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-2">List Your Property</h2>
                  <div className="h-1 w-16 bg-gradient-to-r from-red-600 to-cyan-600 rounded-full mb-6"></div>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Property Title</label>
                        <Input 
                          name="title" 
                          value={formData.title} 
                          onChange={handleChange} 
                          placeholder="e.g. Modern Sunset Villa" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expected Price (₹)</label>
                        <Input 
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          placeholder="e.g. 5000000" 
                          type="number" 
                          leftIcon={<DollarSign className="h-4 w-4" />} 
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                        <Select name="type" value={formData.type} onChange={handleChange}>
                            <option value={PropertyType.House}>House</option>
                            <option value={PropertyType.Apartment}>Apartment</option>
                            <option value={PropertyType.Villa}>Villa</option>
                            <option value={PropertyType.Condo}>Condo</option>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Listing Type</label>
                        <Select name="listingType" value={formData.listingType} onChange={handleChange}>
                            <option value={ListingType.Buy}>For Sale</option>
                            <option value={ListingType.Rent}>For Rent</option>
                        </Select>
                      </div>
                    </div>

                    <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                       <Input 
                        name="address" 
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter full property address" 
                        required
                       />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none h-32 resize-none text-gray-900"
                            placeholder="Tell us about the unique features of your property..."
                            required
                        ></textarea>
                    </div>

                    <div className="pt-4">
                        <Button fullWidth size="lg" type="submit" isLoading={isLoading}>
                          Submit Listing Request
                        </Button>
                        <p className="text-xs text-gray-500 mt-4 text-center">
                            By submitting this form, you agree to our Terms of Service and Privacy Policy. 
                            An agent will contact you within 24 hours.
                        </p>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Benefits Sidebar */}
          <div className="space-y-6">
            <div className="modern-card gradient-bg rounded-3xl p-8 text-white shadow-2xl sticky top-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">Why Choose PrimeEstates?</h3>
                  <div className="space-y-6">
                      <div className="flex gap-4 group">
                          <div className="glass bg-white/20 p-4 rounded-xl h-fit group-hover:scale-110 transition-transform duration-300">
                              <Users className="h-6 w-6" />
                          </div>
                          <div>
                              <h4 className="font-bold text-lg">Expert Agents</h4>
                              <p className="text-white/80 text-sm mt-1">Our agents have over 10 years of experience in local markets.</p>
                          </div>
                      </div>
                      <div className="flex gap-4 group">
                          <div className="glass bg-white/20 p-4 rounded-xl h-fit group-hover:scale-110 transition-transform duration-300">
                              <TrendingUp className="h-6 w-6" />
                          </div>
                          <div>
                              <h4 className="font-bold text-lg">Maximum Exposure</h4>
                              <p className="text-white/80 text-sm mt-1">We market your property across 50+ platforms instantly.</p>
                          </div>
                      </div>
                      <div className="flex gap-4 group">
                          <div className="glass bg-white/20 p-4 rounded-xl h-fit group-hover:scale-110 transition-transform duration-300">
                              <CheckCircle className="h-6 w-6" />
                          </div>
                          <div>
                              <h4 className="font-bold text-lg">Verified Buyers</h4>
                              <p className="text-white/80 text-sm mt-1">We screen all potential buyers to ensure serious offers only.</p>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Sell;