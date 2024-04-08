"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { IconCart } from "../../../../public/svgs";
import { CartItem, Product } from "../_types";
import getCartItems from "../_services/_localstorage/getCartItems";

function ItemDescription({ product }: { product: Product }) {
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

  const addToCartItem = () => {
    let cartItems = getCartItems();
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );
    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].counter += 1;
    } else {
      const newItem: CartItem = { ...product, counter: 1 };
      cartItems.push(newItem);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    uploadMutation.mutate();
  };

  return (
    <div className="border-2 px-6 pt-12 pb-8 rounded-xl lg:h-[500px]">
      <div className="flex flex-col gap-3 lg:gap-12">
        <div className="flex flex-col gap-3">
          <h1 className="text-lg font-medium lg:text-3xl">{product.title}</h1>
          <p className="text-sm text-gray-400 font-light lg:text-lg">
            Category: {product.category}
          </p>
          <p className="text-sm text-gray-400 font-light lg:text-base lg:leading-relaxed">
            {product.description}
          </p>
        </div>
        <div className="flex justify-between items-center p-3">
          <p className="text-xl font-medium lg:text-2xl">{product.price}$</p>
          <button
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-950 text-white text-sm py-2 px-4 rounded lg:text-lg"
            onClick={addToCartItem}
          >
            <Image src={IconCart} alt="cart" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDescription;
