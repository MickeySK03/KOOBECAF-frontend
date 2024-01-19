const ACCESS_TOKEN = "ACCESS_TOKEN";
const PATHNAME = "PATHNAME";

export const addAccessToken = (token) => localStorage.setItem(ACCESS_TOKEN, token);
export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);
export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);

let pathArr = [];

export const getPath = () => JSON.parse(localStorage.getItem(PATHNAME));

export const addPath = (path) => {
    if (getPath()) pathArr = getPath();
    pathArr = [...pathArr, path];
    localStorage.setItem(PATHNAME, JSON.stringify(pathArr));
};

export const removeLastPath = () => {
    pathArr = getPath();
    pathArr.pop();
    localStorage.setItem(PATHNAME, JSON.stringify(pathArr));
};

export const removePath = () => {
    pathArr = [];
    localStorage.removeItem(PATHNAME);
};
