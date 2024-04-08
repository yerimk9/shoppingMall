"use client";
import React, { useEffect, useState } from "react";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import getCartItems from "../../_services/_localstorage/getCartItems";
import CartItem from "../../_components/CartItem";
import Image from "next/image";
import { IconCart } from "../../../../../public/svgs";
import { getAuth } from "firebase/auth";
import { app } from "@/firebase";
import { message } from "antd";
import { useSession } from "next-auth/react";

function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [messageApi, messageHolder] = message.useMessage();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const auth = getAuth(app);

  const { data: cartItems } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    retry: 0,
  });

  const removeCartItem = async () => {
    const user = auth.currentUser;
    if (user || session) {
      messageApi.open({
        type: "success",
        content: "구매가 완료되었습니다.",
      });
      localStorage.removeItem("cartItems");
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    } else {
      messageApi.open({
        type: "error",
        content: "로그인시에만 구매가 가능합니다.",
      });
    }
  };

  useEffect(() => {
    let total = 0;
    if (cartItems) {
      total = cartItems.reduce((acc, el) => acc + el.price * el.counter, 0);
    }
    setTotalPrice(total);
  }, [cartItems]);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="bg-gray-200 p-10">
        <div className="flex flex-col items-center gap-10">
          <Image src={IconCart} alt="cart" width={400} height={400} />
          <div className="text-3xl font-bold text-white drop-shadow-sm">
            장바구니에 담긴 상품이 없습니다.
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {messageHolder}
      {cartItems?.map((item) => (
        <div key={item.id}>
          <CartItem product={item} />
        </div>
      ))}
      <div className="flex items-center justify-end gap-5 px-10 pb-10">
        <div className="text-2xl font-medium">합계 : ${totalPrice}</div>
        <button
          className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded"
          onClick={removeCartItem}
        >
          구매하기
        </button>
      </div>
    </div>
  );
}

export default Cart;
