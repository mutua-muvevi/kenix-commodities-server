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

const CategorySchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	products: [
		{
			product: {
				type: Schema.Types.ObjectId,
				ref: "Product",
			},
		},
	],
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	updatedBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
}, MainSchemaOptions);
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);

module.exports = Category;