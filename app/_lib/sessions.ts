import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma } from "@/prisma/client";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.SECRET);

//crear sesion en base de datos

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function createSession(userId: number) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const datasession = await prisma.session.create({
    data: { userId: userId, expiresAt: expires },
  });

  const sessionid = datasession.id;

  const session = await encrypt({ sessionid, expires });
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

/*export async function verifySession() {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!payload?.sessionid) {
    redirect("/login");
  }
  return { sessionId: payload.sessionid };
}
*/

export async function updateSession() {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  {
    cookies().delete("session");
  }
}
