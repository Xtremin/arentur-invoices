"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signup } from "../_lib/actions";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "flowbite-react";
import SubmitBtn from "../_ui/submitBtn";
export function SignupForm() {
  const [state, action, isValid] = useFormState(signup, undefined);
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            src={"/arentur.svg"}
            alt="Arentur"
            width={600}
            height={600}
            priority
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registro de cuenta
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="my-2 text-center">
            {state?.message && (
              <p className="font-semibold text-red-400">{state.message}</p>
            )}
          </div>
          <form action={action} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nombre de usuario
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
              {state?.errors?.username && (
                <p className="font-semibold text-red-400">
                  {state.errors.username}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
              />
              {state?.errors?.email && (
                <p className="font-semibold text-red-400">
                  {state.errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contraseña
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
              {state?.errors?.password && (
                <div>
                  <p className="font-semibold text-red-400">
                    La contraseña debe:
                  </p>
                  <ul>
                    {state.errors.password.map((error) => (
                      <li key={error} className="font-semibold text-red-400">
                        - {error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-7">
              <SubmitBtn label={"Registrar usuario"} />
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            Ya tiene cuenta?
            <Link
              href="/autenticar"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500 ml-2"
            >
              Inicie sesión
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
