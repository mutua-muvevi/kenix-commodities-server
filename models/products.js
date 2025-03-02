//package imports
const mongoose = require("mongoose");

//initialization
const { Schema } = mongoose;

//shema options
const MainSchemaOptions = {
	timestamps: true,
	collection: "orders",
	optimisticConcurrency: true,
};

const ProductSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	wholePrice: {
		type: Number,
		required: true,
	},
	unitPrice: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	unitOfMeasure: {
		type: String,
		required: true,
		trim: true,
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	updatedBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
}, MainSchemaOptions);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

module.exports = Product;