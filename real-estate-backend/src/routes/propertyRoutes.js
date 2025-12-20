const express = require('express');
const router = express.Router();
const { 
    createProperty, 
    getAllProperties, 
    getPropertyById, 
    updateProperty, 
    deleteProperty 
} = require('../controllers/propertyController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../utils/upload'); // Import Multer utility
const Property = require('../models/Property'); // Needed for the upload logic

// Public routes
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

// Protected routes
router.post('/', protect, createProperty);
router.put('/:id', protect, updateProperty);
router.delete('/:id', protect, deleteProperty);

// Image Upload Route (Max 5 images)
router.post('/:id/upload', protect, upload.array('images', 5), async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        
        if (!property) return res.status(404).json({ success: false, message: "Property not found" });
        
        // Ownership check
        if (property.owner.toString() !== req.user.id) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }

        const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
        property.images.push(...imageUrls);
        await property.save();

        res.status(200).json({ success: true, data: property.images });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;