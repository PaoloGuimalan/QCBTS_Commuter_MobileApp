import { createStore, combineReducers } from "redux";
import { setassignedrouteslist, setauthdetails, setbusstopslist, setcurrentlocation, setcurrenttab, setenablelocation, setfeedinfo, setfeedlist, setinitialmaptrigger, setlivebuslist, setliveroutelist, setprofiledetails, setrouteslist, setsearchresultlist, setselectedbusstop, setselectedlivebus, setselectedroute, setwaitingbusstop } from "../action/action";

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
    feedlist: setfeedlist,
    waitingbusstop: setwaitingbusstop,
    feedinfo: setfeedinfo,
    livebuslist: setlivebuslist,
    liveroutelist: setliveroutelist,
    selectedlivebus: setselectedlivebus,
    assignedrouteslist: setassignedrouteslist,
    searchresultlist: setsearchresultlist,
    initialmaptrigger: setinitialmaptrigger
})

const store = createStore(combiner);

export default store;