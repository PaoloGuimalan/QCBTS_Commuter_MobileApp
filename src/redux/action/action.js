import { SET_AUTH_DETAILS, SET_BUS_STOPS_LIST, SET_PROFILE_DETAILS } from "../types/types";

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