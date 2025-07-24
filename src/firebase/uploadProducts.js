
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";


const firebaseConfig = {
  apiKey: "AIzaSyC4Zvc3XH5l-C8P4c7uMT4cPEgRuO1YGFk",
  authDomain: "unique-retro-utn.firebaseapp.com",
  projectId: "unique-retro-utn",
  storageBucket: "unique-retro-utn.firebasestorage.app",
  messagingSenderId: "748475417748",
  appId: "1:748475417748:web:79690024139921d251e081"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, "data.json");

async function uploadProducts() {
  try {
    // Cargando y parseando 
    const rawData = readFileSync(dataPath, "utf-8");
    const products = JSON.parse(rawData);

    console.log("🔄 Uploading products to Firestore...");

    
    for (const product of products) {
      await addDoc(collection(db, "products"), product);
      console.log(`✅ ${product.name} (SKU: ${product.sku}) uploaded`);
    }

    console.log("🎉 All products uploaded successfully!");
    process.exit(0); // Éxito

  } catch (error) {
    console.error("❌ Critical error:", error.message);
    process.exit(1); // Error
  }
}

uploadProducts();
