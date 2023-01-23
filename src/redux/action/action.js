import { SET_AUTH_DETAILS } from "../types/types";

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