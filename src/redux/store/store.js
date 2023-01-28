import { createStore, combineReducers } from "redux";
import { setauthdetails, setbusstopslist, setenablelocation, setprofiledetails, setrouteslist } from "../action/action";

const combiner = combineReducers({
    authdetails: setauthdetails,
    profiledetails: setprofiledetails,
    busstopslist: setbusstopslist,
    enablelocation: setenablelocation,
    routeslist: setrouteslist
})

const store = createStore(combiner);

export default store;