import { z } from "zod";

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'El nombre de usuario debe contener al menos 2 caracteres' })
    .trim(),
  email: z.string().email({ message: 'Dirección de correo invalida' }).trim(),
  password: z
    .string()
    .min(8, { message: 'tener al menos 8 caracteres' })
    .regex(/[a-zA-Z]/, { message: 'tener al menos una letra' })
    .regex(/[0-9]/, { message: 'tener al menos un digito' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'tener al menos un caractér especial (*+_ etc)',
    })
    .trim(),
})
export type FormState =
  | {
      errors?: {
        username?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
