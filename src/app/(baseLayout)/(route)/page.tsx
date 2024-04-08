import CategoryCard from "../_components/CategoryCard";
import ProductCard from "../_components/ProductCard";
import getCategories from "../_services/getCategories";
import getProducts from "../_services/getProducts";
import { CategoryImages, Product } from "../_types";

async function Home() {
  const { products } = await getProducts();
  const categories = await getCategories();

  return (
    <div>
      <div className="text-3xl font-medium text-gray-600  bg-gray-100 px-10 py-4">
        All Product
      </div>
      <div className="flex gap-8 w-11/12 overflow-x-auto py-10 my-0 mx-auto">
        {products.map((product: Product) => (
          <div key={product.id} className="w-72 md:w-96 lg:w-80">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <div className="flex gap-8 w-11/12 overflow-x-auto py-10 my-0 mx-auto">
        {categories.map((category: keyof CategoryImages) => (
          <CategoryCard category={category} key={category} />
        ))}
      </div>
    </div>
  );
}

export default Home;
