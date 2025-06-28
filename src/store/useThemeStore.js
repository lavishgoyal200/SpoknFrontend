import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("spokn-theme") || "night",
  setTheme: (theme) => {
    localStorage.setItem("spokn-theme",theme);
    set({theme})
  }
}))