//package imports
const mongoose = require("mongoose");

//initialization
const { Schema } = mongoose;

//shema options
const MainSchemaOptions = {
	timestamps: true,
	collection: "users",
	optimisticConcurrency: true,
};

const UserSchema = new Schema({});



//middleware to remove reset password token and expiry after reset password or expiry
UserSchema.pre("save", function (next) {
	if (this.resetPasswordToken && this.resetPasswordExpiry < new Date()) {
		this.resetPasswordToken = undefined;
		this.resetPasswordExpiry = undefined;
	}
	next();
});

//middleware that check if emailOtp exists and deletes it after 3 hours
UserSchema.pre("save", function (next) {
	if (this.emailOTP && this.emailOtpExpiry < new Date()) {
		this.emailOTP = undefined;
		this.emailOtpExpiry = undefined;
	}
	next();
});


const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;