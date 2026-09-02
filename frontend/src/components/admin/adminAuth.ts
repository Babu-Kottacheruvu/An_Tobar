const AUTH_KEY = "antobar-admin-authenticated";

export function isAdminAuthenticated(): boolean {
  try {
    return window.sessionStorage.getItem(AUTH_KEY) === "true";
  } catch {
    return false;
  }
}

export function setAdminAuthenticated(value: boolean) {
  try {
    if (value) {
      window.sessionStorage.setItem(AUTH_KEY, "true");
    } else {
      window.sessionStorage.removeItem(AUTH_KEY);
    }
  } catch {
    // sessionStorage unavailable - this prototype gate simply won't persist
  }
}
