export const getRole = () => {
    let userObj: any = localStorage.getItem("wowuser");
    userObj = JSON.parse(userObj!);
    return userObj?.role ?? "";
}

export const getToken = () => {
    let userObj: any = localStorage.getItem("wowuser");
    userObj = JSON.parse(userObj!);
    return userObj?.token ?? "";
}

export const getUserId = () => {
    let userObj: any = localStorage.getItem("wowuser");
    userObj = JSON.parse(userObj!);
    return userObj?.i ?? "";
}