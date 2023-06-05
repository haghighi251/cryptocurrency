import { Schema, model, models } from "mongoose";
import { IStoresSchema } from "@/utils/types";

const StoresSchema = new Schema<IStoresSchema>({
  name: {
    type: String,
    required: true,
  },
  storeUniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  cityUnique: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "5",
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
    default: -1,
  },
});

const Stores = models.Stores || model<IStoresSchema>("Stores", StoresSchema);

export default Stores;
