async function getCategory(category: string) {
  const res = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );

  if (!res.ok) {
    throw new Error("Faild to fetch data");
  }

  return res.json();
}

export default getCategory;
