
export const setStorage = (key, value) => {
    return window.localStorage.setItem(key, JSON.stringify(value));
}

export const getStorage = key => {
    return JSON.parse(window.localStorage.getItem(key));
}

export const removeStorage = key => {
    return window.localStorage.removeItem(key);
}