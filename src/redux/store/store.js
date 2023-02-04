import { createStore, combineReducers } from "redux";
import { setauthdetails, setbusstopslist, setcurrentlocation, setcurrenttab, setenablelocation, setfeedlist, setprofiledetails, setrouteslist, setselectedbusstop, setselectedroute } from "../action/action";

const combiner = combineReducers({
    authdetails: setauthdetails,
    profiledetails: setprofiledetails,
    busstopslist: setbusstopslist,
    enablelocation: setenablelocation,
    routeslist: setrouteslist,
    selectedroute: setselectedroute,
    currenttab: setcurrenttab,
    currentlocation: setcurrentlocation,
    selectedbusstop: setselectedbusstop,
    feedlist: setfeedlist
})

const store = createStore(combiner);

export default store;