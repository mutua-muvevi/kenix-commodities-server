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

const OfferSchema = new Schema({
	product: {
		type: Schema.Types.ObjectId,
		ref: "Product",
		required: true
	},
	amount: {
		type: Number,
		required: true
	},
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	updatedBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	fromDate: {
		type: Date,
		required: true
	},
	toDate: {
		type: Date,
		required: true
	}
}, MainSchemaOptions);
const Offer = mongoose.models.Offer || mongoose.model("Offer", OfferSchema);

module.exports = Offer;