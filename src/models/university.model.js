import mongoose from "mongoose";

const universitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },

    domains: {
      type: [String],
      required: true,
    },

    studentEmailRegex: {
      type: String,
      required: true,
    },

    facultyEmailRegex: {
      type: String,
      required: true,
    },

    systemIdRegex: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export default mongoose.model("University", universitySchema);
