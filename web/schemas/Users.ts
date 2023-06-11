import { Schema, model, models } from "mongoose";
import { IUsersSchema } from "@/utils/types";

const UsersSchema = new Schema<IUsersSchema>(
  {
    username: {
      type: String,
      required: false,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      default: null,
    },
    password: {
      type: String,
      required: false,
      default: null,
    },
    nickname: {
      type: String,
      required: false,
      default: null,
    },
    picture: {
      type: String,
      required: false,
      default: null,
    },
    salt: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isStarterUser: {
      type: Boolean,
      default: true,
    },
    isSubAdmin: {
      type: Boolean,
      default: false,
    },
    isSiteSupporter: {
      type: Boolean,
      default: false,
    },
    uniqueCode: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    activationCode: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Users = models.Users || model<IUsersSchema>("Users", UsersSchema);

export default Users;
