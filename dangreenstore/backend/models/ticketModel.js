const mongoose = require('mongoose')
const userModel = require('./userModel')

const ticketSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Please select a product']
    },
    description: {
        type: String,
        required: [true, 'Please enter a description of the issue']
    },
    price: {
        type: Number,
        required: [true, 'Please set a price']
    },
    sold: {
        type: Boolean,
    },
    email: {
        type: String,
    },
    image: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Ticket', ticketSchema)