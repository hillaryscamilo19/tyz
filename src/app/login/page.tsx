import { LoginForm } from "@/components/login-form"
import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/api/authOptions" 

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark w-full h-full flex" >
      <div className="items-center h-auto m-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <LoginForm />
      </div>
    </div>
  )
}
