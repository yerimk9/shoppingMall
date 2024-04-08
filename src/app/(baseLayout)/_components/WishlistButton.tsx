"use client";
import React, { useEffect, useState } from "react";
import { Product, WishlistButtonProps } from "../_types";
import getWishListItems from "../_services/_localstorage/getWIshList";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function WishlistButton({ product }: WishlistButtonProps) {
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async () => {
      const wishListItems = await getWishListItems();
      return wishListItems;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishListItems"] });
    },
  });

  const [isInWish, setIsInWish] = useState(false);

  const addToWishlist = () => {
    let wishListItems = getWishListItems();
    const existingItemIndex = wishListItems.findIndex(
      (item: Product) => item.id === product.id
    );
    if (existingItemIndex === -1) {
      wishListItems.push(product);
    } else {
      wishListItems.splice(existingItemIndex, 1);
    }
    localStorage.setItem("wishList", JSON.stringify(wishListItems));
    setIsInWish((prev) => !prev);
    uploadMutation.mutate(); // 데이터 수정 후 쿼리 갱신
  };

  useEffect(() => {
    let wishListItems = getWishListItems();
    const isWish = wishListItems.some(
      (item: Product) => item.id === product.id
    );
    setIsInWish(isWish);
  }, [product]);

  return (
    <button
      className="border border-black p-2 rounded dark:bg-white"
      onClick={addToWishlist}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        className={`bi bi-heart-fill fill-gray-400 hover:fill-red-500  ${
          isInWish ? "fill-red-500" : ""
        }`}
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
        />
      </svg>
    </button>
  );
}

export default WishlistButton;
