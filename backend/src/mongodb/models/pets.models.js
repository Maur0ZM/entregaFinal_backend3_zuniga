import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const PetsSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: Number, required: true },
  adopted: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, ref: "users" },
});

PetsSchema.plugin(mongoosePaginate);

export const petsModel = model("pets", PetsSchema);
