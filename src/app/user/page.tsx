import { auth, signOut } from "@/auth";

export default async function UserPage() {
  // 从session中获取登录信息
  const session = await auth();

  return (
    <div>
      {session?.user ? (
        <>
          <p>{JSON.stringify(session.user)}</p>
          <form
            action={async () => {
              "use server";
              // 退出登录后，重定向首页
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="border border-solid border-red-500">
              退出登录
            </button>
          </form>
        </>
      ) : (
        <p>未登录</p>
      )}
    </div>
  );
}
