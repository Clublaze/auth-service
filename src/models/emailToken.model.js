import mongoose from "mongoose";

const emailTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    type: {
      type: String,
      enum: ["VERIFY_EMAIL", "RESET_PASSWORD"],
      required: true,
    },
    revoked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("EmailToken", emailTokenSchema);
