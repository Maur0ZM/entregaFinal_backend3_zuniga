import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const PetsSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: Number, required: true },
});

PetsSchema.plugin(mongoosePaginate);

export const petsModel = model("pets", PetsSchema);
