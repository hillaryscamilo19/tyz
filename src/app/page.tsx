import { LoginForm } from "@/components/login-form";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/api/authOptions";
import HomePage from "./dashboard/page";
export default async function LoginPage() {
 const session = await getServerSession(authOptions)

  if (session) {
  
  }

  return (
    <div >
      <div >
        <LoginForm />
      </div>
    </div>
  )
}
