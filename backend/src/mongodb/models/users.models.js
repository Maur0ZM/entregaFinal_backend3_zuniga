import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { createHash } from "../../utils/password.js";

const UsersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  pets: [{ type: Schema.Types.ObjectId, ref: "pets", default: [] }],
  image: { type: String },
});

UsersSchema.plugin(mongoosePaginate);

UsersSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = createHash(this.password);
  next();
});

export const userModel = model("users", UsersSchema);
