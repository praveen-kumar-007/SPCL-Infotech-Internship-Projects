const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    role: { 
        type: String, 
        enum: ['buyer', 'seller', 'admin'], 
        default: 'buyer' 
    },
    phoneNumber: { type: String, required: true }
}, { timestamps: true });

// Pre-save hook to hash password before saving to DB
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

module.exports = mongoose.model('User', userSchema);