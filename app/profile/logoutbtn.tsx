"use client";
import { logout } from "../registro/actions";

export function LogoutBtn() {
  return (
    <button
      onClick={() => {
        logout();
      }}
    >
      Cerrar sesion
    </button>
  );
}
