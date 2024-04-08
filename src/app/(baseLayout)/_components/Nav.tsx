"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getCartItems from "../_services/_localstorage/getCartItems";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "@/firebase";
import { message } from "antd";
import { useSession } from "next-auth/react";
import { signOut as nextSignOut } from "next-auth/react";

function Nav() {
  const [isOpen, setIsOpen] = useState(false); // 메뉴 표시 여부
  const [cartItemCounter, setCartItemCounter] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messageApi, messageHolder] = message.useMessage();
  const auth = getAuth(app);
  const { data: session } = useSession();

  const { data: cartItems } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    retry: 0,
  });

  const toggleMenuDropdown = () => {
    setIsOpen(!isOpen);
  };

  const onSignOut = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      if (session) {
        nextSignOut();
      }
      messageApi.open({
        type: "success",
        content: "로그아웃 되었습니다.",
      });
    } catch (error: any) {
      console.error(error);
      messageApi.open({
        type: "error",
        content: "로그아웃 실패.",
      });
    }
  };

  useEffect(() => {
    let totalCounter = 0;

    // cartItems 배열이 존재하고 비어있지 않은 경우에만 순회
    if (cartItems && cartItems.length > 0) {
      cartItems.forEach((item) => {
        totalCounter += item.counter; // 각 cartItem의 counter 값을 누적
      });
    }
    setCartItemCounter(totalCounter);
  }, [cartItems]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [auth]);

  return (
    <div className="flex items-center justify-between flex-wrap p-4 border-b-2 dark:bg-slate-800 dark:text-white">
      {messageHolder}
      <div className="flex items-center flex-shrink-0 mr-6">
        <span className="font-semibold text-2xl tracking-tight">LOGO</span>
      </div>
      <div className="block lg:hidden">
        <button
          className="px-3 py-2 border rounded text-slate-800 border-slate-600 shadow dark:text-white"
          onClick={toggleMenuDropdown}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full ${
          isOpen || `hidden`
        } flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-sm lg:flex-grow">
          <Link
            href="/"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-stone-400 mr-4"
          >
            Home
          </Link>
          <Link
            href="/products/all"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-stone-400 mr-4"
          >
            Store
          </Link>
          <Link
            href="/cart"
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-stone-400"
          >
            Cart
            {cartItemCounter !== 0 && (
              <span className="rounded-full bg-red-50 px-2 py-1 m-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                {cartItemCounter}
              </span>
            )}
          </Link>
        </div>
        <div className="flex items-center gap-4 mt-2 lg:mt-0">
          <Link href="/wishList">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              className="bi bi-heart-fill fill-gray-400 hover:fill-red-500"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
              />
            </svg>
          </Link>
          {isLoggedIn || session ? (
            <button
              type="button"
              className="bg-slate-800 hover:bg-slate-950 text-white font-bold py-2 px-6 rounded dark:bg-white dark:text-slate-800"
              onClick={onSignOut}
            >
              LogOut
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded dark:bg-white dark:text-slate-800"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
