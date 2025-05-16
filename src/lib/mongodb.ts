import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Por favor define la variable MONGODB_URI en .env.local');
}

interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // Solo para entornos Node.js, evitar redefinir en cada importación
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnection | undefined;
}

// Aseguramos que cached siempre estará definido
const globalWithMongoose = global as typeof globalThis & {
  mongoose?: MongooseConnection;
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongoose!;

export async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
