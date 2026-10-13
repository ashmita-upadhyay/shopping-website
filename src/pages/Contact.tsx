import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-stone-900 px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.25em] uppercase text-stone-500">
            Get In Touch
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold mt-3">
            Contact Us
          </h1>

          <p className="mt-4 text-stone-500 max-w-xl mx-auto">
            Have a question about our products or your order? We’d love to
            hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 bg-white p-8 md:p-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-medium mb-8">
              We’re here to help
            </h2>

            <div className="space-y-7">
              <div className="flex gap-4">
                <Mail size={22} />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-stone-500 mt-1">
                    hello@yourbrand.com
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone size={22} />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-stone-500 mt-1">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <MapPin size={22} />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-stone-500 mt-1">
                    India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {submitted && (
              <p className="text-sm text-green-700 bg-green-50 p-3 border border-green-200">
                Thank you! Your message has been sent successfully.
              </p>
            )}

            <div>
              <label className="block text-sm mb-2">Name</label>
              <input
                type="text"
                required
                placeholder="Your name"
                className="w-full border border-stone-300 px-4 py-3 outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                required
                placeholder="Your email"
                className="w-full border border-stone-300 px-4 py-3 outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Subject</label>
              <input
                type="text"
                required
                placeholder="Subject"
                className="w-full border border-stone-300 px-4 py-3 outline-none focus:border-stone-900"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Message</label>
              <textarea
                rows={5}
                required
                placeholder="Write your message..."
                className="w-full border border-stone-300 px-4 py-3 outline-none focus:border-stone-900 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-stone-900 text-white py-3 hover:bg-stone-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}