import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import fetchReducer from './attendence/fetchReducer';
import fetchStudent from './fetchStudent';

const rootReducer = combineReducers({
    auth: authReducer,
    attendence: fetchReducer,
    student: fetchStudent
});

export default rootReducer;