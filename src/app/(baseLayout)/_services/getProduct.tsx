async function getProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (!res.ok) {
    throw new Error("Faild to fetch data");
  }

  return res.json();
}

export default getProduct;
