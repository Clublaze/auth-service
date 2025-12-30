import mongoose from "mongoose";
import University from "../src/models/university.model.js";
import { env } from "../src/config/env.js";

await mongoose.connect(env.mongoUri);

await University.create({
  name: "Sharda University",
  code: "SHARDA",
  domains: ["sharda.ac.in", "ug.sharda.ac.in"],
  studentEmailRegex: "^\\d{10}.*@ug\\.sharda\\.ac\\.in$",
  facultyEmailRegex: "^[a-zA-Z.]+@sharda\\.ac\\.in$",
  systemIdRegex: "^\\d{10}$",
});

console.log("Sharda University seeded");
process.exit();
