"use client";
import CategoryList from "@/app/(baseLayout)/_components/CategoryList";
import ProductCard from "@/app/(baseLayout)/_components/ProductCard";
import getCategories from "@/app/(baseLayout)/_services/getCategories";
import getCategory from "@/app/(baseLayout)/_services/getCategory";
import getProducts from "@/app/(baseLayout)/_services/getProducts";
import React, { useEffect, useState } from "react";
import { Product } from "@/app/(baseLayout)/_types";
import Image from "next/image";
import { IconNone } from "../../../../../../public/svgs";

function CategoryStore({ params }: { params: { category: string } }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [value, setValue] = useState("");
  const checkCategory = params.category;

  const debounce = (func: Function, timeout: number = 1000) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: unknown[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(null, args);
      }, timeout);
    };
  };

  const valueChange = debounce((value: string) => {
    setValue(value);
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    valueChange(e.target.value);
  };

  useEffect(() => {
    const getCategoriesData = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };
    const getProductsData = async () => {
      const { products } =
        params.category === "all"
          ? await getProducts()
          : await getCategory(checkCategory);
      setProducts(products);

      if (value) {
        // searchValue가 존재하는 경우에만 필터링 적용
        const filteredProducts = products.filter((product: Product) =>
          product.title.toLowerCase().includes(value.toLowerCase())
        );
        setProducts(filteredProducts);
      } else {
        getProductsData();
      }
    };
    getCategoriesData();
    getProductsData();
  }, [value]);

  return (
    <div>
      <div className="sm:flex">
        <div>
          <div className="mb-4 p-6 pb-0">
            <input
              className="focus:outline-none focus:shadow-outline shadow appearance-none border w-full lg:w-48 rounded text-gray-700 text-sm font-light leading-tight py-3 px-3"
              type="text"
              placeholder="Type a product."
              name="search"
              onChange={handleChange}
            />
          </div>
          <CategoryList categories={categories} checkCategory={checkCategory} />
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10">
            {products.map((product: Product) => (
              <div key={product.id} className="w-50">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-10 rounded-lg p-30 mx-auto my-56 h-[500px] w-[500px]">
            <div>
              <Image src={IconNone} alt="none" width={300} height={300} />
            </div>
            <div className="text-3xl text-gray-400 font-bold drop-shadow-sm">
              No products available
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryStore;
