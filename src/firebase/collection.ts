import { collection } from "firebase/firestore";
import { db } from ".";

export const userCollectionRef = collection(db, "users");
