import { jwtDecode } from 'jwt-decode'

export const getRole = () => {
    let userObj: any = localStorage.getItem("wowuser");
    userObj = JSON.parse(userObj!);
    
    let decoded: any = {};
    if(userObj?.token) decoded = jwtDecode(userObj?.token)
    return decoded?.role ?? "";
}

export const getToken = () => {
    let userObj: any = localStorage.getItem("wowuser");
    userObj = JSON.parse(userObj!);
    return userObj?.token ?? "";
}

export const getUserId = () => {
    let userObj: any = localStorage.getItem("wowuser");
    userObj = JSON.parse(userObj!);
    let decoded: any = {};
    if(userObj?.token) decoded = jwtDecode(userObj?.token)
    return decoded?.id ?? "";
}