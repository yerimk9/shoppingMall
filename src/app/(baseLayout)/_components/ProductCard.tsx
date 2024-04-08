import React from "react";
import Carousel from "./Carousel";
import Link from "next/link";
import WishlistButton from "./WishlistButton";
import { ProductProps } from "../_types";

function ProductCard({ product }: ProductProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl overflow-hidden shadow-lg  h-full dark:bg-slate-800">
      <Carousel images={product.images} />
      <div className="px-4 py-4">
        <div className="font-bold text-lg mb-2 truncate dark:text-white">
          {product.title}
        </div>
        <p className="text-gray-400 text-sm line-clamp-3">
          {product.description}
        </p>
      </div>
      <div className="flex items-baseline justify-between px-6 pt-4 pb-2">
        <div className="font-medium text-xl text-center dark:text-white">
          {product.price}$
        </div>
        <div className="flex gap-2 mb-3">
          <Link
            href={`/product/${product.id}`}
            className="border border-black font-medium py-2 px-4 rounded dark:text-slate-800 dark:bg-white"
          >
            Learn More!
          </Link>
          <WishlistButton product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
