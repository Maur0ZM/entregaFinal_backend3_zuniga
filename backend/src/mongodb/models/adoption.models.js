import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const PetsSchema = new Schema({
  pets: [{ type: Schema.Types.ObjectId, ref: "pets" }],
  owner: { type: Schema.Types.ObjectId, ref: "users" },
});

PetsSchema.plugin(mongoosePaginate);

export const adoptionModel = model("adoption", PetsSchema);
