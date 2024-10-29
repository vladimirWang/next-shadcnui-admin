"use server";
import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export const register = async (values: any) => {
  const existUser = await prisma.user.findUnique({
    where: {
      email: values.email,
    },
  });

  if (existUser) {
    return {
      error: "当前邮箱已存在！",
    };
  }

  const hashedPassword = await bcrypt.hash(values.password, 10);
  //   const { email, ...rest } = values;
  await prisma.user.create({
    data: {
      name: values.username,
      password: hashedPassword,
      email: values.email,
    },
  });

  return {
    msg: "注册成功",
  };
};
