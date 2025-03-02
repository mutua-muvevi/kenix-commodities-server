//package imports
const mongoose = require("mongoose");

//initialization
const { Schema } = mongoose;

// approved by subdocuement
const ApprovedSchema = new Schema({
	isAproved: {
		type: Boolean,
		default: false
	},
	approvedBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	}
})

// email verification subdocument
const EmailVerificationSchema = new Schema({
	emailOTP: {
		type: String,
	},
	emailOtpExpiry: {
		type: Date,
	},
})

// phone verification subdocument
const PhoneVerificationSchema = new Schema({
	phoneOTP: {
		type: String,
	},
	phoneOtpExpiry: {
		type: Date,
	},
})

// ban user subdocument
const BanUserSchema = new Schema({
	isBanned: {
		type: Boolean,
		default: false
	},
	bannedBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

//shema options
const MainSchemaOptions = {
	timestamps: true,
	collection: "users",
	optimisticConcurrency: true,
};

const UserSchema = new Schema({
	UUID: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		lowercase: true,
		index: true,
	},
	role: {
		type: String,
		required: true,
		trim: true,
		enum: ["admin", "rider", "marketer", "developer", "retailer"],
		default: "retailer",
	},
	country: {
		type: String,
		required: true,
		trim: true,
		default: "kenya",
	},

	approved: ApprovedSchema,
	banStatus: BanUserSchema,

	hash: {
		type: String,
	},
	resetPasswordToken: {
		type: String,
	},
	resetPasswordExpiry: {
		type: Date,
	},

	// emailVerification: EmailVerificationSchema,
	emailOTP: {
		type: String,
	},
	emailOtpExpiry: {
		type: Date,
	},
	phoneVerification: PhoneVerificationSchema,

	createdBy: {
		type: Schema.Types.ObjectId,
		ref: "User",
	}
	
}, MainSchemaOptions);

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