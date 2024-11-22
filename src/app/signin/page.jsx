import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import SignInForm from "./SigninPage";

async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export default async function SignInPage() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (accessToken) {
    const isValid = await verifyToken(accessToken.value);
    if (isValid) {
      redirect("/backend");
    }
  }

  return <SignInForm />;
}
