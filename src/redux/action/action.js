import { SET_AUTH_DETAILS, SET_BUS_STOPS_LIST, SET_ENABLE_LOCATION, SET_PROFILE_DETAILS, SET_ROUTES_LIST } from "../types/types";

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