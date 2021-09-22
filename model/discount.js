import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const discountSchema = new Schema({
    discountCode: { required: true, type: String },
    discountPercentage: { required: true, type: String },
    productName: { required: false, type: String },
    categoryName: { required: false, type: String },
    fullDiscount: { required: false, type: Boolean },
})

const discountModel = mongoose.model('discount', discountSchema);

export default discountModel;