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

interface IProfileDetails {
  name: string;
  rollNumber: string;
  classGrade: string;
  school: string;
  academicYear: string;
  subjects: string[];
  profileImage: string;
}

interface IAuthStore {
  firebaseUser: User | null;
  authError: string | null;
  isAuthLoading: boolean;
  needsProfileCompletion: boolean | null;
  profileDetails: IProfileDetails | null;
  initAuth: () => void;
  setProfileDetails: (profileDetails: IProfileDetails) => Promise<void>;
  firebaseRegistration: (email: string, password: string) => Promise<boolean>;
  firebaseLogin: (email: string, password: string) => Promise<boolean>;
  handleLogout: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  needsProfileCompletion: null,
  firebaseUser: null,
  isAuthLoading: true,
  authError: null,
  profileDetails: null,
  initAuth: () => {
    onAuthStateChanged(auth, (user) => {
      set({ firebaseUser: user, isAuthLoading: false });
    });
  },

  setProfileDetails: async (profileDetails: IProfileDetails) =>
    set({ profileDetails }),

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
      const registeredUser = await UserService.fetchByUid(authRes.user.uid);

      if (registeredUser) delete registeredUser.uid;

      set({
        firebaseUser: authRes.user,
        authError: null,
        needsProfileCompletion: registeredUser ? false : true,
        profileDetails: registeredUser ? registeredUser : null,
      });
      return true;
    } catch (error: any) {
      console.log(error);
      set({ authError: error.message });
      return false;
    }
  },

  handleLogout: async () => {
    await signOut(auth);
    set({
      firebaseUser: null,
      needsProfileCompletion: null,
      authError: null,
      profileDetails: null,
    });
  },
}));
