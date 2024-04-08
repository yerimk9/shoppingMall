import Image from "next/image";
import React from "react";
import { notFoundImg } from "../../public/images";

function NotFoundPage() {
  return (
    <>
      <Image src={notFoundImg} alt="notFoundPage" fill objectFit="contain" />
    </>
  );
}

export default NotFoundPage;
