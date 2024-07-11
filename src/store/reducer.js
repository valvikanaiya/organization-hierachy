import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import employee from "./slice/employee";

const employeePersistConfig = {
  key: "employee",
  storage,
  blacklist: ["_persist"],
};

const rootReducer = combineReducers({
  employee: persistReducer(employeePersistConfig, employee),
});

export default rootReducer;
