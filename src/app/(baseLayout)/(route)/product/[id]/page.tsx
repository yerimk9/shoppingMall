import Carousel from "@/app/(baseLayout)/_components/Carousel";
import ItemDescription from "@/app/(baseLayout)/_components/ItemDescription";
import getProduct from "@/app/(baseLayout)/_services/getProduct";
import React from "react";

async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-10 ">
        <div className="overflow-hidden border-2 rounded-xl h-[400px] lg:h-full">
          <Carousel
            images={product.images}
            style={{ height: "500px", width: "100%" }}
          />
        </div>
        <div>
          <ItemDescription product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
