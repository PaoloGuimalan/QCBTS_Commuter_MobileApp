import { createStore, combineReducers } from "redux";
import { setauthdetails, setbusstopslist, setcurrenttab, setenablelocation, setprofiledetails, setrouteslist, setselectedroute } from "../action/action";

const combiner = combineReducers({
    authdetails: setauthdetails,
    profiledetails: setprofiledetails,
    busstopslist: setbusstopslist,
    enablelocation: setenablelocation,
    routeslist: setrouteslist,
    selectedroute: setselectedroute,
    currenttab: setcurrenttab
})

const store = createStore(combiner);

export default store;