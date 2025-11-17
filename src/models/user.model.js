import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["STUDENT", "FACULTY", "ADMIN", "SUPERADMIN"],
      default: "STUDENT",
    },
    systemId: {
      type: String,
      default: null,
      sparse: true,
      index: true,
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiresAt: {
      type: Date,
      default: null,
      index: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["PENDING_OTP", "ACTIVE"],
      default: "PENDING_OTP",
    },
    refreshTokenHash: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.methods.toJson = function(){
    const obj = this.toObject();
    delete obj.passwordHash;
    delete obj.otp;
    delete obj.otpExpiresAt;
    delete obj.refreshTokenHash;
    return obj;
}

export default mongoose.model("User",UserSchema);