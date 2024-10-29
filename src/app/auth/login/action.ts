"use server";
import { signIn } from "@/auth";
import { prisma } from "@/lib/db";
import { AuthError } from "next-auth";
import { NextRequest } from "next/server";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export const login = async (values: any) => {
  console.log("0, ", values);
  const existUser = await prisma.user.findUnique({
    where: {
      email: values.email,
    },
  });

  if (!existUser || !existUser.email) {
    return {
      error: "用户名不存在",
    };
  }
  console.log("1");
  try {
    await signIn("credentials", {
      ...values,
      redirectTo: "/user",
    });
    // return {
    //   msg: "登录成功",
    // };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "用户名或密码错误",
      };
    }

    // 这里一定要抛出异常，不然成功登录后不会重定向
    throw error;
  }
};
