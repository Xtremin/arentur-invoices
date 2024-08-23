"use client";

import { useFormState } from "react-dom";
import { login } from "../_lib/actions";
import Image from "next/image";
import Link from "next/link";
import { Spinner } from "flowbite-react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Alert } from "flowbite-react";
import SubmitBtn from "../_ui/submitBtn";

export function LoginForm() {
  const [state, action] = useFormState(login, undefined);
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
          <h2 className="mt-10 text-center text-5xl font-bold leading-9 tracking-tight text-gray-900">
            Iniciar sesión
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="my-2 text-center">
            {state?.message && (
              <Alert color="failure" icon={ExclamationCircleIcon}>
                <span className="font-medium me-2">Error!</span>
                {state.message}
              </Alert>
            )}
          </div>
          <form action={action} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium leading-6 text-gray-900"
              >
                Correo Electrónico
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-md font-medium leading-6 text-gray-900"
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
            </div>

            <div className="pt-7">
              <SubmitBtn label="Iniciar sessión" />
            </div>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
            No tiene cuenta?
            <Link
              href="/registro"
              className="font-semibold leading-6 text-blue-600 hover:text-blue-500 ml-3"
            >
              Cree una cuenta
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
