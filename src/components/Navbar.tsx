import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { useAuth } from "../context/AuthContext";

type ShopPageProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function Navbar({ search, setSearch }: ShopPageProps) {
  const { cart, wishlist } = useShop();
  const cartCount = cart.reduce((n, item) => n + item.qty, 0);
  const { user, isAdmin, signOut } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Search submit handler for "men" shortcut scroll
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = search.trim().toLowerCase();

    if (query === "men" || query === "mens" || query === "men clothing") {
      setSearch("");
      const menSection = document.getElementById("men");
      if (menSection) {
        menSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="w-full bg-[#f4f2ed] border-b border-stone-300/60 sticky top-0 z-50">
      <div className="max-w-[1700px] mx-auto px-4 sm:px-10 h-16 sm:h-20 flex items-center justify-between text-xs sm:text-sm font-medium tracking-widest uppercase">
        
        {/* Left Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 font-serif">
          <a href="#men" className="hover:opacity-60 transition-opacity text-stone-900">MEN</a>
          <a href="#women" className="hover:opacity-60 transition-opacity text-stone-900">WOMEN</a>
          <a href="#deals" className="hover:opacity-60 transition-opacity text-stone-900">DEALS FOR YOU</a>
          <Link to="/" className="hover:opacity-60 transition-opacity text-stone-900">Home</Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-stone-900 hover:opacity-75 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="lg:hidden font-serif font-bold text-sm tracking-widest">
          <Link to="/">STORE</Link>
        </div>

        {/* Center Search Input (Desktop) */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center w-56 lg:w-96 relative">
          <Search className="w-4 h-4 absolute left-3.5 text-stone-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products (try 'men')..."
            className="w-full bg-stone-200/60 hover:bg-stone-200/90 focus:bg-white text-stone-900 placeholder-stone-500 text-xs py-2.5 pl-10 pr-4 rounded-sm border border-transparent focus:border-stone-400 outline-none transition-all font-sans normal-case"
          />
        </form>

        {/* Right Nav Links & Actions */}
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 font-serif">
          <Link to="/contact" className="hidden sm:block hover:opacity-60 transition-opacity text-stone-900">
            Contact
          </Link>

          <Link to="/wishlist" className="relative p-1">
            <Heart size={20} className="sm:w-[22px] sm:h-[22px]" />
            {wishlist.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#202833] px-1 text-[10px] text-white">
                {wishlist.length}
              </span>
            )}
          </Link>
        
          <Link to="/bag" className="relative p-1">
            <ShoppingBag size={20} className="sm:w-[22px] sm:h-[22px]" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#202833] px-1 text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Desktop User Actions (Updated to match other nav links) */}
          <div className="hidden md:flex items-center gap-6 font-serif">
            <Link to="/register" className="hover:opacity-60 transition-opacity text-stone-900">Register</Link>
            {isAdmin && <Link to="/admin" className="hover:opacity-60 transition-opacity text-stone-900">Admin</Link>}
            {user ? (
              <button onClick={signOut} className="hover:opacity-60 transition-opacity text-stone-900 uppercase bg-transparent cursor-pointer">Logout</button>
            ) : (
              <Link to="/login" className="hover:opacity-60 transition-opacity text-stone-900">Login</Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <form onSubmit={handleSearchSubmit} className="md:hidden px-4 pb-3 pt-1 bg-[#f4f2ed] border-t border-stone-300/30">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-stone-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products (try 'men')..."
            className="w-full bg-stone-200/60 focus:bg-white text-stone-900 placeholder-stone-500 text-xs py-2.5 pl-10 pr-4 rounded-sm border border-transparent focus:border-stone-400 outline-none font-sans normal-case"
          />
        </div>
      </form>

      {/* Mobile Dropdown Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#f4f2ed] border-b border-stone-300 shadow-lg py-6 px-6 flex flex-col gap-4 font-serif text-sm tracking-widest animate-fadeIn">
          <a href="#men" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-200 text-stone-900">MEN</a>
          <a href="#women" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-200 text-stone-900">WOMEN</a>
          <a href="#deals" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-200 text-stone-900">DEALS FOR YOU</a>
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-200 text-stone-900">Home</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-stone-200 text-stone-900">Contact</Link>

          <div className="pt-4 flex flex-col gap-3 font-serif text-xs uppercase">
            <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="py-2 text-stone-900 border-b border-stone-200">Register</Link>
            {isAdmin && <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="py-2 text-stone-900 border-b border-stone-200">Admin</Link>}
            {user ? (
              <button onClick={() => { signOut(); setMobileMenuOpen(false); }} className="py-2 text-left text-stone-900 border-b border-stone-200 uppercase cursor-pointer">Logout</button>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="py-2 text-stone-900 border-b border-stone-200">Login</Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}