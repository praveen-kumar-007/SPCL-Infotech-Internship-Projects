const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: {
        address: String,
        city: String,
        state: String,
        zipCode: String
    },
    propertyType: { 
        type: String, 
        enum: ['apartment', 'house', 'land', 'commercial'], 
        required: true 
    },
    amenities: [String],
    images: [String], // Array of URLs
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);