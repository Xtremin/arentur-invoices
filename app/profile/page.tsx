import { LogoutBtn } from "./logoutbtn";
import { getUser } from "../_lib/dal";

export default async function Home() {
  const user = await getUser();
  return (
    <div>
      <h1>{user?.name}</h1>
      <LogoutBtn />
    </div>
  );
}
