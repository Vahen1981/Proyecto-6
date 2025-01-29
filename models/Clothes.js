const mongoose = require('mongoose');

const clothesSchema = new mongoose.Schema(
    {
        clothingType: { 
            type: String, 
            required: true 
        },
        brand: {
            type: String, 
            required: true
        },
        price: { 
            type: Number, 
            required: true 
        },
        size: { 
            type: String, 
            required: true 
        },
        description: { 
            type: String, 
            required: false
        },
    },
    {
        timestamps: true,
    }
);

const Clothes = mongoose.model('Clothes', clothesSchema);

module.exports = Clothes;
