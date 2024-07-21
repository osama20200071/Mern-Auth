import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    // role: {
    //   type: String,
    //   enum: ["user", "admin"],
    //   default: "user",
    // },
  },
  { timestamps: true }
);

// @desc: before saving the doc in the db
// here we need to use normal function to make this work
// this here refer to the doc itself
userSchema.pre("save", async function (next) {
  // if the password not modified continue
  if (!this.isModified("password")) {
    next();
  }
  // 10 => is the solt
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;

  // console.log(hashedPassword);
  next();
});

// @desc: we can use this method on the user itself  => user.matchPasswords(password)
userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

export { User };
