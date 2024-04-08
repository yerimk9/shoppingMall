"use client";
import React from "react";
import Image from "next/image";
import { IconMoon, IconSun } from "../../../../public/svgs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeMode } from "@/redux/features/darkSlice";

function ThemeToggle() {
  const darkMode = useAppSelector((state) => state.DarkModeReducer.value);
  const dispatch = useAppDispatch();
  console.log(darkMode);

  return (
    <>
      {darkMode ? (
        <button
          type="button"
          className="fixed bottom-6 right-6 bg-gray-600 z-10 rounded-full h-14 w-14 flex items-center justify-center"
          onClick={() => dispatch(changeMode())}
        >
          <Image src={IconSun} alt="themeImg" />
        </button>
      ) : (
        <button
          type="button"
          className="fixed bottom-6 right-6 z-10 bg-gray-600 rounded-full h-14 w-14 flex items-center justify-center"
          onClick={() => dispatch(changeMode())}
        >
          <Image src={IconMoon} alt="themeImg" />
        </button>
      )}
    </>
  );
}

export default ThemeToggle;
