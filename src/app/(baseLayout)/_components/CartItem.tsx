"use client";
import React, { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Carousel from "./Carousel";
import type { CartItem } from "../_types";
import getCartItems from "../_services/_localstorage/getCartItems";

function CartItem({ product }: { product: CartItem }) {
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async () => {
      const cartItems = await getCartItems();
      return cartItems;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

  const incrementItem = () => {
    let cartItems = getCartItems();
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    cartItems[existingItemIndex].counter += 1;

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    uploadMutation.mutate();
  };

  const decrementItem = () => {
    let cartItems = getCartItems();
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (cartItems[existingItemIndex].counter > 0) {
      cartItems[existingItemIndex].counter -= 1;
      if (cartItems[existingItemIndex].counter === 0) {
        cartItems.splice(existingItemIndex, 1);
      }
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      uploadMutation.mutate();
    }
  };

  return (
    <div className="p-4 border w-11/12 h-40 m-6 rounded-lg my-8 mx-auto">
      <div className="flex items-center gap-8 h-full">
        <div className="relative w-48 h-auto overflow-hidden p-3">
          <Carousel images={product.images} style={{ height: "120px" }} />
        </div>
        <div className="flex md:justify-between w-full">
          <div className="flex flex-col gap-4 justify-center">
            <p className="text-sm md:text-xl">{product.title}</p>
            <p className="font-medium md:text-lg">
              ${product.price * product.counter}
            </p>
          </div>
        </div>
        <div className="flex self-end">
          <button
            className="rounded-l-md border py-[11px] px-[12px] text-center text-base text-white font-m bg-slate-800 hover:bg-slate-700"
            onClick={decrementItem}
          >
            -
          </button>
          <div className="border-y py-[11px] px-[12px] text-center text-base font-medium">
            {product.counter}
          </div>
          <button
            className="rounded-r-md border py-[11px] px-[12px] text-center text-base text-white font-medium bg-slate-800 hover:bg-slate-700"
            onClick={incrementItem}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
