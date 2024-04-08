"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IconCancel } from "../../../public/svgs";
import Link from "next/link";
import { message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { app } from "@/firebase";
import { useAppSelector } from "@/redux/hooks";
import { signIn } from "next-auth/react";

function Login() {
  const [messageApi, messageHolder] = message.useMessage();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [findEmail, setFindEmail] = useState("");
  const darkMode = useAppSelector((state) => state.DarkModeReducer.value);

  const auth = getAuth(app);
  const router = useRouter();

  const findPassword = () => {
    sendPasswordResetEmail(auth, findEmail)
      .then(() => {
        messageApi.open({
          type: "success",
          content: "요청하신 이메일로 재설정 메일을 전송했습니다.",
        });
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
      });
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindEmail(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      messageApi.open({
        type: "success",
        content: "로그인 성공",
      });
      router.push("/");
    } catch (e: any) {
      messageApi.open({
        type: "error",
        content: "로그인 실패",
      });
      console.error(e.code);
    }
  };

  return (
    <div className={`${darkMode ? "dark" : "light"} p-6`}>
      {messageHolder}
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
            href="/signup"
            className="rounded-2xl border-b-2 border-b-gray-300 bg-white px-4 py-3 font-bold text-blue-500 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200 dark:text-slate-800"
          >
            SIGN UP
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 top-1/4 mx-auto max-w-sm space-y-4 text-center">
        <div className="space-y-4">
          <div className="mb-3 text-2xl font-bold">Log in</div>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex w-full items-center space-x-2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="my-3 w-full border-none bg-transparent outline-none"
              onChange={handleInputChange}
            />
            <button
              onClick={toggleModal}
              className="font-medium text-gray-400 hover:text-gray-500"
            >
              FORGOT?
            </button>
          </div>
          {isModalOpen && (
            <div className="fixed inset-[-50px] flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="z-50 bg-white p-8 rounded-lg shadow-lg border-t-2 border-red-500 w-96">
                <div className="flex flex-col gap-4 items-start">
                  <div className="flex justify-between w-full">
                    <div className="text-xl font-bold">비밀번호 재설정</div>
                    <Image
                      src={IconCancel}
                      alt="cancel"
                      className="cursor-pointer text-gray-400 hover:text-gray-300"
                      onClick={toggleModal}
                    />
                  </div>

                  <div className="text-base font-light">
                    회원가입한 이메일을 입력해주세요.
                  </div>
                  <div className="border border-gray-300 p-2 rounded-lg w-full text-medium font-light">
                    <input
                      type="text"
                      name="findEmail"
                      placeholder="Email"
                      className="outline-0 w-full"
                      onChange={handleEmail}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-3">
                  <Button
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={findPassword}
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-b-slate-900 dark:active:border-b-slate-700"
            onClick={onSubmit}
          >
            LOG IN
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <hr className="w-full border border-gray-300" />
          <div className="font-semibold text-gray-400">OR</div>
          <hr className="w-full border border-gray-300" />
        </div>

        <footer>
          <div className="grid">
            <button
              onClick={() => signIn("kakao", { callbackUrl: "/" })}
              type="button"
              className="rounded-2xl border-b-4 border-b-yellow-500 bg-yellow-400 px-4 py-2.5 font-bold text-black  hover:bg-yellow-300 active:translate-y-[0.125rem] active:border-b-gray-100"
            >
              KaKao
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Login;
