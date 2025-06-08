import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
      trim: true,
      // match: [
      //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
      //   "Please enter a valid email address",
      // ],
      validate: {
        validator: function (value: string) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      validate: {
        validator: function (value: string) {
          return /^[a-zA-Z0-9_]{3,20}$/.test(value);
        },
        message:
          "Username must be 3-20 characters long and contain only letters, numbers, and underscores",
      },
    },
    image: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
