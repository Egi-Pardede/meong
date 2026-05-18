import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { getDonations, recordDonation, saveProofImage, type Donation } from "@/lib/db";
import { CheckCircle, Copy, ChevronDown, Upload, ImageIcon, X, ShieldCheck } from "lucide-react";

const donationAmounts = [
  { value: 25000, label: "Rp 25.000", desc: "Pakan 1 hari / 5 kucing" },
  { value: 50000, label: "Rp 50.000", desc: "Pakan 3 hari / 5 kucing" },
  { value: 100000, label: "Rp 100.000", desc: "Pakan 1 minggu / 5 kucing" },
  { value: 250000, label: "Rp 250.000", desc: "Pakan 1 bulan / 5 kucing" },
];

function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const STEPS = [
  { id: "select", label: "Pilih Nominal" },
  { id: "qris", label: "Scan QRIS" },
  { id: "confirm", label: "Upload Bukti" },
  { id: "done", label: "Selesai" },
];

const Donasi = () => {
  const [selectedAmount, setSelectedAmount] = useState(50000);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState<"select" | "qris" | "confirm" | "done">("select");
  const [donations, setDonations] = useState<Donation[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Proof of payment
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount;

  useEffect(() => {
    getDonations().then(setDonations);
  }, []);

  const totalDonasi = donations.reduce((s, d) => s + d.amount, 0);
  const displayDonations = showAll ? donations : donations.slice(0, 8);

  function handleFileSelect(file: File) {
    if (!file.type.startsWith("image/")) return;
    setProofFile(file);
    const url = URL.createObjectURL(file);
    setProofPreview(url);
  }

  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }

  function removeProof() {
    setProofFile(null);
    if (proofPreview) URL.revokeObjectURL(proofPreview);
    setProofPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleConfirm() {
    if (!proofFile) return;
    setSubmitting(true);

    // Compress image to JPEG max 800px wide before base64 encoding
    // (keeps localStorage usage < 200KB per proof)
    const base64 = await new Promise<string>((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(proofFile);
      img.onload = () => {
        const maxW = 800;
        const scale = img.width > maxW ? maxW / img.width : 1;
        const canvas = document.createElement("canvas");
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(objectUrl);
        resolve(canvas.toDataURL("image/jpeg", 0.75));
      };
      img.src = objectUrl;
    });

    const donation = await recordDonation({
      name: name.trim() || "Anonim",
      amount: activeAmount,
      message: message.trim(),
      proof_uploaded: true,
    });

    // Save proof image linked to this donation ID
    saveProofImage(donation.id, base64);

    setDonations((prev) => [donation, ...prev]);
    setStep("done");
    setSubmitting(false);
    removeProof();
  }

  function copyNMID() {
    navigator.clipboard.writeText("ID1025433468960");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="border-b-2 border-foreground p-8 md:p-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">
            [ Donasi ]
          </span>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4 leading-[0.9]">
            Isi{" "}
            <span className="font-serif italic font-normal text-accent">Mangkuk</span>{" "}
            Mereka
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mt-6">
            Setiap kontribusi langsung digunakan untuk membeli pakan dan membiayai perawatan kucing jalanan.
            Semua donasi dicatat secara transparan.
          </p>
          <div className="flex flex-wrap gap-6 mt-8 text-sm">
            {[
              { icon: "🔒", text: "Aman via QRIS resmi" },
              { icon: "📋", text: "Bukti transfer diperiksa manual" },
              { icon: "📊", text: "Ledger publik & transparan" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-muted-foreground">
                <span>{item.icon}</span>
                <span className="font-mono text-[11px] uppercase tracking-widest">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step indicator */}
      <section className="px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 shrink-0">
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-colors ${
                    i < stepIndex
                      ? "bg-accent/20 border-accent text-accent"
                      : step === s.id
                      ? "bg-foreground text-background border-foreground"
                      : "border-foreground/20 text-muted-foreground/40"
                  }`}
                >
                  {i < stepIndex ? (
                    <CheckCircle size={11} />
                  ) : (
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  )}
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <span className={i < stepIndex ? "text-accent" : "text-muted-foreground/20"}>→</span>
                )}
              </div>
            ))}
          </div>

          {/* ── STEP 1: Select amount ── */}
          {step === "select" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 border-2 border-foreground">
              <div className="p-8 md:p-12">
                <span className="font-mono text-[10px] mb-6 block uppercase tracking-widest text-muted-foreground">
                  [ Pilih Nominal ]
                </span>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {donationAmounts.map((amt) => (
                    <button
                      key={amt.value}
                      onClick={() => { setSelectedAmount(amt.value); setCustomAmount(""); }}
                      className={`border border-foreground p-4 text-left transition-all hover:scale-[1.01] ${
                        selectedAmount === amt.value && !customAmount
                          ? "bg-foreground text-background shadow-[4px_4px_0_0_hsl(var(--accent))]"
                          : "hover:bg-muted"
                      }`}
                    >
                      <p className="font-bold text-lg">{amt.label}</p>
                      <p
                        className={`text-[10px] mt-1 ${
                          selectedAmount === amt.value && !customAmount
                            ? "opacity-70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {amt.desc}
                      </p>
                    </button>
                  ))}
                </div>
                <div className="mb-6">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2 block">
                    Atau nominal lainnya
                  </label>
                  <div className="flex items-center border border-foreground">
                    <span className="px-4 py-3 border-r border-foreground font-bold bg-muted text-sm">Rp</span>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="0"
                      min="1000"
                      className="flex-1 px-4 py-3 bg-transparent outline-none font-bold text-lg"
                    />
                  </div>
                </div>
                <div className="bg-accent/10 border border-accent/30 p-4 mb-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                    Total Donasi
                  </p>
                  <p className="text-3xl font-bold text-accent">{formatRp(activeAmount || 0)}</p>
                </div>
                <Button
                  variant="editorial"
                  size="lg"
                  className="w-full"
                  disabled={!activeAmount || activeAmount < 1000}
                  onClick={() => setStep("qris")}
                >
                  Lanjut ke Pembayaran →
                </Button>
              </div>
              <div className="p-8 md:p-12 bg-secondary text-secondary-foreground">
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
                      className="w-full border border-secondary-foreground/30 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-secondary-foreground/30 focus:border-secondary-foreground transition-colors"
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
                      className="w-full border border-secondary-foreground/30 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-secondary-foreground/30 focus:border-secondary-foreground resize-none transition-colors"
                    />
                  </div>
                </div>
                <div className="border border-secondary-foreground/20 p-4 text-sm">
                  <p className="font-bold mb-3 uppercase text-xs tracking-widest">Alokasi Dana</p>
                  <div className="space-y-2 text-secondary-foreground/70 text-xs">
                    {[
                      ["Pembelian pakan", "60%", "bg-accent"],
                      ["Vaksinasi & kesehatan", "25%", "bg-secondary-foreground/60"],
                      ["Operasional program", "15%", "bg-secondary-foreground/30"],
                    ].map(([k, v, cls]) => (
                      <div key={k} className="flex justify-between items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${cls}`} />
                          <span>{k}</span>
                        </div>
                        <span className="font-bold">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: QRIS ── */}
          {step === "qris" && (
            <div className="border-2 border-foreground max-w-2xl mx-auto">
              <div className="p-8 border-b-2 border-foreground bg-secondary text-secondary-foreground">
                <span className="font-mono text-[10px] mb-2 block uppercase tracking-widest text-secondary-foreground/60">
                  [ Scan QR Code ]
                </span>
                <h2 className="text-2xl font-bold uppercase tracking-tight">Bayar via QRIS</h2>
                <p className="text-secondary-foreground/70 text-sm mt-1">
                  Scan dengan aplikasi e-wallet atau mobile banking apapun.
                </p>
              </div>
              <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="shrink-0 border-2 border-foreground p-4 bg-white editorial-shadow">
                  <img
                    src="/qris.jpg"
                    alt="QRIS MEONG Project"
                    className="w-52 h-52 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="text-center mt-3">
                    <p className="font-bold text-sm text-gray-800">Telxstoree</p>
                    <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest">
                      SATU QRIS UNTUK SEMUA
                    </p>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      Nama Penerima
                    </p>
                    <p className="font-bold">Telxstoree</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">NMID</p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-sm font-bold">ID1025433468960</p>
                      <button
                        onClick={copyNMID}
                        className="text-muted-foreground hover:text-accent transition-colors"
                        title="Salin NMID"
                      >
                        {copied ? (
                          <CheckCircle size={14} className="text-accent" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                      Nominal
                    </p>
                    <p className="text-3xl font-bold text-accent">{formatRp(activeAmount)}</p>
                  </div>
                  <div className="border border-foreground/20 bg-muted/30 p-3 text-xs text-muted-foreground">
                    <p className="font-bold mb-1 uppercase tracking-widest text-[10px]">Cara Bayar:</p>
                    <ol className="list-decimal list-inside space-y-0.5">
                      <li>Buka aplikasi e-wallet / m-banking</li>
                      <li>Pilih menu Scan QR / QRIS</li>
                      <li>Scan QR di sebelah kiri</li>
                      <li>Masukkan nominal {formatRp(activeAmount)}</li>
                      <li>Konfirmasi & simpan bukti transfer</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t-2 border-foreground flex gap-3">
                <Button variant="outline" onClick={() => setStep("select")}>
                  ← Kembali
                </Button>
                <Button variant="editorial" className="flex-1" onClick={() => setStep("confirm")}>
                  Sudah Bayar → Upload Bukti
                </Button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Upload Bukti ── */}
          {step === "confirm" && (
            <div className="border-2 border-foreground max-w-lg mx-auto">
              <div className="p-6 border-b-2 border-foreground bg-secondary text-secondary-foreground">
                <span className="font-mono text-[10px] mb-1 block uppercase tracking-widest text-secondary-foreground/60">
                  [ Konfirmasi Donasi ]
                </span>
                <h2 className="text-xl font-bold uppercase tracking-tight">Upload Bukti Transfer</h2>
                <p className="text-secondary-foreground/70 text-xs mt-1">
                  Tim kami akan memverifikasi bukti pembayaran Anda secara manual.
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Ringkasan */}
                <div className="border border-foreground/20 bg-muted/30 p-4 space-y-2">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    Ringkasan Donasi
                  </p>
                  {[
                    ["Nama", name || "Anonim"],
                    ["Nominal", formatRp(activeAmount)],
                    ...(message ? [["Pesan", message]] : []),
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{k}</span>
                      <span className="font-bold max-w-[200px] text-right">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Upload area */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <Upload size={11} />
                    Bukti Transfer (Wajib)
                  </p>

                  {!proofPreview ? (
                    <div
                      onDrop={handleFileDrop}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
                        dragOver
                          ? "border-accent bg-accent/5"
                          : "border-foreground/30 hover:border-foreground hover:bg-muted/30"
                      }`}
                    >
                      <ImageIcon size={32} className="mx-auto mb-3 text-muted-foreground/40" />
                      <p className="font-bold text-sm mb-1">Klik atau seret foto bukti transfer</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        PNG, JPG, JPEG — Maks 10MB
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileSelect(file);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="border-2 border-accent relative">
                      <div className="relative">
                        <img
                          src={proofPreview}
                          alt="Bukti transfer"
                          className="w-full max-h-56 object-contain bg-muted"
                        />
                        <button
                          onClick={removeProof}
                          className="absolute top-2 right-2 bg-background border border-foreground p-1.5 hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <div className="p-3 bg-accent/10 border-t border-accent/30 flex items-center gap-2">
                        <CheckCircle size={14} className="text-accent shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-accent">Bukti terpilih</p>
                          <p className="font-mono text-[10px] text-muted-foreground truncate">
                            {proofFile?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Verifikasi note */}
                <div className="border border-foreground/20 bg-muted/20 p-4 flex gap-3 text-xs">
                  <ShieldCheck size={16} className="text-accent shrink-0 mt-0.5" />
                  <div className="text-muted-foreground leading-relaxed">
                    <p className="font-bold text-foreground mb-0.5">Proses Verifikasi Manual</p>
                    Bukti transfer akan diperiksa oleh tim MEONG dalam 1×24 jam. Donasi hanya
                    dicatat setelah bukti terverifikasi. Data Anda aman dan tidak dibagikan.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep("qris")}>
                    ← Kembali
                  </Button>
                  <Button
                    variant="editorial"
                    className="flex-1"
                    onClick={handleConfirm}
                    disabled={submitting || !proofFile}
                  >
                    {submitting ? "Mengirim..." : proofFile ? "Konfirmasi & Kirim →" : "Upload Bukti Dulu"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4: Done ── */}
          {step === "done" && (
            <div className="border-2 border-foreground max-w-lg mx-auto p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-6 editorial-shadow">
                <CheckCircle size={36} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3 block">
                [ Donasi Terkirim ]
              </span>
              <h2 className="text-3xl font-bold uppercase tracking-tight mb-3">Terima Kasih!</h2>
              <p className="text-muted-foreground mb-2 text-base">
                Donasi{" "}
                <span className="font-bold text-foreground">{formatRp(activeAmount)}</span> atas nama{" "}
                <span className="font-bold text-foreground">{name || "Anonim"}</span> telah diterima.
              </p>
              <p className="text-sm text-muted-foreground mb-2">
                Bukti transfer sedang diverifikasi tim MEONG (1×24 jam).
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Setelah terverifikasi, donasi Anda akan tercatat di ledger transparan.
              </p>
              <div className="border border-accent/30 bg-accent/5 p-4 mb-8 text-sm text-muted-foreground">
                🐱 Donasi Anda akan membantu memberi makan kucing jalanan di 5 area Bandung Selatan.
              </div>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="editorial"
                  onClick={() => {
                    setStep("select");
                    setCustomAmount("");
                    setSelectedAmount(50000);
                    setName("");
                    setMessage("");
                  }}
                >
                  Donasi Lagi
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
                  }
                >
                  Lihat Ledger ↓
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Transparansi Dana */}
      <section className="px-8 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-10">
            {[
              { label: "Total Terkumpul", value: formatRp(totalDonasi) },
              { label: "Donatur", value: `${donations.length}` },
              { label: "Kucing Terlayani", value: "120+" },
              { label: "Titik Feeding", value: "12" },
            ].map((stat) => (
              <div key={stat.label} className="border border-foreground p-6 text-center hover:bg-muted transition-colors group">
                <p className="text-xl md:text-2xl font-bold mb-1 break-all group-hover:text-accent transition-colors">
                  {stat.value}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Allocation bar */}
          <div className="border border-foreground p-6 mb-8">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
              Alokasi Dana
            </p>
            <div className="flex h-5 overflow-hidden border border-foreground/20 mb-3 rounded-sm">
              <div className="bg-accent transition-all" style={{ width: "60%" }} />
              <div className="bg-foreground/60 transition-all" style={{ width: "25%" }} />
              <div className="bg-muted-foreground/40 transition-all" style={{ width: "15%" }} />
            </div>
            <div className="flex flex-wrap gap-4 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-accent inline-block" /> Pakan 60%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-foreground/60 inline-block" /> Kesehatan 25%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-muted-foreground/40 inline-block" /> Operasional 15%
              </span>
            </div>
          </div>

          {/* Ledger */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">
              Ledger Donasi Publik
            </p>
            <div className="border border-foreground overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-foreground bg-muted/30">
                    {["Tanggal", "Nama", "Nominal", "Pesan"].map((h) => (
                      <th
                        key={h}
                        className={`text-left p-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground ${
                          h === "Pesan" ? "hidden md:table-cell" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {displayDonations.map((d, i) => (
                    <tr
                      key={d.id}
                      className={`border-b border-foreground/20 hover:bg-muted/20 transition-colors ${
                        i === 0 && step === "done" ? "bg-accent/5" : ""
                      }`}
                    >
                      <td className="p-4 font-mono text-[10px] text-muted-foreground">
                        {formatDate(d.created_at)}
                      </td>
                      <td className="p-4 font-bold text-[11px] uppercase tracking-widest">
                        {d.name}
                        {i === 0 && step === "done" && (
                          <span className="ml-2 text-[9px] bg-accent text-accent-foreground px-1.5 py-0.5">
                            BARU
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-bold text-accent">{formatRp(d.amount)}</td>
                      <td className="p-4 text-muted-foreground text-xs hidden md:table-cell italic">
                        {d.message || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {donations.length > 8 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="w-full p-4 text-xs font-bold uppercase tracking-widest hover:bg-muted transition-colors flex items-center justify-center gap-2 border-t border-foreground/20"
                >
                  <ChevronDown size={14} className={showAll ? "rotate-180 transition-transform" : "transition-transform"} />
                  {showAll
                    ? "Tampilkan Lebih Sedikit"
                    : `Tampilkan ${donations.length - 8} Donasi Lainnya`}
                </button>
              )}
            </div>
            <p className="font-mono text-[9px] text-center uppercase tracking-widest text-muted-foreground/50 mt-4">
              Semua donasi dicatat secara publik · Dana diaudit setiap bulan oleh tim MEONG
            </p>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
};

export default Donasi;
