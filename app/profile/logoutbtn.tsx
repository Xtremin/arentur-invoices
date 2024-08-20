"use client";
import { logout } from "../_lib/actions";

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
