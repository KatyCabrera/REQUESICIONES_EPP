const jwtToken = "jwtToken";

export function setToken(token) {
    window.localStorage.setItem(jwtToken, token);
}

export function getToken() {
    return window.localStorage.getItem(jwtToken);
}

export function deleteToken() {
    window.localStorage.removeItem(jwtToken);
}