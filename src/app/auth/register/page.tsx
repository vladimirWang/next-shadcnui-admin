"use client";
import Link from "next/link";
import { register } from "./action";

export default function LoginPage() {
  return (
    <div>
      <Link href="/auth/login">去登录</Link>
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
            const res = await register(values);
            console.log(res, "register resp");
          } catch (error) {
            console.log("register error: ", error);
          }
        }}
        method="post"
      >
        <div>
          <label htmlFor="">username</label>
          <input
            type="text"
            name="username"
            placeholder="usename"
            defaultValue={"mike"}
          />
        </div>
        <br />
        <div>
          <label htmlFor="">password</label>
          <input
            type="text"
            name="password"
            placeholder="password"
            defaultValue={"123456"}
          />
        </div>
        <br />
        <div>
          <label htmlFor="">email</label>
          <input
            type="text"
            name="email"
            placeholder="email"
            defaultValue={"413@qq.com"}
          />
        </div>
        <button className="bg-green-600" type="submit">
          register submit
        </button>
      </form>
    </div>
  );
}
