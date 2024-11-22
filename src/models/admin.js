import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

adminSchema.methods.comparePassword = async function (userPass) {
  try {
    return await bcrypt.compare(userPass, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export default Admin;
