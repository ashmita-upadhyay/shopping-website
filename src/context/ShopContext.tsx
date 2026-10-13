import { createContext, useContext, useEffect, useState } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  category: string;
  brand?: string;
  thumbnail: string;
  images: string[];
};

export type CartItem = Product & { qty: number };

type ShopContextType = {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
};

const ShopContext = createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load saved data once on mount
  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
      setWishlist(JSON.parse(localStorage.getItem("wishlist") || "[]"));
    } catch {
      // ignore broken data in localStorage
    }
    setLoaded(true);
  }, []);

  // Sync to localStorage on state changes
  useEffect(() => {
    if (loaded) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist, loaded]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

  const updateQty = (id: number, qty: number) =>
    setCart((prev) =>
      qty <= 0
        ? prev.filter((p) => p.id !== id)
        : prev.map((p) => (p.id === id ? { ...p, qty } : p))
    );

  const clearCart = () => setCart([]);

  const toggleWishlist = (product: Product) =>
    setWishlist((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );

  const isInWishlist = (id: number) => wishlist.some((p) => p.id === id);

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
}