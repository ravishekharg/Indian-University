import { useMemo } from "react";

/**
 * Reads the JWT already stored by Login.js and decodes its payload for
 * display purposes only (e.g. showing the signed-in username). This is
 * NOT a security boundary - the backend independently verifies the
 * signature on every request; this hook just avoids a second network
 * round trip to find out who's signed in.
 */
function decodePayload(token) {
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function useAuth() {
  const token = localStorage.getItem("token");

  return useMemo(() => {
    if (!token) {
      return { isAuthenticated: false, username: null };
    }
    const payload = decodePayload(token);
    const expired = payload?.exp && Date.now() / 1000 > payload.exp;
    if (!payload || expired) {
      return { isAuthenticated: false, username: null };
    }
    return { isAuthenticated: true, username: payload.user };
  }, [token]);
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/login";
}
