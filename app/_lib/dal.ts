import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/app/_lib/sessions";
import { cache } from "react";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma/client";

export const verifySession = cache(async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.sessionid) {
    redirect("/autenticar");
  }
  const userId = await prisma.session.findUnique({
    where: { id: session.sessionid },
  });

  return { isAuth: true, userId: userId?.userId };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const data = await prisma.user.findMany({ where: { id: session.userId } });
    const user = data[0];
    return user;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
