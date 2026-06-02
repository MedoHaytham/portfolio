import LoginForm from "./LoginForm";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const auth = await verifyAuth();
  if (auth) {
    redirect("/admin");
  }

  return <LoginForm />;
}
