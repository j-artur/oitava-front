export function storeToken(token: string) {
  if (window) {
    window.localStorage.setItem("oitava.token", token);
  }
}

export function getToken() {
  if (window) {
    return window.localStorage.getItem("oitava.token");
  } else {
    return null;
  }
}

export function removeToken() {
  if (window) {
    window.localStorage.removeItem("oitava.token");
  }
}
