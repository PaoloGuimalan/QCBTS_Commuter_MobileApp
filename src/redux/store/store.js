import { createStore, combineReducers } from "redux";
import { setauthdetails } from "../action/action";

const combiner = combineReducers({
    authdetails: setauthdetails
})

const store = createStore(combiner);

export default store;