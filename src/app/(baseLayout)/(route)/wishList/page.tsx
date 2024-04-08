"use client";
import React from "react";
import { Product } from "../../_types";
import ProductCard from "../../_components/ProductCard";
import getWishListItems from "../../_services/_localstorage/getWIshList";
import { useQuery } from "@tanstack/react-query";

function WishList() {
  const { data: wishListItems } = useQuery({
    queryKey: ["wishListItems"],
    queryFn: getWishListItems,
    retry: 0,
  });

  return (
    <div>
      <div className="text-3xl font-medium text-gray-600 bg-gray-100 px-10 py-4">
        WISHLIST
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10 my-0 mx-auto gap-10">
        {wishListItems?.map((product: Product) => (
          <div key={product.id} className="">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishList;
