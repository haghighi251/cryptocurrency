import { Document } from "mongoose";
import { MouseEvent, ChangeEvent } from "react";

export interface Iuser {
  user: {
    user_id: string | undefined;
    isAdmin: boolean | undefined;
    isStarterUser: boolean | undefined;
    isSubAdmin: boolean | undefined;
    isSiteSupporter: boolean | undefined;
    nickname: string | null;
    picture: string | null;
  };
  isLoggedIn: boolean;
}

export type ResponseDataType = {
  success: boolean;
  error?: string;
  data?: any;
};

// User schema structure that is used in MongoDB schemas.
export interface IUsersSchema extends Document {
  username?: string;
  mobile: string;
  email?: string;
  password?: string;
  nickname?: string;
  picture?: string;
  salt?: string;
  isAdmin: boolean;
  isStarterUser: boolean;
  isSubAdmin: boolean;
  isSiteSupporter: boolean;
  uniqueCode: string;
  timestamps?: unknown;
  status: boolean;
  activationCode: string;
  _doc: any;
}

export interface IUsersOptionsSchema extends Document {
  uid: IUsersSchema._id;
  key: string;
  value: string | null;
  timestamps?: unknown;
  _doc: any;
}

export interface IAdminSchema extends Document {
  adminUniqueId: IUsersSchema.uniqueCode;
  timestamps?: unknown;
  _doc: any;
}

export interface IAssetsSchema extends Document {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  storeUniqueId: string;
  timestamps?: unknown;
  _doc?: any;
}

export interface INewsSchema extends Document {
  title: string;
  description: string;
  image: string;
  timestamps?: unknown;
  _doc: any;
}

export interface IPackagesSchema extends Document {
  packageUnique: string;
  price: number;
  days: number;
  name: string;
  product: number;
  images: number;
  marketer: number;
  drivers: number;
  customers: number;
  categories: number;
  accounting: boolean;
  accontingTransactionsCount: number;
  timestamps?: unknown;
  _doc: any;
}

export interface ISettingsSchema extends Document {
  key: string;
  value: string | null;
  timestamps?: unknown;
  _doc: any;
}

// LoginForm props
export interface LoginFormProps {
  mobile: string;
  error: string | null;
  isLoading: boolean;
  setMobileChanges: (value: string) => void;
  handleSubmit: () => void;
}

export interface ActivationFormProps {
  handleActivation: () => void;
  activationCode: string;
  handleActivationCode: (value: string) => void;
  error: string | null;
  isLoading: boolean;
}

export type AssetsType = [
  {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
    storeUniqueId: string;
  }
];
