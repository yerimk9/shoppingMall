async function getProducts() {
  const res = await fetch("https://dummyjson.com/products", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Faild to fetch data");
  }

  return res.json();
}

export default getProducts;
