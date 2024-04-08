async function getCategories() {
  const res = await fetch("https://dummyjson.com/products/categories", {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Faild to fetch data");
  }

  return res.json();
}

export default getCategories;
