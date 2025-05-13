import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ message: "Credenciales incompletas" }, { status: 400 });
  }

  const db = await dbConnect();
  const user = await db.collection("users").findOne({ username });

  if (!user) {
    return NextResponse.json({ message: "Usuario no encontrado" }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ message: "Contraseña incorrecta" }, { status: 401 });
  }

  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET || "clave-super-secreta", // ⚠️ cambia esto
    { expiresIn: "1d" }
  );

  return NextResponse.json({ token });
}
