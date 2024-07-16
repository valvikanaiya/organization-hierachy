import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import employee from "./slice/employee";
import auth from "./slice/auth";
const employeePersistConfig = {
  key: "employee",
  storage,
  blacklist: ["_persist"],
};

const authSPersistConfig = {
  key: "auth",
  storage,
  blacklist: ["_persist"],
};

const rootReducer = combineReducers({
  employee: employee,
  // employee: persistReducer(employeePersistConfig, employee),
  auth: persistReducer(authSPersistConfig, auth),
});

export default rootReducer;
