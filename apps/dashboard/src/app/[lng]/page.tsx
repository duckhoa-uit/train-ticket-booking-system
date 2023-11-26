import { SignOutButton } from "./auth/sign-out-button";

export default async function Home() {
  // const res = await get("http://localhost:8081/api/users/me");
  // console.log("🚀 ~ file: page.tsx:13 ~ ; ~ res:", res);

  return (
    <main>
      <SignOutButton />
    </main>
  );
}
