import { useFormStatus } from "react-dom";
import { Spinner } from "flowbite-react";
export default function SubmitBtn({ label }: { label: String }) {
  const status = useFormStatus();
  return (
    <button
      disabled={status.pending}
      type="submit"
      className={
        status.pending
          ? "flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-blue-600 shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          : "flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      }
    >
      {status.pending ? <Spinner color={"info"} /> : label}
    </button>
  );
}
