import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
  {
    applicantName: {
      type: String,
      required: [true, "Full name"],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    hashedPassword: {
      type: String,
      required: [true, "Password is required."],
    },
    gradeIn12: String,
    gradeIn10: String,
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);
export default User;
