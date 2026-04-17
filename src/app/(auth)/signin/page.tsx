import { auth } from "@/lib/auth";
import SignInActions from "./SignInActions";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <main className="w-full">
      <SignInActions />
    </main>
  );
}
