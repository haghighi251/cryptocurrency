import { Schema, model, models } from "mongoose";
import { IStoreAdminSchema } from "@/utils/types";

const StoreAdminSchema = new Schema<IStoreAdminSchema>({
  storeAdminUnique: {
    type: String,
    required: true,
    unique: true,
  },
  storeUniqueId: {
    type: String,
    required: true,
  },
  isStoreAdmin: {
    type: Boolean,
    default: false,
  },
});

const StoreAdmin =
  models.StoreAdmin || model<IStoreAdminSchema>("StoreAdmin", StoreAdminSchema);

export default StoreAdmin;
