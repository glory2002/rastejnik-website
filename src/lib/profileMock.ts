/** Demo parent profile persisted in localStorage — no real backend yet. */

export const PROFILE_KEY = "rastejnik-profile";

export interface ParentProfile {
  email: string;
  name: string;
  birthDate: string;
  gender: string;
  ethnicity: string;
  maritalStatus: string;
  role: string;
  city: string;
  education: string;
  extendedFamily: string;
  childrenCount: string;
}

export const defaultProfile: ParentProfile = {
  email: "maria@example.com",
  name: "Мария Иванова",
  birthDate: "1992-04-12",
  gender: "Жена",
  ethnicity: "",
  maritalStatus: "Женена / омъжена",
  role: "Родител",
  city: "София",
  education: "Висше",
  extendedFamily: "",
  childrenCount: "1",
};

export function loadProfile(): ParentProfile {
  if (typeof window === "undefined") return { ...defaultProfile };
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return { ...defaultProfile };
    return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {
    return { ...defaultProfile };
  }
}

export function saveProfile(profile: ParentProfile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}
