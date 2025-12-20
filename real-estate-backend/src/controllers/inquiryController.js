const Inquiry = require('../models/Inquiry');
const Property = require('../models/Property');

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Private
exports.createInquiry = async (req, res) => {
    try {
        const { propertyId, message } = req.body;

        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        const inquiry = await Inquiry.create({
            property: propertyId,
            seller: property.owner,
            buyer: req.user._id,
            message
        });

        res.status(201).json({ success: true, data: inquiry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get inquiries for the logged-in user (Seller or Buyer)
// @route   GET /api/inquiries
// @access  Private
exports.getInquiries = async (req, res) => {
    try {
        // Sellers see inquiries for their properties, Buyers see inquiries they sent
        const inquiries = await Inquiry.find({
            $or: [{ seller: req.user._id }, { buyer: req.user._id }]
        }).populate('property', 'title price').populate('buyer', 'name email');

        res.status(200).json({ success: true, data: inquiries });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};