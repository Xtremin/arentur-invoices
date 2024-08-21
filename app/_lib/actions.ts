"use server";
import { prisma } from "@/prisma/client";
import { SignupFormSchema } from "./definitions";
import { createSession, deleteSession } from "./sessions";
import { FormState } from "./definitions";
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
  try {
    const user = await prisma.user.create({
      data: { name: username, email: email, password: hashedPassword },
    });
    await createSession(user.id);
  } catch (error) {
    console.log(error);
    return {
      message:
        "Ocurrió un error durante la creación del usuario. Inténtelo mas tarde",
    };
  }
  redirect("/profile");
}

export async function login(state: FormState, formData: FormData) {
  const bcrypt = require("bcrypt");
  const email = formData.get("email");
  try {
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
  } catch (error) {
    return { message: "No se pudo autenticar el usuario" };
  }
}
export async function logout() {
  deleteSession();
  redirect("/");
}
