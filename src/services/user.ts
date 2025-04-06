import { userCollectionRef } from "@/firebase/collection";
import { addDoc, getDocs, query, where } from "firebase/firestore";

class UserService {
  static fetchByUid = async (uid: string) => {
    const users = [];

    (await getDocs(query(userCollectionRef, where("uid", "==", uid)))).forEach(
      (doc) => {
        users.push(doc.data());
      }
    );

    return users ? users[0] : null;
  };

  static createUser = async (userObj: any) => {
    await addDoc(userCollectionRef, userObj);
  };
}

export default UserService;
