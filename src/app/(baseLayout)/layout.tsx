"use client";
import { useAppSelector } from "@/redux/hooks";
import Footer from "./_components/Footer";
import Nav from "./_components/Nav";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const darkMode = useAppSelector((state) => state.DarkModeReducer.value);
  return (
    <div className={`${darkMode ? "dark" : "light"}`}>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
