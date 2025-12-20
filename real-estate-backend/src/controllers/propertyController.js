const Property = require('../models/Property');

// @desc    Create a new property
// @route   POST /api/properties
// @access  Private
exports.createProperty = async (req, res) => {
    try {
        const propertyData = { ...req.body, owner: req.user._id };
        const property = await Property.create(propertyData);
        res.status(201).json({ success: true, data: property });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
exports.getAllProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate('owner', 'name email');
        res.status(200).json({ success: true, count: properties.length, data: properties });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('owner', 'name email');
        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }
        res.status(200).json({ success: true, data: property });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private
exports.updateProperty = async (req, res) => {
    try {
        let property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        // Check Ownership: Only owner or admin can update
        if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to update this listing' });
        }

        property = await Property.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ success: true, data: property });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private
exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        // Check Ownership: Only owner or admin can delete
        if (property.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ success: false, message: 'Not authorized to delete this listing' });
        }

        await property.deleteOne();
        res.status(200).json({ success: true, message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};