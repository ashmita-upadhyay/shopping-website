import { Heart } from "lucide-react";
import { useShop } from "../context/ShopContext";

const rupees = (n: number) => `₹${Math.round(n * 83).toLocaleString("en-IN")}`;

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useShop();

  if (wishlist.length === 0) {
    return (
      <main className="min-h-screen bg-[#f8f6f2] py-24 text-center text-[#202833]">
        <p className="font-serif text-3xl">Your wishlist is empty</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f6f2] px-5 py-10 text-[#202833]">
      <div className="mx-auto max-w-[1200px]">
        <h1 className="font-serif text-4xl">Your Wishlist</h1>

        <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((item) => (
            <div key={item.id}>
              <div className="relative aspect-[0.88] overflow-hidden rounded-xl bg-[#e9e3db]">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => toggleWishlist(item)}
                  aria-label="Remove from wishlist"
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 transition hover:bg-white"
                >
                  <Heart size={18} fill="#c0392b" className="text-[#c0392b]" />
                </button>
              </div>

              <h3 className="mt-3 truncate text-[15px] font-medium">
                {item.title}
              </h3>
              <p className="mt-1 font-medium">{rupees(item.price)}</p>

              <button
                onClick={() => addToCart(item)}
                className="mt-3 w-full rounded-lg bg-[#202833] py-2.5 text-[13px] text-white transition hover:bg-[#11161d]"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}