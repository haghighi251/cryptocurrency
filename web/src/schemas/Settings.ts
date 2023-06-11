import { model, Schema, models } from "mongoose";
import { ISettingsSchema } from "@/utils/types";

const SettingsSchema = new Schema<ISettingsSchema>(
  {
    key: {
      type: String,
      unique: false,
    },
    value: {
      type: String,
      required: false,
      unique: false,
      default: null,
    },
  },
  { timestamps: true }
);

const ApplicationSettings =
  models.ApplicationSettings ||
  model<ISettingsSchema>("ApplicationSettings", SettingsSchema);

export default ApplicationSettings;
