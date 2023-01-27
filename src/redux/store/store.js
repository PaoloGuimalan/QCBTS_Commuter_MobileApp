import { createStore, combineReducers } from "redux";
import { setauthdetails, setbusstopslist, setprofiledetails } from "../action/action";

const combiner = combineReducers({
    authdetails: setauthdetails,
    profiledetails: setprofiledetails,
    busstopslist: setbusstopslist
})

const store = createStore(combiner);

export default store;