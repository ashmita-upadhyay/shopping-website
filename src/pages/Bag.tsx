import { Minus, Plus, Trash2 } from "lucide-react";
import { useShop } from "../context/ShopContext";

const rupees = (n: number) => `₹${Math.round(n * 83).toLocaleString("en-IN")}`;

export default function Bag() {
  const { cart, removeFromCart, updateQty, clearCart } = useShop();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#f8f6f2] py-24 text-center text-[#202833]">
        <p className="font-serif text-3xl">Your cart is empty</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f6f2] px-5 py-10 text-[#202833]">
      <div className="mx-auto max-w-[900px]">
        <div className="flex items-center justify-between">
          <h1 className="font-serif text-4xl">Your Cart</h1>
          <button onClick={clearCart} className="text-sm underline">
            Clear cart
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl border border-[#e5e1db] bg-white p-4"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-24 w-20 rounded-lg bg-[#e9e3db] object-cover"
              />

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-medium">{item.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {rupees(item.price)}
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dedad4]"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-5 text-center text-sm">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dedad4]"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-medium">{rupees(item.price * item.qty)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-3 text-gray-400 hover:text-red-500"
                  aria-label="Remove"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between rounded-xl bg-[#f0ede8] p-5">
          <span className="text-lg">Total</span>
          <span className="text-2xl font-medium">{rupees(total)}</span>
        </div>

        <button className="mt-4 w-full rounded-lg bg-[#202833] py-3 text-white">
          Checkout
        </button>
      </div>
    </main>
  );
}