"use client";

import { useEffect, useState } from "react";

/** Demo session flag — no real auth backend yet. */
export const LOGGED_IN_KEY = "rastejnik-logged-in";

/** Parent/child intake completed once in this browser. */
export const ONBOARDED_KEY = "rastejnik-onboarded";

const AUTH_CHANGE_EVENT = "rastejnik-auth-change";

function notifyAuthChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(LOGGED_IN_KEY) === "true";
}

export function isOnboarded(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(ONBOARDED_KEY) === "true";
}

/** Mark the browser as a logged-in parent (demo). */
export function login() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOGGED_IN_KEY, "true");
  notifyAuthChange();
}

/** Finish registration + parent/child forms, then enter the app as logged in. */
export function completeOnboarding() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ONBOARDED_KEY, "true");
  window.localStorage.setItem(LOGGED_IN_KEY, "true");
  notifyAuthChange();
}

export function logout() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOGGED_IN_KEY, "false");
  notifyAuthChange();
}

/** Reactive read of the demo session for client components. */
export function useMockAuth() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    function sync() {
      setLoggedIn(isLoggedIn());
    }
    sync();
    window.addEventListener(AUTH_CHANGE_EVENT, sync);
    window.addEventListener("storage", sync);
    window.addEventListener("pageshow", sync);
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, sync);
      window.removeEventListener("storage", sync);
      window.removeEventListener("pageshow", sync);
    };
  }, []);

  return loggedIn;
}
