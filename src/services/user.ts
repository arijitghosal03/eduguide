import { userCollectionRef } from "@/firebase/collection";
import { getDocs, query, where } from "firebase/firestore";

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
}

export default UserService;
