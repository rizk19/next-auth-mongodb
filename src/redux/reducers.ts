import { combineReducers } from "redux";

import counter from "@redux/slices/counter";
import userManagement from "@redux/slices/userManagement";

const rootReducer = combineReducers({ counter, userManagement });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
