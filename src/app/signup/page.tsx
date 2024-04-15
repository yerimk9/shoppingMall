"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconCancel } from "../../../public/svgs";
import Link from "next/link";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "@/firebase";
import { message } from "antd";
import { useAppSelector } from "@/redux/hooks";
import { FirebaseError } from "firebase/app";

function SignUp() {
  const [messageApi, contextHolder] = message.useMessage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordCheck: "",
  });
  const darkMode = useAppSelector((state) => state.DarkModeReducer.value);
  const router = useRouter();
  const auth = getAuth(app);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); // 정규표현식을 사용하여 문자열을 검사하는 메서드
    // 주어진 정규 표현식(email)에 대해 문자열을 테스트하고, 해당 문자열이 정규 표현식과 일치하는지 여부를 Boolean 값으로 반환
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailValid(formData.email)) {
      messageApi.open({
        type: "error",
        content: "유효하지 않은 이메일 주소입니다.",
      });
      return;
    }

    if (formData.password !== formData.passwordCheck) {
      messageApi.open({
        type: "error",
        content: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }

    if (formData.password.length < 6) {
      messageApi.open({
        type: "error",
        content: "비밀번호는 최소 6자 이상이어야 합니다.",
      });
      return;
    }
    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = createdUser.user;
      setFormData({
        email: "",
        password: "",
        passwordCheck: "",
      });
      messageApi.open({
        type: "success",
        content: `"${user.email}" 회원가입 완료`,
      });
      router.push("/login");
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === "auth/email-already-in-use") {
          messageApi.open({
            type: "error",
            content: "이미 사용중인 이메일 주소입니다.",
          });
        }
      }
    }
  };

  return (
    <div className={`${darkMode ? "dark" : "light"}`}>
      <div className="p-6" x-data="app">
        {contextHolder}
        <div className="flex w-full justify-between">
          <Link href="/">
            <Image
              src={IconCancel}
              alt="cancel"
              className="h-7 w-7 cursor-pointer text-gray-400 hover:text-gray-300"
            />
          </Link>

          <div>
            <Link
              href="/login"
              className="rounded-2xl border-b-2 border-b-gray-300 bg-white px-4 py-3 font-bold text-blue-500 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200 dark:text-slate-800"
            >
              LOGIN
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 top-1/4 mx-auto max-w-sm  text-center">
          <div x-show="isLoginPage" className="">
            <div className="mb-3 text-2xl font-bold">Create your profile</div>
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="my-4 w-full border-none bg-transparent outline-none focus:outline-none"
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="my-4 w-full border-none bg-transparent outline-none focus:outline-none"
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                <input
                  type="password"
                  placeholder="Password Check"
                  name="passwordCheck"
                  onChange={handleInputChange}
                  className="my-4 w-full border-none bg-transparent outline-none focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-4 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-b-slate-900 dark:active:border-b-slate-700"
              >
                CREATE ACCOUNT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
