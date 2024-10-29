"use client";
import Link from "next/link";
import { login } from "./action";

export default function LoginPage() {
  return (
    <div>
      <Link href="/auth/register">去注册</Link>
      <form
        className="flex flex-col gap-1/2 w-[300px]"
        onSubmit={async (e) => {
          e.preventDefault();
          //   console.log("submit", );
          const fd = new FormData(e.currentTarget);
          const values = {
            username: fd.get("username"),
            password: fd.get("password"),
            email: fd.get("email"),
          };
          try {
            const res = await login(values);
            console.log(res, "login resp");
          } catch (error) {
            console.log("register error: ", error);
          }
        }}
        method="post"
      >
        <div>
          <label htmlFor="">email</label>
          <input
            type="text"
            name="email"
            placeholder="email"
            defaultValue={"4132@qq.com"}
          />
        </div>

        <div>
          <label htmlFor="">password</label>
          <input
            type="text"
            name="password"
            placeholder="password"
            defaultValue={"123456"}
          />
        </div>
        <button className="bg-red-600" type="submit">
          login submit
        </button>
      </form>
    </div>
  );
}
