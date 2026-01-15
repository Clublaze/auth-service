import mongoose from "mongoose";
import dotenv from "dotenv";
import University from "../src/models/university.model.js";

dotenv.config();

const seed = async () => {
  await mongoose.connect("mongodb://localhost:27017/authdb");

  const exists = await University.findOne({ code: "SHARDA" });
  if (exists) {
    console.log("Sharda University already exists");
    process.exit(0);
  }

  await University.create({
    name: "Sharda University",
    code: "SHARDA",

    domains: ["ug.sharda.ac.in", "sharda.ac.in"],

    studentEmailRegex: "^\\d{10}\\.[a-zA-Z]+@ug\\.sharda\\.ac\\.in$",
    facultyEmailRegex: "^[a-zA-Z.]+@sharda\\.ac\\.in$",
    systemIdRegex: "^\\d{10}$",

    status: "ACTIVE",
  });

  console.log("Sharda University seeded successfully");
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
