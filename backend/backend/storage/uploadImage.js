import { getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../firebase/firebase";

const storage = getStorage(app);

export async function uploadProductImage(file) {
  const imageRef = ref(
    storage,
    `products/${file.name}`
  );

  return await uploadBytes(
    imageRef,
    file
  );
}
