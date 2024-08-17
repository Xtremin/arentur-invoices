"use server";
import { prisma } from "@/prisma/client";
import { SignupFormSchema } from "../_lib/definitions";
import { createSession, deleteSession } from "../_lib/sessions";
import { FormState } from "../_lib/definitions";
import { redirect } from "next/navigation";
export async function signup(state: FormState, formData: FormData) {
  //validando
  const validationResult = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validationResult.success) {
    return { errors: validationResult.error.flatten().fieldErrors };
  }
  const { username, email, password } = validationResult.data;
  //creando usuario bd
  const bcrypt = require("bcrypt");
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name: username, email: email, password: hashedPassword },
  });
  if (!user) return { message: "No se pudo crear el usuario" };
  await createSession(user.id);
  redirect("/profile");
}
export async function logout() {
  deleteSession();
  redirect("/");
}
