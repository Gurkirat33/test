"use client";

import { useActionState, useTransition } from "react";
import { loginAction } from "@/actions/loginAction";
import { useRouter } from "next/navigation";

const initialState = { message: null, error: null };

export default function SignIn() {
  const router = useRouter();
  const [state, action] = useActionState(loginAction, initialState);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex min-h-screen items-center justify-center bg-white py-32 text-black dark:bg-primary-900 dark:text-white">
      <form
        action={action}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          startTransition(async () => {
            console.time("loginAction");
            const result = await action({
              username: formData.get("username"),
              password: formData.get("password"),
            });
            console.timeEnd("loginAction");
            if (result?.success) {
              router.push("/backend");
            }
          });
        }}
        className="w-full max-w-sm rounded-lg bg-slate-200 p-6 shadow-md dark:bg-primary-800"
      >
        <h2 className="mb-4 text-center text-xl font-bold">Login</h2>

        {state?.error && (
          <div className="mb-4 text-sm text-red-500">{state.error}</div>
        )}

        <div className="mb-6">
          <label htmlFor="username" className="mb-2 block text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            placeholder="Enter your username"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter your password"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 disabled:bg-blue-300"
        >
          {isPending ? "Signing in..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
