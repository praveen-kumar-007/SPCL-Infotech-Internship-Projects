const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries } = require('../controllers/inquiryController');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect); // All inquiry routes require login

router.route('/')
    .post(createInquiry)
    .get(getInquiries);

module.exports = router;