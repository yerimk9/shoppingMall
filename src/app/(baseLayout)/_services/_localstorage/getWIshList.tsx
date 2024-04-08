import { Product } from "../../_types";

function getWishListItems() {
  const wishList = localStorage.getItem("wishList");
  let parsedWishList: Product[] = wishList ? JSON.parse(wishList) : [];

  return parsedWishList;
}

export default getWishListItems;
