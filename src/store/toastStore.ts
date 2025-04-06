import { User } from "firebase/auth";
import { create } from "zustand";

interface IToastStore {
  fireToast: (type: string, message: string) => void;
}

export const useToastStore = create<IToastStore>((set) => ({
  fireToast: (type: string, message: string) => {
    alert(message);
  },
}));
