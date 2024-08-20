"use server";
import { prisma } from "@/prisma/client";
import { SignupFormSchema } from "./definitions";
import { createSession, deleteSession } from "./sessions";
import { FormState } from "./definitions";
import { redirect } from "next/navigation";
import { errors } from "jose";
import { errorMonitor } from "events";
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
  console.log(password);
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name: username, email: email, password: hashedPassword },
  });
  if (!user) return { message: "No se pudo crear el usuario" };
  await createSession(user.id);
  redirect("/profile");
}

export async function login(formData: FormData) {
  const bcrypt = require("bcrypt");
  const email = formData.get("email");
  const users = await prisma.user.findMany({
    select: { email: true, password: true, id: true },
  });
  let valid_login: boolean = false;
  let user: number = -1;
  users.forEach((element) => {
    if (
      element.email === email &&
      bcrypt.compare(formData.get("password"), element.password)
    ) {
      valid_login = true;
      user = element.id;
    }
  });
  if (valid_login) {
    try {
      await createSession(user);
      redirect("/profile");
    } catch (error) {
      console.log("Error:" + error);
    }
  }
}
export async function logout() {
  deleteSession();
  redirect("/");
}
