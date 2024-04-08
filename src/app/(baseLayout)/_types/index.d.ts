export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export interface ProductProps {
  product: Product;
}

// WishlistButton 컴포넌트의 props 타입 정의
export interface WishlistButtonProps {
  product: Product;
}

export type CategoryImages = {
  automotive: StaticImageData;
  fragrances: StaticImageData;
  furniture: StaticImageData;
  groceries: StaticImageData;
  "home-decoration": StaticImageData;
  laptops: StaticImageData;
  lighting: StaticImageData;
  "mens-shirts": StaticImageData;
  "mens-shoes": StaticImageData;
  "mens-watches": StaticImageData;
  motorcycle: StaticImageData;
  skincare: StaticImageData;
  smartphones: StaticImageData;
  sunglasses: StaticImageData;
  tops: StaticImageData;
  "womens-bags": StaticImageData;
  "womens-dresses": StaticImageData;
  "womens-jewellery": StaticImageData;
  "womens-shoes": StaticImageData;
  "womens-watches": StaticImageData;
};

export type CartItem = ProductItemDescription & { counter: number };
