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

const OrderSchema = new Schema({
	orderer: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		index: true,
	},
	products: [
		{
			product: {
				type: Schema.Types.ObjectId,
				ref: "Product",
			},
			quantity: {
				type: Number,
				required: true,
			},
		},
	],
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	orderId: {
		type: String,
		required: true,
		unique: true,
		index: true
	},
	status: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		index: true,
		enum: ["pending", "completed", "cancelled"],
	},
	totalPrice: {
		type: Number,
		required: true,
	},
	paymentMethod: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		index: true,
		enum: ["cash", "mpesa", "airtel"],
	},
}, MainSchemaOptions);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

//a middleware that will calculate the total price of the order aas per the products
OrderSchema.pre("save", function (next) {
	this.totalPrice = this.products.reduce((acc, product) => {
		return acc + product.quantity * product.product.price;
	}, 0);
	next();
})

module.exports = Order;