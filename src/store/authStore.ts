import { auth } from "@/firebase";
import { UserService } from "@/services";
import { cleanFirebaseError } from "@/utils";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { create } from "zustand";

interface IAuthStore {
  firebaseUser: User | null;
  authError: string | null;
  isAuthLoading: boolean;
  needsProfileCompletion: boolean | null;
  initAuth: () => void;
  setUser: (user: User) => void;
  firebaseRegistration: (email: string, password: string) => Promise<boolean>;
  firebaseLogin: (email: string, password: string) => Promise<boolean>;
  handleLogout: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  needsProfileCompletion: null,
  firebaseUser: null,
  isAuthLoading: true,
  authError: null,
  initAuth: () => {
    onAuthStateChanged(auth, (user) => {
      set({ firebaseUser: user, isAuthLoading: false });
    });
  },

  setUser: (firebaseUser: User) => set({ firebaseUser }),
  firebaseRegistration: async (email: string, password: string) => {
    try {
      const authRes = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      set({
        firebaseUser: authRes.user,
        needsProfileCompletion: true,
        authError: null,
      });
      return true;
    } catch (error: any) {
      set({ authError: error.message });
      return false;
    }
  },

  firebaseLogin: async (email: string, password: string) => {
    try {
      const authRes = await signInWithEmailAndPassword(auth, email, password);
      const isRegistered = await UserService.fetchByUid(authRes.user.uid);

      set({
        firebaseUser: authRes.user,
        authError: null,
        needsProfileCompletion: isRegistered ? false : true,
      });
      return true;
    } catch (error: any) {
      set({ authError: error.message });
      return false;
    }
  },

  handleLogout: async () => {
    await signOut(auth);
    set({ firebaseUser: null, needsProfileCompletion: null, authError: null });
  },
}));
