import Link from "next/link";
import React from "react";
import {
  automotiveImg,
  fragrancesImg,
  furnitureImg,
  groceriesImg,
  homeDecorationImg,
  laptopsImg,
  lightingImg,
  mensShirtsImg,
  menShoesImg,
  mensWatchesImg,
  motorcycleImg,
  skincareImg,
  smartphonesImg,
  sunglassesImg,
  topsImg,
  womensImg,
  womensDressesImg,
  womensJewelleryImg,
  womensShoesImg,
  womensWatchesImg,
} from "../../../../public/images";
import { CategoryImages } from "../_types";

const categories: CategoryImages = {
  automotive: automotiveImg,
  fragrances: fragrancesImg,
  furniture: furnitureImg,
  groceries: groceriesImg,
  "home-decoration": homeDecorationImg,
  laptops: laptopsImg,
  lighting: lightingImg,
  "mens-shirts": mensShirtsImg,
  "mens-shoes": menShoesImg,
  "mens-watches": mensWatchesImg,
  motorcycle: motorcycleImg,
  skincare: skincareImg,
  smartphones: smartphonesImg,
  sunglasses: sunglassesImg,
  tops: topsImg,
  "womens-bags": womensImg,
  "womens-dresses": womensDressesImg,
  "womens-jewellery": womensJewelleryImg,
  "womens-shoes": womensShoesImg,
  "womens-watches": womensWatchesImg,
};

function CategoryCard({ category }: { category: keyof CategoryImages }) {
  const { src: backgroundImage } = categories[category];
  return (
    <>
      <div
        className="rounded-2xl flex flex-col gap-72 min-w-72 md:w-96 lg:w-80 justify-between py-4 px-6 bg-black text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center", // 이미지 위치
          backgroundSize: "cover", // 이미지 꽉차게
          backgroundRepeat: "no-repeat", // 이미지 반복 지정
        }}
      >
        <div className="">
          <div className="text-xs mb-2 text-gray-400">CATEGORY</div>
          <div className="text-3xl font-medium">{category}</div>
        </div>
        <div className="flex justify-end">
          <div className="border border-white w-26 flex justify-center px-4 py-2 rounded bg-white text-black">
            <Link href={`products/${category}`}>Go to store</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryCard;
