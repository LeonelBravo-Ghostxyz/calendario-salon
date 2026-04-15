import { MongoClient } from 'mongodb';

// Usamos import.meta.env para que Astro lea tu archivo .env correctamente
const uri = import.meta.env.MONGODB_URI || process.env.MONGODB_URI;

// Si la variable no existe, frenamos la app con un error claro
if (!uri) {
  throw new Error("Por favor, añade tu MONGODB_URI al archivo .env en la raíz del proyecto.");
}

const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (import.meta.env.DEV) {
  // En desarrollo usamos una variable global para no saturar la base de datos con cada guardado
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };
  
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // En producción (Vercel)
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;