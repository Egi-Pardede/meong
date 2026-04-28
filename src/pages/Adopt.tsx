import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getAdoptions, createAdoption, type AdoptListing } from "@/lib/db";
import { MapPin, Phone, Plus, X, Heart, ChevronRight } from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

// ─── Submit Form Modal ────────────────────────────────────────────────────────
function SubmitModal({ onClose, onCreated }: { onClose: () => void; onCreated: (l: AdoptListing) => void }) {
  const [catName, setCatName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const listing = await createAdoption({
      cat_name: catName.trim(),
      description: description.trim(),
      location: location.trim(),
      contact_name: contactName.trim(),
      contact_phone: contactPhone.trim(),
      image_url: imageUrl.trim() || "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=400&h=300&fit=crop",
    });
    setSubmitting(false);
    onCreated(listing);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-background border-2 border-foreground w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b-2 border-foreground">
          <div>
            <h2 className="font-bold uppercase tracking-tight text-lg">Daftarkan Kucing</h2>
            <p className="text-xs text-muted-foreground mt-1">Untuk kucing yang butuh rumah baru</p>
          </div>
          <button onClick={onClose} className="p-1 hover:text-accent transition-colors">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">Nama Kucing *</label>
            <input
              type="text"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
              placeholder="Misal: Kopi, Luna, Abu..."
              className="w-full border border-foreground bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-1 ring-accent"
              required
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">Deskripsi Kucing *</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jenis kelamin, usia perkiraan, warna bulu, temperamen, kondisi kesehatan, alasan adopsi..."
              className="w-full border border-foreground bg-transparent px-4 py-2.5 text-sm outline-none resize-none focus:ring-1 ring-accent"
              required
            />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">Lokasi (Kota/Daerah) *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Misal: Bandung, Jawa Barat"
              className="w-full border border-foreground bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-1 ring-accent"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">Nama Kontak *</label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full border border-foreground bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-1 ring-accent"
                required
              />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">No. WhatsApp *</label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full border border-foreground bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-1 ring-accent"
                required
              />
            </div>
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">
              Link Foto (opsional)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://... (URL foto kucing)"
              className="w-full border border-foreground bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-1 ring-accent"
            />
            <p className="font-mono text-[9px] text-muted-foreground mt-1">
              Upload foto ke Google Drive / Imgur / imgbb lalu tempel URL-nya di sini
            </p>
          </div>
          <div className="border border-accent/30 bg-accent/5 p-3 text-xs text-muted-foreground">
            <p className="font-bold mb-1 text-accent">📋 Perhatian</p>
            <p>Listing ini akan ditampilkan secara publik. Pastikan data kontak Anda aktif dan siap dihubungi calon adopter.</p>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="editorial" disabled={submitting}>
              {submitting ? "Menyimpan..." : "Daftarkan Sekarang"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Cat Card Detail Modal ─────────────────────────────────────────────────────
function CatModal({ cat, onClose }: { cat: AdoptListing; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-background border-2 border-foreground w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="aspect-video overflow-hidden bg-muted border-b-2 border-foreground">
          <img src={cat.image_url} alt={cat.cat_name} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tight">{cat.cat_name}</h2>
              <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                <MapPin size={11} />
                <span>{cat.location}</span>
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:text-accent transition-colors">
              <X size={20} />
            </button>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground mb-6">{cat.description}</p>
          <div className="border border-foreground p-4 mb-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">[ Kontak ]</p>
            <p className="font-bold mb-1">{cat.contact_name}</p>
            <a
              href={`https://wa.me/62${cat.contact_phone.replace(/^0/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-accent hover:underline font-mono"
            >
              <Phone size={13} /> {cat.contact_phone}
            </a>
          </div>
          <p className="font-mono text-[9px] text-muted-foreground mb-6">
            Terdaftar: {formatDate(cat.created_at)}
          </p>
          <a
            href={`https://wa.me/62${cat.contact_phone.replace(/^0/, "")}?text=Halo%20${encodeURIComponent(cat.contact_name)}%2C%20saya%20tertarik%20untuk%20mengadopsi%20${encodeURIComponent(cat.cat_name)}%20yang%20saya%20lihat%20di%20MEONG%20Project.`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="editorial" size="lg" className="w-full flex items-center justify-center gap-2">
              <Phone size={16} /> Hubungi via WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main Adopt Page ──────────────────────────────────────────────────────────
const Adopt = () => {
  const [listings, setListings] = useState<AdoptListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedCat, setSelectedCat] = useState<AdoptListing | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAdoptions().then((data) => {
      setListings(data);
      setLoading(false);
    });
  }, []);

  const filtered = listings.filter(
    (l) =>
      l.cat_name.toLowerCase().includes(search.toLowerCase()) ||
      l.location.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="border-b-2 border-foreground p-8 md:p-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">
              [ Open Adopt ]
            </span>
            <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4">
              Temukan <span className="font-serif italic font-normal text-accent">Teman</span> Baru
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Kucing-kucing ini membutuhkan rumah baru karena pemiliknya tidak lagi mampu merawat. Adopsi bertanggung jawab, bukan impulse.
            </p>
          </div>
          <Button
            variant="editorial"
            size="lg"
            onClick={() => setShowForm(true)}
            className="shrink-0 flex items-center gap-2"
          >
            <Plus size={16} /> Daftarkan Kucingmu
          </Button>
        </div>
      </section>

      {/* Info banner */}
      <section className="border-b-2 border-foreground bg-secondary text-secondary-foreground px-8 py-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "🏠", title: "Adopsi Bertanggung Jawab", desc: "Pastikan Anda siap berkomitmen sebelum mengadopsi." },
            { icon: "📞", title: "Hubungi Langsung", desc: "Koordinasikan langsung dengan pemilik melalui WhatsApp." },
            { icon: "❤️", title: "Gratis Adopsi", desc: "Platform ini gratis. Tidak ada biaya perantara." },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                <p className="text-xs text-secondary-foreground/70">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Search */}
      <section className="border-b border-foreground/20 px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama kucing atau kota..."
            className="w-full md:max-w-md border border-foreground bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-1 ring-accent"
          />
        </div>
      </section>

      {/* Listings */}
      <section className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-16 text-muted-foreground font-mono text-sm">Memuat listing...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">
                {search ? `Tidak ada kucing yang cocok dengan "${search}"` : "Belum ada listing adopsi saat ini."}
              </p>
              <Button variant="outline" onClick={() => setShowForm(true)}>
                <Plus size={14} className="mr-2" /> Daftarkan Kucing
              </Button>
            </div>
          ) : (
            <>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-6">
                {filtered.length} Kucing Menunggu Rumah Baru
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCat(cat)}
                    className="border border-foreground text-left group hover:border-accent transition-colors overflow-hidden"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-muted border-b border-foreground">
                      <img
                        src={cat.image_url}
                        alt={cat.cat_name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?w=400&h=300&fit=crop";
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold uppercase text-lg leading-tight">{cat.cat_name}</h4>
                        <Heart size={14} className="shrink-0 mt-1 text-muted-foreground group-hover:text-accent group-hover:fill-accent transition-colors" />
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-[10px] font-mono mb-3">
                        <MapPin size={10} />
                        <span className="uppercase tracking-widest">{cat.location}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{cat.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-accent">
                          <Phone size={10} />
                          <span>{cat.contact_name}</span>
                        </div>
                        <ChevronRight size={14} className="text-muted-foreground group-hover:text-accent transition-colors" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto bg-foreground text-background p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2">Punya kucing yang butuh rumah baru?</h3>
            <p className="text-sm opacity-70">Daftarkan gratis dan kami bantu temukan adopter yang tepat.</p>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="border-background text-background hover:bg-background hover:text-foreground shrink-0"
            onClick={() => setShowForm(true)}
          >
            <Plus size={16} className="mr-2" /> Daftarkan Kucing
          </Button>
        </div>
      </section>

      <Footer />

      {showForm && (
        <SubmitModal
          onClose={() => setShowForm(false)}
          onCreated={(listing) => setListings((prev) => [listing, ...prev])}
        />
      )}
      {selectedCat && <CatModal cat={selectedCat} onClose={() => setSelectedCat(null)} />}
    </div>
  );
};

export default Adopt;
