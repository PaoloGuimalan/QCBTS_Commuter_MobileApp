import { SET_AUTH_DETAILS, SET_BUS_STOPS_LIST, SET_CURRENT_LOCATION, SET_CURRENT_TAB, SET_ENABLE_LOCATION, SET_FEED_LIST, SET_PROFILE_DETAILS, SET_ROUTES_LIST, SET_SELECTED_BUS_STOP, SET_SELECTED_ROUTE } from "../types/types";

export const authdetailsstate = {
    auth: null,
    userID: null,
    username: ""
}

export const setauthdetails = (state = authdetailsstate, action) => {
    switch(action.type){
        case SET_AUTH_DETAILS:
            return action.authdetails;
        default:
            return state;
    }
}

export const profiledetailsstate = {
    userID: "",
    username: "",
    name: "",
    email: "",
    contactnumber: "",
    password: ""
}

export const setprofiledetails = (state = profiledetailsstate, action) => {
    switch(action.type){
        case SET_PROFILE_DETAILS:
            return action.profiledetails;
        default:
            return state;
    }
}

export const setbusstopslist = (state = [], action) => {
    switch(action.type){
        case SET_BUS_STOPS_LIST:
            return action.busstopslist;
        default:
            return state;
    }
}

export const setenablelocation = (state = false, action) => {
    switch(action.type){
        case SET_ENABLE_LOCATION:
            return action.enablelocation;
        default:
            return state;
    }
}

export const setrouteslist = (state = [], action) => {
    switch(action.type){
        case SET_ROUTES_LIST:
            return action.routeslist;
        default:
            return state;
    }
}

export const selectedroutestate = {
    routeID: null,
    routeName: null,
    stationList: [],
    routePath: [],
    dateAdded: null,
    addedBy: null,
    companyID: null,
    privacy: null,
    status: null
}

export const setselectedroute = (state = selectedroutestate, action) => {
    switch(action.type){
        case SET_SELECTED_ROUTE:
            return action.selectedroute;
        default:
            return state;
    }
}

export const setcurrenttab = (state = "Feed", action) => {
    switch(action.type){
        case SET_CURRENT_TAB:
            return action.currenttab;
        default:
            return state;
    }
}

export const currentlocationstate = {
    status: false,
    lat: "",
    lng: ""
}

export const setcurrentlocation = (state = currentlocationstate, action) => {
    switch(action.type){
        case SET_CURRENT_LOCATION:
            return action.currentlocation;
        default:
            return state;
    }
}

export const setselectedbusstop = (state = "", action) => {
    switch(action.type){
        case SET_SELECTED_BUS_STOP:
            return action.selectedbusstop;
        default:
            return state;
    }
}

export const setfeedlist = (state = [], action) => {
    switch(action.type){
        case SET_FEED_LIST:
            return action.feedlist;
        default:
            return state;
    }
}