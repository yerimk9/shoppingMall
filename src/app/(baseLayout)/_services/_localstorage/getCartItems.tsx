import { CartItem } from "../../_types";

function getCartItems() {
  const cartItems = localStorage.getItem("cartItems");
  let parsedCartItems: CartItem[] = cartItems ? JSON.parse(cartItems) : [];

  return parsedCartItems;
}

export default getCartItems;
