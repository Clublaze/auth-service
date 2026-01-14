import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "University",
      required: true,
    },

    userType: {
      type: String,
      enum: ["STUDENT", "FACULTY", "ADMIN", "SUPER_ADMIN"],
      required: true,
    },

    systemId: {
      type: String,
      default: null,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    passwordHash: {
      type: String,
      required: true,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "BLOCKED"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
