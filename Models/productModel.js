const mongoose = require('mongoose');

const Schema = mongoose.Schema

const productSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
    },
    brand:{
        type: String,
    },
    colors: [{ type: String,required: true}],
    sizes: [{ type: String,required: true}],
    imageUrl: {
        type: String,
        required: true
    },
    primaryCategory: {
        type: String,
        enum: ['Men', 'Women', 'Kids', 'Toys', 'Sports', 'Electronics'],
        required: true
    },
    secondaryCategory: {
        type: String,
        required: true
    },
    disCountPrice:{
        type: Number,
        required: true
    },
    discountPersent:{
        type: Number,
        required: true
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reviews',
    }],
    ratings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Ratings',
    }],

},{timestamps: true})

module.exports = mongoose.model('Product', productSchema);