import { createStore, combineReducers } from "redux";
import { setauthdetails, setprofiledetails } from "../action/action";

const combiner = combineReducers({
    authdetails: setauthdetails,
    profiledetails: setprofiledetails
})

const store = createStore(combiner);

export default store;