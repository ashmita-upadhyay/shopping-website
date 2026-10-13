import { useState, useEffect } from "react";
import { ShieldCheck, Truck } from "lucide-react";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Page load hone ke turant baad animation trigger karne ke liye
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full overflow-x-clip bg-[#f8f6f2] text-stone-900 font-sans antialiased flex flex-col justify-between min-h-[calc(100vh-80px)]">

      {/* HERO MAIN SECTION */}
      <section className="relative flex-1 flex min-h-[620px] flex-col overflow-hidden bg-[#efeeea] sm:min-h-[680px] lg:min-h-[650px]">

        {/* TOP TAGLINE */}
        <div className="absolute top-28 sm:top-36 left-4 md:left-80 w-full px-6 sm:px-12 md:px-16 z-20">
          <p className="max-w-full font-serif text-[10px] uppercase tracking-[0.22em] text-stone-900 sm:text-xs md:text-sm">
            Premium Clothing for Your Comfort
          </p>
        </div>

        {/* CENTER TYPOGRAPHY & CUTOUT MODEL CONTAINER */}
        <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 items-center justify-center px-3 sm:px-6 my-auto min-h-[350px] sm:min-h-[440px] lg:min-h-[500px]">

          {/* GIANT CENTER TYPOGRAPHY "GENZI" */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <h1 className="select-none whitespace-nowrap font-serif text-[26vw] font-black uppercase leading-none tracking-[-0.04em] text-[#222222] sm:text-[23vw] lg:text-[16vw]">
              GENZI
            </h1>
          </div>

          {/* OVERLAYING WALKING MODEL CUTOUT */}
          <div className="relative z-10 flex h-[350px] items-center justify-center sm:h-[440px] lg:h-[520px] translate-x-4 sm:translate-x-10">
            <img
              src="/image-removebg-preview.png"
              alt="Model in Coat"
              className="h-full w-auto max-w-[90vw] object-cover grayscale contrast-[1.12] brightness-[0.96] mix-blend-multiply drop-shadow-xl"
            />
          </div>

          {/* SUB-LABEL & ANIMATED TEXT CONTAINER */}
          <div className="absolute right-6 sm:right-28 lg:right-64 bottom-6 sm:bottom-16 z-20 flex flex-col items-start gap-3">

            <p
              className={`font-serif text-[13px] sm:text-xs md:text-xl tracking-[0.22em] uppercase text-stone-900 transition-all duration-1200 ease-out transform ${
                isLoaded
                  ? "translate-x-0 opacity-100"
                  : "translate-x-28 opacity-0"
              }`}
            >
              Define Your Everyday
            </p>

            {/* BUTTON */}
            <button
              onClick={() =>
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className="bg-black text-white hover:bg-stone-900 text-[11px] sm:text-xs md:text-sm font-serif tracking-wider px-4 py-2 sm:px-6 sm:py-2.5 inline-flex items-center gap-2 shadow-md uppercase transition-all active:scale-95 hover:scale-[1.02] cursor-pointer"
            >
              <span>SHOP NEW ARRIVALS -&gt;</span>
            </button>
          </div>

          {/* RIGHT SIDE OFFER BADGE */}
          <div className="absolute right-6 lg:right-12 xl:right-16 top-1/2 z-20 hidden -translate-y-1/2 items-stretch md:flex">

            <div className="w-[1.5px] bg-stone-900 mr-5 my-1" />

            <div className="flex flex-col items-center justify-between text-center select-none font-serif py-1">
              <span className="text-[10px] lg:text-[11px] tracking-[0.3em] uppercase text-stone-900 font-medium">
                Special Edit
              </span>

              <div className="relative flex items-center justify-center my-1 pl-1">
                <span className="text-[64px] lg:text-[80px] font-normal leading-none text-stone-900 tracking-tight">
                  3
                </span>
                <span className="text-[64px] lg:text-[90px] font-normal leading-none text-stone-900 tracking-tight">
                  0
                </span>

                <div className="flex flex-col justify-between h-[52px] lg:h-[64px] ml-1 text-left py-0.5">
                  <span className="text-[28px] lg:text-[34px] leading-none text-stone-900 font-normal">%</span>
                  <span className="text-[9px] lg:text-[10px] tracking-[0.25em] uppercase text-stone-900 font-semibold">OFF</span>
                </div>
              </div>

              <span className="text-[9px] lg:text-[10px] tracking-[0.28em] uppercase text-stone-900 font-medium">
                Selected Styles
              </span>
            </div>
          </div>

        </div>

      </section>

    {/* BOTTOM VALUE PROPOSITION BAR */}
<section className="bg-stone-900 text-white border-t border-stone-800 w-full">
  <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 border-b border-stone-800">
    
    {/* Item 1 */}
    <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-2 sm:gap-3.5 p-4 border-r border-b lg:border-b-0 border-stone-800">
      <div className="shrink-0 text-white flex items-center justify-center">
        <svg className="w-6 h-6 sm:w-8 sm:h-8 fill-current" viewBox="0 0 24 24">
          <path d="M15 4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.1c-1.8.4-3 2-3 3.9 0 2.2 1.8 4 4 4h2c1.1 0 2 .9 2 2s-.9 2-2 2h-4v2h2v1a1 1 0 0 0 2 0v-1.1c1.8-.4 3-2 3-3.9 0-2.2-1.8-4-4-4h-2c-1.1 0-2-.9-2-2s.9-2 2-2h4V4z"/>
        </svg>
      </div>
      <div className="flex flex-col">
        <h4 className="text-xs sm:text-base font-bold tracking-tight text-white leading-tight">Flat 10% Off</h4>
        <p className="text-[10px] sm:text-xs text-stone-400 font-light mt-0.5">on your first purchase</p>
      </div>
    </div>

    {/* Item 2 */}
    <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-2 sm:gap-3.5 p-4 lg:border-r border-b lg:border-b-0 border-stone-800">
      <div className="shrink-0 text-white flex items-center justify-center">
        <svg className="w-6 h-6 sm:w-8 sm:h-8 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24">
          <path d="M21 8L12 3L3 8l9 5 9-5z" />
          <path d="M3 8v8l9 5 9-5V8" />
          <path d="M12 13v8" />
          <path d="M16 6l4 2-4 2" />
        </svg>
      </div>
      <div className="flex flex-col">
        <h4 className="text-xs sm:text-base font-bold tracking-tight text-white leading-tight">Easy Return</h4>
        <p className="text-[10px] sm:text-xs text-stone-400 font-light mt-0.5">Hassle free always</p>
      </div>
    </div>

    {/* Item 3 */}
    <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-2 sm:gap-3.5 p-4 border-r border-stone-800">
      <div className="shrink-0 text-white flex items-center justify-center">
        <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2]" />
      </div>
      <div className="flex flex-col">
        <h4 className="text-xs sm:text-base font-bold tracking-tight text-white leading-tight">Premium Quality</h4>
        <p className="text-[10px] sm:text-xs text-stone-400 font-light mt-0.5">Crafted for comfort</p>
      </div>
    </div>

    {/* Item 4 */}
    <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-2 sm:gap-3.5 p-4">
      <div className="shrink-0 text-white flex items-center justify-center">
        <Truck className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2]" />
      </div>
      <div className="flex flex-col">
        <h4 className="text-xs sm:text-base font-bold tracking-tight text-white leading-tight">Free Shipping</h4>
        <p className="text-[10px] sm:text-xs text-stone-400 font-light mt-0.5">on orders above ₹500</p>
      </div>
    </div>

  </div>
</section>

    </div>
  );
}