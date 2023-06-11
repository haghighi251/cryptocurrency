import { Schema, model, models } from "mongoose";
import { IAssetsSchema } from "@/utils/types";

const AssetsSchema = new Schema<IAssetsSchema>(
  {
    id: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    supply: {
      type: String,
      required: true,
    },
    maxSupply: {
      type: String,
      required: true,
    },
    marketCapUsd: {
      type: String,
      required: true,
    },
    volumeUsd24Hr: {
      type: String,
      required: true,
    },
    priceUsd: {
      type: String,
      required: true,
    },
    changePercent24Hr: {
      type: String,
      required: true,
    },
    vwap24Hr: {
      type: String,
      required: true,
    },
    storeUniqueId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Assets = models.Assets || model<IAssetsSchema>("Assets", AssetsSchema);

export default Assets;
