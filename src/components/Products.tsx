import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronRight,
  Truck,
  Star,
  X,
  Heart,
} from "lucide-react";

import { useShop, type Product } from "../context/ShopContext";

type ProductsProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const API = "https://shopping-website-05vm.onrender.com/api/products";

type Category = "all" | "men" | "women" | "children";

type ProductWithAttributes = Product & {
  sizes?: string[] | string;
  size?: string;
  colors?: string[] | string;
  color?: string;
  brand?: string;
  fit?: string;
};

export default function Products({ search, setSearch }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category>("all");
  const [sort, setSort] = useState("featured");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Filter States
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(20000);

  const location = useLocation();
  const productsRef = useRef<HTMLElement>(null);
  const previousSearch = useRef(location.search);

  // Read category from footer links or URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selectedCategory = params.get("category");

    if (
      selectedCategory === "men" ||
      selectedCategory === "women" ||
      selectedCategory === "children"
    ) {
      setCategory(selectedCategory);
    } else {
      setCategory("all");
    }

    // Scroll to products when category changes through the URL
    if (previousSearch.current !== location.search) {
      requestAnimationFrame(() => {
        productsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }

    previousSearch.current = location.search;
  }, [location.search]);

  // Fetch products & enrich with fallback fashion attributes if API lacks them
  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);

        const response = await fetch(API);

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        const rawProducts: ProductWithAttributes[] = data.products ?? [];

        // Enrich raw API products so filters never break
        const enriched = rawProducts.map((prod, idx) => ({
          ...prod,
          sizes: prod.sizes ?? prod.size ?? ["S", "M", "L", "XL"],
          colors:
            prod.colors ??
            prod.color ??
            (idx % 2 === 0 ? ["Black", "Blue"] : ["White", "Beige"]),
          brand: prod.brand || (idx % 3 === 0 ? "Zara" : idx % 2 === 0 ? "H&M" : "Nike"),
          fit: prod.fit || (idx % 2 === 0 ? "Regular Fit" : "Slim Fit"),
        }));

        setProducts(enriched);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  // Extract unique filter options dynamically
  const filterOptions = useMemo(() => {
    const sizesSet = new Set<string>();
    const colorsSet = new Set<string>();
    const brandsSet = new Set<string>();
    const fitsSet = new Set<string>();

    products.forEach((product) => {
      const item = product as ProductWithAttributes;

      const extractValues = (value: unknown): string[] => {
        if (Array.isArray(value)) return value.map(String);
        if (typeof value === "string")
          return value.split(",").map((i) => i.trim());
        return [];
      };

      extractValues(item.sizes ?? item.size).forEach((v) => sizesSet.add(v));
      extractValues(item.colors ?? item.color).forEach((v) => colorsSet.add(v));
      if (item.brand) brandsSet.add(item.brand);
      if (item.fit) fitsSet.add(item.fit);
    });

    return {
      sizes: Array.from(sizesSet).sort(),
      colors: Array.from(colorsSet).sort(),
      brands: Array.from(brandsSet).sort(),
      fits: Array.from(fitsSet).sort(),
    };
  }, [products]);

  // Filter, search and sort
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category === "men") {
      result = result.filter((product) =>
        product.category.toLowerCase().includes("mens")
      );
    }

    if (category === "women") {
      result = result.filter((product) => {
        const cat = product.category.toLowerCase();
        return cat.includes("womens") || cat === "tops";
      });
    }

    if (category === "children") {
      result = result.filter((product) => {
        const cat = product.category.toLowerCase();
        const title = product.title.toLowerCase();

        return (
          cat.includes("kids") ||
          title.includes("kid") ||
          title.includes("child")
        );
      });
    }

    if (search.trim()) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(search.trim().toLowerCase())
      );
    }

    const matches = (value: unknown, selected: string[]) => {
      if (selected.length === 0) return true;

      const values = Array.isArray(value)
        ? value.map(String)
        : typeof value === "string"
        ? value.split(",").map((item) => item.trim())
        : [];

      return selected.some((item) =>
        values.some((val) => val.toLowerCase() === item.toLowerCase())
      );
    };

    result = result.filter((product) => {
      const item = product as ProductWithAttributes;
      const priceInRupees = product.price * 83;

      return (
        matches(item.sizes ?? item.size, selectedSizes) &&
        matches(item.colors ?? item.color, selectedColors) &&
        matches(item.brand, selectedBrands) &&
        matches(item.fit, selectedFits) &&
        priceInRupees >= minPrice &&
        priceInRupees <= maxPrice
      );
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [
    products,
    category,
    sort,
    search,
    selectedSizes,
    selectedColors,
    selectedBrands,
    selectedFits,
    minPrice,
    maxPrice,
  ]);

  // Reset all filters function
  const clearAllFilters = () => {
    setCategory("all");
    setSearch("");
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedBrands([]);
    setSelectedFits([]);
    setMinPrice(0);
    setMaxPrice(20000);
  };

  // Sidebar category selection
  const selectCategory = (value: Category) => {
    setCategory(value);
    setShowMobileFilter(false);
  };

  return (
    <main className="min-h-screen bg-[#f8f6f2] text-[#202833]">
      <div className="mx-auto flex max-w-[1500px]">
        {/* Sidebar */}
        <aside className="hidden w-[295px] shrink-0 border-r border-[#e5e1db] px-7 py-10 lg:block">
          <CategoryCard
            title="Men"
            subtitle="Casuals · Formal · More"
            image="https://cdn.dummyjson.com/product-images/mens-shirts/blue-and-black-check-shirt/thumbnail.webp"
            active={category === "men"}
            onClick={() => selectCategory("men")}
          />

          <CategoryCard
            title="Women"
            subtitle="Tops · Dresses · More"
            image="https://cdn.dummyjson.com/product-images/womens-dresses/black-whitestriped-shirt-dress/thumbnail.webp"
            active={category === "women"}
            onClick={() => selectCategory("women")}
          />

          <CategoryCard
            title="Children"
            subtitle="T-Shirts · Sets · More"
            image="https://cdn.dummyjson.com/product-images/tops/blue-frock/thumbnail.webp"
            active={category === "children"}
            onClick={() => selectCategory("children")}
          />

          <div className="mt-8 border-t border-[#e3dfd9] pt-5">
            <h3 className="mb-4 text-[16px] font-medium">Filter by</h3>

            <FilterRow
              title="Size"
              open={openFilter === "Size"}
              onToggle={() =>
                setOpenFilter(openFilter === "Size" ? null : "Size")
              }
            >
              <CheckboxOptions
                options={filterOptions.sizes}
                selected={selectedSizes}
                onChange={setSelectedSizes}
              />
            </FilterRow>

            <FilterRow
              title="Color"
              open={openFilter === "Color"}
              onToggle={() =>
                setOpenFilter(openFilter === "Color" ? null : "Color")
              }
            >
              <CheckboxOptions
                options={filterOptions.colors}
                selected={selectedColors}
                onChange={setSelectedColors}
              />
            </FilterRow>

            <FilterRow
              title="Price"
              open={openFilter === "Price"}
              onToggle={() =>
                setOpenFilter(openFilter === "Price" ? null : "Price")
              }
            >
              <div className="space-y-3 py-3">
                <label className="block text-xs text-gray-500">
                  Minimum price (₹)
                  <input
                    type="number"
                    min={0}
                    value={minPrice}
                    onChange={(e) =>
                      setMinPrice(Math.max(0, Number(e.target.value)))
                    }
                    className="mt-1 w-full rounded-md border border-[#dedad4] bg-white px-3 py-2 text-sm outline-none"
                  />
                </label>

                <label className="block text-xs text-gray-500">
                  Maximum price (₹)
                  <input
                    type="number"
                    min={0}
                    value={maxPrice}
                    onChange={(e) =>
                      setMaxPrice(Math.max(0, Number(e.target.value)))
                    }
                    className="mt-1 w-full rounded-md border border-[#dedad4] bg-white px-3 py-2 text-sm outline-none"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setMinPrice(0);
                    setMaxPrice(20000);
                  }}
                  className="text-xs underline"
                >
                  Reset price
                </button>
              </div>
            </FilterRow>

            <FilterRow
              title="Brand"
              open={openFilter === "Brand"}
              onToggle={() =>
                setOpenFilter(openFilter === "Brand" ? null : "Brand")
              }
            >
              <CheckboxOptions
                options={filterOptions.brands}
                selected={selectedBrands}
                onChange={setSelectedBrands}
              />
            </FilterRow>

            <FilterRow
              title="Fit"
              open={openFilter === "Fit"}
              onToggle={() =>
                setOpenFilter(openFilter === "Fit" ? null : "Fit")
              }
            >
              <CheckboxOptions
                options={filterOptions.fits}
                selected={selectedFits}
                onChange={setSelectedFits}
              />
            </FilterRow>
          </div>

          <div className="mt-10 flex items-center gap-4 rounded-lg bg-[#f0ede8] p-5">
            <Truck size={29} strokeWidth={1.4} />
            <div>
              <p className="text-[14px] font-medium">Free Shipping</p>
              <p className="mt-1 text-[12px] text-gray-500">
                On orders above ₹999
              </p>
            </div>
          </div>
        </aside>

        {/* Products section */}
        <section
          ref={productsRef}
          className="min-w-0 flex-1 scroll-mt-24 px-5 py-8 sm:px-8 lg:px-9 lg:py-9"
        >
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <h1 className="font-serif text-[42px] leading-none tracking-[-1.5px] sm:text-[48px]">
                {category === "men"
                  ? "Men's Collection"
                  : category === "women"
                  ? "Women's Collection"
                  : category === "children"
                  ? "Children's Collection"
                  : "Shop Collection"}
              </h1>

              <p className="mt-4 text-[15px] text-gray-500">
                Showing {filteredProducts.length} results
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products"
                  className="h-[45px] w-[190px] rounded-lg border border-[#dedad4] bg-transparent pl-10 pr-3 text-[13px] outline-none focus:border-[#202833]"
                />
              </div>

              <button
                onClick={() => setShowMobileFilter(true)}
                className="flex h-[45px] items-center gap-2 rounded-lg border border-[#dedad4] px-5 text-[14px] lg:hidden"
              >
                <SlidersHorizontal size={17} />
                Filter
              </button>

              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-[45px] appearance-none rounded-lg border border-[#dedad4] bg-transparent pl-4 pr-10 text-[14px] outline-none"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-3 xl:grid-cols-4">
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full py-20 text-center">
                <p className="font-serif text-2xl">No products found</p>

                <button
                  onClick={clearAllFilters}
                  className="mt-4 text-sm underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </section>
      </div>

      {/* Mobile filters Drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-[100] bg-black/30 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-[320px] overflow-y-auto bg-[#f8f6f2] p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl">Filters</h2>
              <button onClick={() => setShowMobileFilter(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <h3 className="text-[14px] font-medium text-gray-700">Categories</h3>
              {(
                [
                  ["all", "All Products"],
                  ["men", "Men"],
                  ["women", "Women"],
                  ["children", "Children"],
                ] as [Category, string][]
              ).map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => selectCategory(value)}
                  className={`block w-full rounded-lg p-3 text-left text-sm ${
                    category === value
                      ? "bg-[#e8e3dc] font-medium"
                      : "border border-[#e3dfd9]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-6 border-t border-[#e3dfd9] pt-4">
              <FilterRow
                title="Size"
                open={openFilter === "Size"}
                onToggle={() =>
                  setOpenFilter(openFilter === "Size" ? null : "Size")
                }
              >
                <CheckboxOptions
                  options={filterOptions.sizes}
                  selected={selectedSizes}
                  onChange={setSelectedSizes}
                />
              </FilterRow>

              <FilterRow
                title="Color"
                open={openFilter === "Color"}
                onToggle={() =>
                  setOpenFilter(openFilter === "Color" ? null : "Color")
                }
              >
                <CheckboxOptions
                  options={filterOptions.colors}
                  selected={selectedColors}
                  onChange={setSelectedColors}
                />
              </FilterRow>

              <FilterRow
                title="Price"
                open={openFilter === "Price"}
                onToggle={() =>
                  setOpenFilter(openFilter === "Price" ? null : "Price")
                }
              >
                <div className="space-y-3 py-3">
                  <label className="block text-xs text-gray-500">
                    Minimum price (₹)
                    <input
                      type="number"
                      min={0}
                      value={minPrice}
                      onChange={(e) =>
                        setMinPrice(Math.max(0, Number(e.target.value)))
                      }
                      className="mt-1 w-full rounded-md border border-[#dedad4] bg-white px-3 py-2 text-sm outline-none"
                    />
                  </label>

                  <label className="block text-xs text-gray-500">
                    Maximum price (₹)
                    <input
                      type="number"
                      min={0}
                      value={maxPrice}
                      onChange={(e) =>
                        setMaxPrice(Math.max(0, Number(e.target.value)))
                      }
                      className="mt-1 w-full rounded-md border border-[#dedad4] bg-white px-3 py-2 text-sm outline-none"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setMinPrice(0);
                      setMaxPrice(20000);
                    }}
                    className="text-xs underline"
                  >
                    Reset price
                  </button>
                </div>
              </FilterRow>

              <FilterRow
                title="Brand"
                open={openFilter === "Brand"}
                onToggle={() =>
                  setOpenFilter(openFilter === "Brand" ? null : "Brand")
                }
              >
                <CheckboxOptions
                  options={filterOptions.brands}
                  selected={selectedBrands}
                  onChange={setSelectedBrands}
                />
              </FilterRow>

              <FilterRow
                title="Fit"
                open={openFilter === "Fit"}
                onToggle={() =>
                  setOpenFilter(openFilter === "Fit" ? null : "Fit")
                }
              >
                <CheckboxOptions
                  options={filterOptions.fits}
                  selected={selectedFits}
                  onChange={setSelectedFits}
                />
              </FilterRow>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function CategoryCard({
  title,
  subtitle,
  active,
  onClick,
}: {
  title: string;
  subtitle: string;
  image: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`mb-5 flex h-[98px] w-full items-center overflow-hidden rounded-lg text-left transition ${
        active ? "bg-[#e7e0d7]" : "bg-[#f1eee9] hover:bg-[#e9e4dd]"
      }`}
    >
      <div className="relative h-full w-[80px] shrink-0" />

      <div className="min-w-0 flex-1 px-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[17px] font-medium">{title}</h3>
          <ChevronRight size={17} />
        </div>

        <p className="mt-2 truncate text-[11px] text-gray-500">
          {subtitle}
        </p>
      </div>
    </button>
  );
}

function FilterRow({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#e3dfd9]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-[14px]">{title}</span>
        <ChevronDown
          size={15}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

function CheckboxOptions({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  if (options.length === 0) {
    return (
      <p className="py-2 text-xs leading-5 text-gray-500">
        No options available. Add this attribute to your product data first.
      </p>
    );
  }

  return (
    <div className="space-y-3 py-2">
      {options.map((option) => (
        <label
          key={option}
          className="flex cursor-pointer items-center gap-3 text-sm"
        >
          <input
            type="checkbox"
            checked={selected.includes(option)}
            onChange={(e) => {
              onChange((current) =>
                e.target.checked
                  ? [...current, option]
                  : current.filter((item) => item !== option)
              );
            }}
            className="accent-[#202833]"
          />
          {option}
        </label>
      ))}

      {selected.length > 0 && (
        <button
          type="button"
          onClick={() => onChange([])}
          className="pt-1 text-xs underline"
        >
          Clear selection
        </button>
      )}
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const wished = isInWishlist(product.id);

  const oldPrice =
    product.price / (1 - product.discountPercentage / 100);

  return (
    <article className="group">
      <div className="relative aspect-[0.88] overflow-hidden rounded-xl bg-[#e9e3db]">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />

        {product.discountPercentage > 10 && (
          <span className="absolute left-3 top-3 rounded-full bg-[#9b7769] px-3 py-1 text-[10px] font-medium uppercase tracking-wide text-white">
            Sale
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product)}
          aria-label="Toggle wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur transition hover:bg-white"
        >
          <Heart
            size={18}
            strokeWidth={1.6}
            fill={wished ? "#c0392b" : "none"}
            className={wished ? "text-[#c0392b]" : ""}
          />
        </button>
      </div>

      <div className="px-2 pt-3">
        <h3 className="truncate text-[14px] font-medium sm:text-[15px]">
          {product.title}
        </h3>

        <p className="mt-1 truncate text-[12px] text-gray-500">
          {formatCategory(product.category)}
        </p>

        <div className="mt-2 flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={12}
                fill={index < Math.round(product.rating) ? "#c99b58" : "none"}
                strokeWidth={1}
                className="text-[#c99b58]"
              />
            ))}
          </div>
          <span className="text-[11px] text-gray-400">
            {product.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-[16px] font-medium">
            ₹{Math.round(product.price * 83).toLocaleString("en-IN")}
          </span>

          {product.discountPercentage > 10 && (
            <span className="text-[12px] text-gray-400 line-through">
              ₹{Math.round(oldPrice * 83).toLocaleString("en-IN")}
            </span>
          )}
        </div>

        <button
          onClick={() => addToCart(product)}
          className="mt-3 w-full rounded-lg bg-[#202833] py-2.5 text-[13px] font-medium text-white transition hover:bg-[#35404f] active:scale-[0.98]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

function ProductSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[0.88] rounded-xl bg-[#e8e3dc]" />
      <div className="px-2 pt-4">
        <div className="h-4 w-3/4 rounded bg-[#e3ded7]" />
        <div className="mt-2 h-3 w-1/2 rounded bg-[#e3ded7]" />
        <div className="mt-3 h-3 w-1/3 rounded bg-[#e3ded7]" />
        <div className="mt-3 h-5 w-1/4 rounded bg-[#e3ded7]" />
      </div>
    </div>
  );
}

function formatCategory(category: string) {
  return category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}