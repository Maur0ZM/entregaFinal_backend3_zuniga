import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const UsersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  pets: [{ type: Schema.Types.ObjectId, ref: "pets", default: [] }],
});

UsersSchema.plugin(mongoosePaginate);

export const userModel = model("users", UsersSchema);
