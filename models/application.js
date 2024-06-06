import { Schema, models, model } from "mongoose";

const applicationSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required."],
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    gradeIn12: {
      type: String,
      required: [true, "Please enter your 12th grades."],
    },
    gradeIn10: {
      type: String,
      required: [true, "Please enter your 10th grades."],
    },
  },
  { timestamps: true }
);
applicationSchema.index({ email: 1 }, { unique: true });
const ApplicationData =
  models.ApplicationData || model("ApplicationData", applicationSchema);
export default ApplicationData;
