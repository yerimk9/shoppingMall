import React from "react";
import Image from "next/image";
import { IconList } from "../../../../public/svgs";
import Link from "next/link";

function CategoryList({
  categories,
  checkCategory,
}: {
  categories: string[];
  checkCategory: string;
}) {
  return (
    <div className="p-6 sm:w-60 overflow-y-auto">
      <div className="flex flex-col gap-8">
        <div className="flex gap-3 border-b-2 pb-4">
          <Image src={IconList} alt="list" width={20} height={20} />
          Categories
        </div>
        <div className="flex flex-col gap-2 ">
          <Link
            href={"all"}
            className={`border-l-2 pl-4 p-1 hover:bg-slate-200 cursor-grab ${
              checkCategory === "all" && "bg-slate-100 rounded p-2"
            }`}
          >
            All
          </Link>
          {categories?.map((category, idx) => (
            <Link
              href={category}
              className={`border-l-2 pl-4 p-1 hover:bg-slate-200 cursor-grab${
                checkCategory === category && "bg-slate-100 rounded p-2"
              }`}
              key={idx}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
