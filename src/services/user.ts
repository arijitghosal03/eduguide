import { storage } from "@/firebase";
import { userCollectionRef } from "@/firebase/collection";
import { addDoc, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

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
  static uploadProfileImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Cloudinary upload failed");
    }

    return data.secure_url;
  };
}

export default UserService;
