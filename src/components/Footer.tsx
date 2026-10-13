
import { Link } from "react-router-dom";
import {
//   instagram,
//   Facebook,
  ArrowUpRight,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f4f2ed] text-stone-800 border-t border-stone-200">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-20 border-b border-stone-300">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="max-w-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500 mb-4">
              A little note from Genzi
            </p>

            <h2 className="text-3xl md:text-4xl font-serif leading-tight">
              Style that feels
              <br />
              <span className="italic">like you.</span>
            </h2>

            <p className="text-sm text-stone-600 mt-4 leading-6">
              Discover timeless essentials and everyday pieces
              made to be loved.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] border-b border-stone-800 pb-2 w-fit hover:text-stone-500 transition"
          >
            Explore the collection
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-3xl font-serif tracking-[0.18em]"
            >
              GENZI
            </Link>

            <p className="text-sm text-stone-600 leading-7 mt-5 max-w-xs">
              Thoughtfully chosen styles for your everyday
              moments. Find your look, express yourself, and
              feel confident in what you wear.
            </p>

            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="hover:text-stone-500 transition"
              >
                {/* <Instagram size={19} strokeWidth={1.5} /> */}
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="hover:text-stone-500 transition"
              >
                {/* <Facebook size={19} strokeWidth={1.5} /> */}
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">
              Shop
            </h3>

            <ul className="space-y-4 text-sm text-stone-600">
              <li>
                <Link to="/" className="hover:text-black transition">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/?category=men" className="hover:text-black transition">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/?category=women" className="hover:text-black transition">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-black transition">
                  My Wishlist
                </Link>
              </li>
              <li>
                <Link to="/bag" className="hover:text-black transition">
                  Shopping Bag
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">
              Customer Care
            </h3>

            <ul className="space-y-4 text-sm text-stone-600">
              <li>
                <Link to="/contact" className="hover:text-black transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-black transition">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-black transition">
                  Create Account
                </Link>
              </li>
              <li>
                <a href="mailto:support@genzi.com" className="hover:text-black transition">
                  Email Support
                </a>
              </li>
            </ul>
          </div>

          {/* Brand Note */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">
              The Genzi Edit
            </h3>

            <p className="text-sm text-stone-600 leading-7">
              Less trend. More you.
              <br />
              Pieces that work with your
              style, your mood, and your life.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 text-xs tracking-wide text-stone-500">
              Made with <Heart size={13} /> for your everyday
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-stone-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Genzi. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-stone-500">
            <Link to="/privacy-policy" className="hover:text-black transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-black transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
