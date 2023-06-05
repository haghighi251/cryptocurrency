import { Document } from "mongoose";

export interface Iuser {
  user: {
    user_id: string | undefined;
    isAdmin: boolean | undefined;
    isStarterUser: boolean | undefined;
    isDriver: boolean | undefined;
    isCompanyAdmin: boolean | undefined;
    isMarketers: boolean | undefined;
    isStoreAdmin: boolean | undefined;
    isProvinceAdmin: boolean | undefined;
    isCityAdmin: boolean | undefined;
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
  isCompanyAdmin: boolean;
  isMarketers: boolean;
  isDriver: boolean;
  isStoreAdmin: boolean;
  isStarterUser: boolean;
  isProvinceAdmin: boolean;
  isCityAdmin: boolean;
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
}

export interface IAdminSchema extends Document {
  adminUniqueId: IUsersSchema.uniqueCode;
}

export interface IStoresSchema extends Document {
  name: string;
  storeUniqueId: string;
  cityUnique: string;
  type: string; // 1 === supermarket, 2 === shop, 3 === distribution, 4 === other, 5 === unknown
  address: string;
  status: number; // -1 === deActive, 0 === Pending, 1 === Active
}

export interface IStoreAdminSchema extends Document {
  storeAdminUnique: string;
  storeUniqueId: string;
  isStoreAdmin: boolean;
}

export interface IDriversSchema extends Document {
  driverUnique: string;
  storeUniqueId: [string];
  storeAdminUnique: string;
  score: string;
}

export interface IMarketersSchema extends Document {
  studentUnique: string;
  storeUniqueId: string;
  driverUnique: string;
  parentUnique: [string];
}

export interface ICompanySchema extends Document {
  parentUnique: string;
  studentUnique: [string];
}

export interface IProvincesSchema extends Document {
  provinceName: string;
  provinceUnique: string;
}

export interface ICitiesSchema extends Document {
  citiesUnique: string;
  provinceUnique: string;
  speedMin: string;
  speedMax: string;
}

export interface ILocationsSchema extends Document {
  driverUnique: string;
  latitude: string;
  longitude: string;
  speed: string;
}

export interface INewsSchema extends Document {
  title: string;
  description: string;
  image: string;
}

export interface IDriversDocumentsSchema extends Document {
  driverUnique: string;
  documentName: string;
  file: string;
}

export interface IProvincesAdminSchema extends Document {
  rovincessAdminUnique: string;
  provinceUnique: string;
}

export interface ICityCoordinatesSchema extends Document {
  cityUnique: string;
  latitude: string;
  longitude: string;
  rowNumber: number;
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
