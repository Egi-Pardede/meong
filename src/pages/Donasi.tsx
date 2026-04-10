import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const donationAmounts = [
  { value: 25000, label: "Rp 25.000", desc: "Pakan 1 hari untuk 5 kucing" },
  { value: 50000, label: "Rp 50.000", desc: "Pakan 3 hari untuk 5 kucing" },
  { value: 100000, label: "Rp 100.000", desc: "Pakan 1 minggu untuk 5 kucing" },
  { value: 250000, label: "Rp 250.000", desc: "Pakan 1 bulan untuk 5 kucing" },
];

const Donasi = () => {
  const [selectedAmount, setSelectedAmount] = useState(50000);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const activeAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="border-b-2 border-foreground p-8 md:p-16">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">
            [ Donasi ]
          </span>
          <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4">
            Isi <span className="font-serif italic font-normal text-accent">Mangkuk</span> Mereka
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Setiap kontribusi langsung digunakan untuk membeli pakan dan membiayai perawatan kucing jalanan.
          </p>
        </div>
      </section>

      {/* Donation Form */}
      <section className="px-8 py-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Amount Selection */}
          <div className="border-2 border-foreground p-8 md:p-12">
            <span className="font-mono text-[10px] mb-6 block uppercase tracking-widest text-muted-foreground">
              [ Pilih Nominal ]
            </span>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {donationAmounts.map((amt) => (
                <button
                  key={amt.value}
                  onClick={() => { setSelectedAmount(amt.value); setCustomAmount(""); }}
                  className={`border border-foreground p-4 text-left transition-colors ${
                    selectedAmount === amt.value && !customAmount
                      ? "bg-foreground text-background"
                      : "hover:bg-muted"
                  }`}
                >
                  <p className="font-bold text-lg">{amt.label}</p>
                  <p className={`text-[10px] mt-1 ${
                    selectedAmount === amt.value && !customAmount ? "opacity-70" : "text-muted-foreground"
                  }`}>{amt.desc}</p>
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2 block">
                Atau nominal lainnya
              </label>
              <div className="flex items-center border border-foreground">
                <span className="px-4 py-3 border-r border-foreground font-bold bg-muted">Rp</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="0"
                  className="flex-1 px-4 py-3 bg-transparent outline-none font-bold text-lg"
                />
              </div>
            </div>

            <div className="bg-muted p-4 border border-foreground/20">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Total Donasi</p>
              <p className="text-3xl font-bold">
                Rp {(activeAmount || 0).toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="border-2 border-foreground border-l-0 p-8 md:p-12 bg-secondary text-secondary-foreground flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] mb-6 block uppercase tracking-widest text-secondary-foreground/60">
                [ Info Donatur ]
              </span>
              <div className="space-y-4 mb-8">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-secondary-foreground/60 mb-2 block">
                    Nama (opsional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Anonim"
                    className="w-full border border-secondary-foreground/30 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-secondary-foreground/30 focus:border-secondary-foreground"
                  />
                </div>
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-secondary-foreground/60 mb-2 block">
                    Pesan (opsional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Semoga kucing-kucing jalanan selalu kenyang..."
                    rows={3}
                    className="w-full border border-secondary-foreground/30 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-secondary-foreground/30 focus:border-secondary-foreground resize-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <Button variant="outline" size="xl" className="w-full border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary mb-4">
                Donasi Sekarang
              </Button>
              <p className="font-mono text-[9px] text-center uppercase tracking-widest text-secondary-foreground/40">
                100% dana untuk program feeding & perawatan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparansi */}
      <section className="px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-[10px] mb-8 block uppercase tracking-widest text-muted-foreground">
            [ Transparansi Dana ]
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {[
              { label: "Total Terkumpul", value: "Rp 12.5 Jt" },
              { label: "Donatur", value: "234" },
              { label: "Kucing Terlayani", value: "89" },
              { label: "Titik Feeding", value: "12" },
            ].map((stat) => (
              <div key={stat.label} className="border border-foreground p-6 text-center">
                <p className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Donasi;
