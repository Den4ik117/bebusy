import { LoadingStatuses } from "./config";

export const validateStatus = value => Object.values(LoadingStatuses).includes(value);

