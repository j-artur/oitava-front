export function storeToken(token: string) {
  if ("window" in globalThis) {
    window.localStorage.setItem("oitava.token", token);
  }
}

export function getToken() {
  if ("window" in globalThis) {
    return window.localStorage.getItem("oitava.token");
  } else {
    return null;
  }
}

export function removeToken() {
  if ("window" in globalThis) {
    window.localStorage.removeItem("oitava.token");
  }
}
