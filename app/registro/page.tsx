import { SignupForm } from "./form";
import { cookies } from "next/headers";
import { decrypt } from "../_lib/sessions";
export default function Home() {
  return (
    <div className="">
      <SignupForm></SignupForm>
    </div>
  );
}
