import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

type AdminProduct = {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
};

const CATEGORIES = [
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-dresses",
  "womens-shoes",
  "womens-bags",
  "tops",
  "kids-clothing",
];

const BUCKET = "product-images";

// Uploads one file to Supabase Storage and returns its public URL
async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file);
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export default function Admin() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    category: CATEGORIES[0],
    brand: "",
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<FileList | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("id, title, price, category, thumbnail")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      return;
    }
    setProducts(data || []);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (!thumbnail) {
      setMessage("Please choose a thumbnail image.");
      return;
    }

    setSaving(true);
    try {
      const thumbnailUrl = await uploadImage(thumbnail);

      const imageUrls: string[] = [];
      if (images) {
        for (const file of Array.from(images).slice(0, 5)) {
          imageUrls.push(await uploadImage(file));
        }
      }

      const { error } = await supabase.from("products").insert({
        title: form.title,
        description: form.description,
        price: Number(form.price),
        discount_percentage: Number(form.discount) || 0,
        category: form.category,
        brand: form.brand || null,
        thumbnail: thumbnailUrl,
        images: imageUrls,
      });

      if (error) throw error;

      setMessage("Product added!");
      setForm({ title: "", description: "", price: "", discount: "", category: CATEGORIES[0], brand: "" });
      setThumbnail(null);
      setImages(null);
      e.currentTarget.reset();
      loadProducts();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      setMessage(error.message);
      return;
    }
    loadProducts();
  }

  const input =
    "w-full border border-stone-300 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-stone-900";

  return (
    <main className="min-h-screen bg-[#f8f6f2] px-5 py-10 text-[#202833]">
      <div className="mx-auto max-w-[900px]">
        <h1 className="font-serif text-4xl">Admin Panel</h1>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 border border-stone-200 bg-white p-6"
        >
          <h2 className="text-xl font-medium">Add Product</h2>

          <input className={input} name="title" placeholder="Title" value={form.title} onChange={handleChange} required />

          <textarea className={input} name="description" placeholder="Description" rows={3} value={form.description} onChange={handleChange} />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input className={input} name="price" type="number" min="0" step="0.01" placeholder="Price (₹)" value={form.price} onChange={handleChange} required />
            <input className={input} name="discount" type="number" min="0" max="90" placeholder="Discount % (optional)" value={form.discount} onChange={handleChange} />

            <select className={input} name="category" value={form.category} onChange={handleChange}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <input className={input} name="brand" placeholder="Brand (optional)" value={form.brand} onChange={handleChange} />
          </div>

          <div>
            <label className="text-sm text-stone-500">Thumbnail (required)</label>
            <input type="file" accept="image/*" className="mt-1 block text-sm" onChange={(e) => setThumbnail(e.target.files?.[0] || null)} />
          </div>

          <div>
            <label className="text-sm text-stone-500">More images (optional, up to 5)</label>
            <input type="file" accept="image/*" multiple className="mt-1 block text-sm" onChange={(e) => setImages(e.target.files)} />
          </div>

          {message && <p className="text-sm">{message}</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-stone-900 px-8 py-3 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-stone-700 disabled:opacity-50"
          >
            {saving ? "Uploading..." : "Add Product"}
          </button>
        </form>

        <h2 className="mt-10 text-xl font-medium">
          All Products ({products.length})
        </h2>

        <div className="mt-4 space-y-3">
          {products.map((p) => (
            <div key={p.id} className="flex items-center gap-4 border border-stone-200 bg-white p-3">
              <img src={p.thumbnail} alt={p.title} className="h-16 w-14 object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{p.title}</p>
                <p className="text-sm text-stone-500">
                  ₹{p.price} · {p.category}
                </p>
              </div>
              <button onClick={() => handleDelete(p.id)} className="text-sm text-red-500 hover:underline">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}