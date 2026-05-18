import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroCats from "@/assets/hero-cats.jpg";
import kucing1Img from "@/assets/kucing1.jpg";
import kucing5Img from "@/assets/kucing5.jpg";
import kucing7Img from "@/assets/kucing7.jpg";
import kucing6Img from "@/assets/kucing6.jpg";
import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Newspaper,
  Heart,
  MessageSquare,
  Bell,
  Cat,
  TrendingUp,
  Users,
  Shield,
  Globe,
} from "lucide-react";

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

// ─── Intersection observer hook ───────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Stats animated ───────────────────────────────────────────────────────────
function AnimatedStat({ val, label, suffix = "" }: { val: number; label: string; suffix?: string }) {
  const { ref, inView } = useInView();
  const count = useCountUp(val, 1600, inView);
  return (
    <div ref={ref} className="border border-foreground p-4 text-center group hover:bg-muted transition-colors hover:border-accent">
      <p className="text-2xl md:text-3xl font-bold group-hover:text-accent transition-colors">
        {count.toLocaleString("id-ID")}{suffix}
      </p>
      <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

// ─── Ticker marquee data ──────────────────────────────────────────────────────
const tickerItems = [
  "🐱 Feeding aktif di 12 titik",
  "💰 Donasi April tercapai 120%",
  "🌍 SDGs 17 — Partnership for the Goals",
  "🏥 Pemantauan Kesehatan Kucing Rutin",
  "📍 Area baru: Sukabirus & Sukapura",
  "❤️ 120+ kucing terlayani bulan ini",
  "🤝 34 relawan aktif bergabung",
  "📦 38kg pakan terdistribusi",
];

const beritaItems = [
  {
    date: "25 APR 2026",
    tag: "Kegiatan",
    title: "Feeding Massal Peringatan Hari Bumi di 5 Titik Serentak",
    desc: "Tim MEONG Project menggelar feeding massal pada 22 April 2026 di 5 titik serentak dengan total 120 ekor kucing terlayani.",
  },
  {
    date: "13 MEI 2026",
    tag: "Laporan",
    title: "Feeding 13 Mei — 72 Kucing Terlayani di 5 Titik Serentak",
    desc: "Kegiatan feeding hari ini berjalan lancar. Seluruh relawan hadir tepat waktu dan semua titik aktif terlayani dengan baik.",
  },
  {
    date: "10 APR 2026",
    tag: "Donasi",
    title: "Target Donasi April Tercapai 120% dalam 10 Hari",
    desc: "Berkat dukungan komunitas, target donasi bulan April sebesar Rp 5.000.000 berhasil terlampaui hanya dalam 10 hari pertama.",
  },
];

const edukasiItems = [
  {
    icon: "🐱",
    title: "Nutrisi Kucing Jalanan",
    desc: "Panduan lengkap jenis makanan, porsi, dan frekuensi pemberian pakan yang optimal untuk kucing jalanan.",
    tag: "Nutrisi",
  },
  {
    icon: "💉",
    title: "Vaksinasi & Sterilisasi",
    desc: "Mengapa vaksinasi dan sterilisasi penting untuk kesehatan populasi kucing jalanan dan lingkungan sekitar.",
    tag: "Kesehatan",
  },
  {
    icon: "🏠",
    title: "Panduan Adopsi Bertanggung Jawab",
    desc: "Sebelum mengadopsi kucing jalanan, pahami komitmen, persiapan rumah, dan proses adaptasi yang diperlukan.",
    tag: "Adopsi",
  },
  {
    icon: "🤝",
    title: "Menjadi Relawan Feeding",
    desc: "Cara mendaftar, tugas dan tanggung jawab relawan, serta tips aman saat berinteraksi dengan kucing jalanan.",
    tag: "Relawan",
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
const Index = () => {
  const { ref: prokerRef, inView: prokerInView } = useInView();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── Live Ticker ── */}
      <div className="border-b-2 border-foreground bg-accent text-accent-foreground overflow-hidden py-2">
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="font-mono text-[11px] uppercase tracking-widest px-8 shrink-0">
              {item}
              <span className="mx-6 opacity-40">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-foreground min-h-[85vh]">
        <div className="md:col-span-7 p-8 md:p-16 md:border-r-2 border-foreground flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                [ Inisiatif Sosial 2025–2026 ]
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-accent font-mono">
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                Live
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.88] mb-8 text-balance">
              Karena{" "}
              <span className="font-serif italic font-normal text-accent">meong</span>
              <br />
              juga butuh makan.
            </h1>
            <p className="text-lg md:text-xl max-w-[45ch] leading-relaxed mb-10 text-muted-foreground">
              Sistem kolaboratif berbasis teknologi untuk pemenuhan pangan kucing jalanan secara berkelanjutan
              di Bandung Selatan.
            </p>
          </div>
          <div>
            <div className="flex flex-wrap gap-4 mb-10">
              <Button variant="editorial" size="lg" asChild>
                <Link to="/donasi">Donasi Sekarang</Link>
              </Button>
              <Button variant="link" size="lg" asChild>
                <a href="#tentang">Baca Selengkapnya ↓</a>
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <AnimatedStat val={120} label="Kucing Terlayani" suffix="+" />
              <AnimatedStat val={12} label="Titik Feeding" />
              <AnimatedStat val={234} label="Donatur" suffix="+" />
            </div>
          </div>
        </div>

        <div className="md:col-span-5 relative bg-muted min-h-[300px] md:min-h-0">
          <img
            src={heroCats}
            alt="Kucing jalanan sedang makan bersama"
            className="w-full h-full object-cover grayscale contrast-125"
            loading="eager"
            style={{ mixBlendMode: "multiply" }}
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 to-transparent pointer-events-none" />

          <div className="absolute bottom-6 right-6 bg-background border border-foreground p-4 editorial-shadow">
            <p className="font-mono text-[10px] leading-relaxed">
              SUBJECT: KUCING JALANAN
              <br />
              STATUS: FEEDING AKTIF
              <br />
              SDGs: 17 / 9
            </p>
          </div>
          <div className="absolute top-6 left-6 bg-accent text-accent-foreground px-3 py-1.5 editorial-shadow">
            <p className="font-mono text-[10px] uppercase tracking-widest font-bold">LIVE — APR 2026</p>
          </div>
          <div className="absolute bottom-6 left-6 bg-background/90 border border-foreground/30 px-3 py-2">
            <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
              📍 Bandung Selatan
            </p>
          </div>
        </div>
      </section>

      {/* ── Tentang ── */}
      <section id="tentang" className="border-b-2 border-foreground">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-16 md:border-r-2 border-foreground">
            <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">
              [ Tentang Kami ]
            </span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-8">
              Apa itu MEONG Project?
            </h2>
            <p className="leading-relaxed text-muted-foreground mb-6">
              MEONG Project merupakan inisiatif sosial berbasis kolaborasi yang berfokus pada pemenuhan kebutuhan
              pangan kucing jalanan secara berkelanjutan. Program ini membangun sistem terstruktur melalui
              pemanfaatan teknologi digital, partisipasi masyarakat, serta pengelolaan data kucing jalanan.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Istilah "MEONG" merepresentasikan suara kucing jalanan yang sering dianggap sepele — namun
              kebutuhan dasarnya kerap terabaikan di lingkungan kita.
            </p>
          </div>
          <div className="p-8 md:p-16">
            <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">
              [ Tujuan ]
            </span>
            <div className="space-y-5">
              {[
                "Memenuhi kebutuhan pangan kucing jalanan secara konsisten",
                "Meningkatkan kepedulian masyarakat terhadap kesejahteraan hewan",
                "Membangun sistem kolaboratif berbasis komunitas",
                "Mengembangkan platform digital sebagai media edukasi dan koordinasi",
                "Menciptakan program sosial yang berkelanjutan dan terukur",
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <span className="font-mono text-lg text-muted-foreground/20 group-hover:text-accent/40 transition-colors shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SDGs ── */}
      <section className="py-20 px-8 bg-secondary text-secondary-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="font-mono text-xs mb-4 block uppercase tracking-widest text-secondary-foreground/60">
              [ Landasan SDGs ]
            </span>
            <h2 className="text-4xl font-bold uppercase tracking-tighter">Keterkaitan dengan SDGs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                code: "SDG 17 — Fokus Utama",
                title: "Partnership for the Goals",
                desc: "Kolaborasi mahasiswa, masyarakat, komunitas, dan sektor swasta. Sistem donasi dan partisipasi publik yang transparan.",
                icon: Globe,
              },
              {
                code: "SDG 9",
                title: "Innovation & Infrastructure",
                desc: "Platform digital untuk edukasi, koordinasi feeding, dan pengelolaan data kucing jalanan berbasis teknologi.",
                icon: TrendingUp,
              },
            ].map((s, i) => (
              <div key={i} className="border-t border-secondary-foreground/30 pt-6 group">
                <s.icon size={24} className="text-secondary-foreground/40 mb-4 group-hover:text-accent transition-colors" />
                <span className="font-mono text-xs text-secondary-foreground/60">[ {s.code} ]</span>
                <h3 className="text-2xl font-serif italic my-3">{s.title}</h3>
                <p className="text-sm text-secondary-foreground/80 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dampak Nyata (Pancasila) ── */}
      <section className="border-b-2 border-foreground px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">
                [ Dampak Nyata ]
              </span>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-8 leading-tight">
                Kontribusi
                <br />
                <span className="font-serif italic font-normal text-accent">Terukur</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Setiap aksi MEONG Project dijalankan dengan prinsip gotong royong dan transparansi — nilai-nilai
                Pancasila yang menjadi fondasi gerakan ini.
              </p>
              <div className="space-y-4">
                {[
                  { sila: "Sila 2", val: "Kemanusiaan yang Adil & Beradab", desc: "Peduli terhadap makhluk hidup yang tidak bisa bersuara." },
                  { sila: "Sila 3", val: "Persatuan Indonesia", desc: "Kolaborasi lintas komunitas, kampus, dan masyarakat lokal." },
                  { sila: "Sila 5", val: "Keadilan Sosial", desc: "Distribusi sumber daya (pakan) secara merata dan terstruktur." },
                ].map((item) => (
                  <div key={item.sila} className="flex gap-4 border border-foreground/20 p-4 hover:bg-muted transition-colors">
                    <span className="font-mono text-xs text-accent font-bold shrink-0 mt-0.5">{item.sila}</span>
                    <div>
                      <p className="font-bold text-sm mb-0.5">{item.val}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div ref={prokerRef} className="grid grid-cols-2 gap-3">
              {[
                { icon: Cat, val: "120+", label: "Kucing terlayani", detail: "di 5 area Bandung Selatan" },
                { icon: Users, val: "38", label: "Relawan aktif", detail: "dari berbagai komunitas" },
                { icon: Heart, val: "Rp 6jt+", label: "Dana terkumpul", detail: "Apr 2026 — 120% target" },
                { icon: Globe, val: "2", label: "Mitra institusi", detail: "Kampus & komunitas lokal" },
                { icon: Shield, val: "5", label: "Kucing diadopsi", detail: "Program Open Adopt" },
                { icon: TrendingUp, val: "98kg", label: "Pakan distribusi", detail: "Maret 2026" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="border border-foreground p-5 hover:bg-secondary hover:text-secondary-foreground transition-all group"
                  style={{
                    opacity: prokerInView ? 1 : 0,
                    transform: prokerInView ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                  }}
                >
                  <item.icon size={18} className="mb-3 text-muted-foreground group-hover:text-secondary-foreground/60 transition-colors" />
                  <p className="text-2xl font-bold mb-0.5 group-hover:text-accent transition-colors">{item.val}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-secondary-foreground/60 transition-colors">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1 group-hover:text-secondary-foreground/40 transition-colors">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Visi Misi ── */}
      <section className="border-b-2 border-foreground">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-16 md:border-r-2 border-foreground bg-secondary text-secondary-foreground">
            <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-secondary-foreground/60">
              [ Visi ]
            </span>
            <p className="text-xl md:text-2xl font-serif italic leading-relaxed">
              "Mewujudkan ekosistem kepedulian terhadap kucing jalanan yang kolaboratif, terstruktur, dan
              berkelanjutan melalui pemanfaatan teknologi dan partisipasi masyarakat."
            </p>
          </div>
          <div className="p-8 md:p-16">
            <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">
              [ Misi ]
            </span>
            <ul className="space-y-4">
              {[
                "Menyediakan pakan bagi kucing jalanan secara rutin dan terorganisir",
                "Membangun kolaborasi antara mahasiswa, masyarakat, dan komunitas",
                "Mengembangkan platform digital untuk edukasi dan pengelolaan data",
                "Meningkatkan kesadaran sosial melalui kampanye digital",
                "Mendorong keberlanjutan melalui sistem adopsi dan donasi",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-sm leading-relaxed">
                  <span className="text-accent font-bold mt-0.5 shrink-0">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Nilai-Nilai ── */}
      <section className="border-b-2 border-foreground px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <span className="font-mono text-xs mb-8 block uppercase tracking-widest text-muted-foreground">
            [ Nilai-Nilai ]
          </span>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { title: "Empati", desc: "Peduli makhluk hidup" },
              { title: "Kolaborasi", desc: "Kerja sama antar pihak" },
              { title: "Keberlanjutan", desc: "Bukan aksi sesaat" },
              { title: "Inovasi", desc: "Manfaatkan teknologi" },
              { title: "Tanggung Jawab", desc: "Transparan & konsisten" },
            ].map((val, i) => (
              <div
                key={i}
                className="border border-foreground p-6 hover:bg-foreground hover:text-background transition-all group cursor-default editorial-shadow-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
              >
                <h4 className="font-bold uppercase text-sm mb-2 group-hover:text-background transition-colors">
                  {val.title}
                </h4>
                <p className="text-[11px] text-muted-foreground group-hover:text-background/70 transition-colors">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Program Kerja ── */}
      <section className="border-b-2 border-foreground">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-16 md:border-r-2 border-foreground">
            <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">
              [ Program Kerja ]
            </span>
            <h2 className="text-4xl font-bold uppercase tracking-tighter mb-12">Operasi Saat Ini</h2>
            <div className="space-y-10">
              {[
                {
                  num: "01",
                  title: "Feeding Rutin",
                  desc: "Pemberian pakan di 12 titik aktif, Senin–Jumat pukul 07:00 & 17:00 WIB. Dilaksanakan oleh relawan terlatih dengan koordinasi berbasis digital.",
                },
                {
                  num: "02",
                  title: "Open Adopt",
                  desc: "Program adopsi terbuka untuk kucing jalanan yang perlu rumah baru. Memfasilitasi pertemuan calon adopter dengan kucing yang membutuhkan.",
                },
                {
                  num: "03",
                  title: "Edukasi & Kampanye",
                  desc: "Konten edukasi digital tentang nutrisi, vaksinasi, sterilisasi, dan cara bertanggung jawab dalam merawat kucing jalanan.",
                },
                {
                  num: "04",
                  title: "Pemantauan Kesehatan",
                  desc: "Monitoring kondisi kesehatan kucing di setiap titik feeding secara berkala. Kucing yang teridentifikasi sakit dicatat dan dirujuk ke dokter hewan terdekat.",
                },
              ].map((p) => (
                <div key={p.num} className="flex gap-6 group">
                  <span className="font-mono text-3xl font-bold text-muted-foreground/20 group-hover:text-accent/30 transition-colors shrink-0">
                    {p.num}
                  </span>
                  <div>
                    <h3 className="font-bold uppercase text-base mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 md:p-16 border-t-2 md:border-t-0 border-foreground">
            <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">
              [ Statistik Apr 2026 ]
            </span>
            <div className="grid grid-cols-2 gap-3 mb-12">
              {[
                { val: "120+", label: "Kucing terlayani" },
                { val: "12", label: "Titik feeding aktif" },
                { val: "38", label: "Relawan bergabung" },
                { val: "Rp 6jt+", label: "Dana terkumpul" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-foreground p-4 hover:border-accent transition-colors group"
                >
                  <p className="text-3xl font-bold mb-1 group-hover:text-accent transition-colors">
                    {stat.val}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-foreground pt-8">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                [ Area Operasi ]
              </p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { area: "Telkom University", sectors: "Sektor 1, 2, 3, 9", cats: 33 },
                  { area: "Ciganitri", sectors: "Sektor 5", cats: 9 },
                  { area: "PGA", sectors: "Sektor 7", cats: 5 },
                  { area: "Sukapura", sectors: "Sektor 4", cats: 8 },
                  { area: "Sukabirus", sectors: "Sektor 11, 12", cats: 17 },
                ].map((loc) => (
                  <div key={loc.area} className="flex items-center justify-between border-b border-foreground/10 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                      <span className="text-[11px] font-bold">{loc.area}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">{loc.sectors}</span>
                    </div>
                    <span className="text-[11px] font-bold text-accent">{loc.cats} 🐱</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Berita Terbaru ── */}
      <section className="p-8 md:p-16 border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="font-mono text-xs mb-3 flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                <Newspaper size={12} /> [ Berita Terbaru ]
              </span>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">Dari Lapangan</h2>
            </div>
            <Link
              to="/pengumuman"
              className="font-mono text-xs uppercase tracking-widest text-accent hover:underline shrink-0"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {beritaItems.map((item, i) => (
              <Link
                key={i}
                to="/pengumuman"
                className="border border-foreground p-6 hover:bg-muted transition-colors group hover:border-accent"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-[10px] text-muted-foreground">{item.date}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-accent/10 text-accent px-2 py-0.5">
                    {item.tag}
                  </span>
                </div>
                <h4 className="font-bold text-base leading-snug mb-3 group-hover:underline">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Edukasi ── */}
      <section className="p-8 md:p-16 border-b-2 border-foreground bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="font-mono text-xs mb-3 flex items-center gap-2 uppercase tracking-widest text-secondary-foreground/60">
                <BookOpen size={12} /> [ Edukasi ]
              </span>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">
                Pelajari Lebih Lanjut
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1">
            {edukasiItems.map((item, i) => (
              <div
                key={i}
                className="border border-secondary-foreground/20 p-6 hover:bg-secondary-foreground/5 transition-colors group cursor-pointer hover:border-secondary-foreground/40"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-secondary-foreground/50 mb-3 block">
                  {item.tag}
                </span>
                <h4 className="font-bold text-base mb-2 group-hover:underline">{item.title}</h4>
                <p className="text-sm text-secondary-foreground/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Forum Preview ── */}
      <section className="p-8 md:p-16 border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="font-mono text-xs mb-3 flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                <MessageSquare size={12} /> [ Forum Diskusi ]
              </span>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">Suara Komunitas</h2>
            </div>
            <Link
              to="/forum"
              className="font-mono text-xs uppercase tracking-widest text-accent hover:underline shrink-0"
            >
              Ke Forum →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
            {[
              {
                id: "#POST_001",
                title: "Tips Memberi Makan Kucing Jalanan",
                desc: "Makanan apa yang aman dan bergizi untuk kucing jalanan?",
                author: "CatLover_ID",
              },
              {
                id: "#POST_002",
                title: "Kucing Baru di Sektor Kampus Timur",
                desc: "Ada 3 kucing baru di area kampus timur. Perlu feeding spot tambahan.",
                author: "VolunteerAyu",
              },
              {
                id: "#POST_003",
                title: "Pengalaman Pertama Jadi Relawan MEONG",
                desc: "Sharing cerita seru ikut feeding perdana bersama tim!",
                author: "MeongSquad",
              },
            ].map((post) => (
              <Link
                key={post.id}
                to="/forum"
                className="border border-foreground p-6 hover:bg-muted transition-colors group hover:border-accent"
              >
                <span className="font-mono text-[10px] block mb-4 text-muted-foreground">{post.id}</span>
                <h5 className="font-bold text-lg mb-2 group-hover:underline">{post.title}</h5>
                <p className="text-sm text-muted-foreground mb-4">{post.desc}</p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                  @{post.author}
                </span>
              </Link>
            ))}
            <Link
              to="/forum"
              className="border border-foreground bg-foreground text-background p-6 flex flex-col justify-center items-center text-center hover:bg-accent hover:border-accent transition-colors"
            >
              <Cat size={32} className="mb-3 opacity-70" />
              <h5 className="font-bold text-lg mb-2">Gabung Forum</h5>
              <p className="text-[10px] uppercase tracking-widest opacity-60">Diskusi & berbagi</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pengumuman Preview ── */}
      <section className="p-8 md:p-16 border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="font-mono text-xs mb-3 flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                <Bell size={12} /> [ Pengumuman ]
              </span>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">Update Terkini</h2>
            </div>
            <Link
              to="/pengumuman"
              className="font-mono text-xs uppercase tracking-widest text-accent hover:underline shrink-0"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="space-y-2">
            {[
              {
                date: "28 APR 2026",
                title: "Jadwal Feeding Minggu Terakhir April 2026",
                desc: "Feeding dilaksanakan Senin–Jumat pukul 07:00 dan 17:00 WIB di seluruh titik aktif.",
                urgent: true,
              },
              {
                date: "22 APR 2026",
                title: "Rekap Kegiatan Hari Bumi — 120 Kucing Terlayani",
                desc: "Terima kasih kepada 45 relawan yang hadir! Total pakan terdistribusi: 38kg.",
                urgent: false,
              },
              {
                date: "15 APR 2026",
                title: "Pembukaan Relawan Batch 3 — Pendaftaran Dibuka",
                desc: "Kuota terbatas untuk 20 relawan baru. Daftarkan diri melalui forum atau Instagram.",
                urgent: false,
              },
            ].map((ann, i) => (
              <Link
                key={i}
                to="/pengumuman"
                className="border border-foreground p-5 flex flex-col md:flex-row gap-4 md:gap-8 items-start hover:bg-muted transition-colors group hover:border-accent"
              >
                <div className="flex items-center gap-2 shrink-0">
                  {ann.urgent && (
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  )}
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground pt-0.5">
                    {ann.date}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold uppercase mb-1 group-hover:underline">{ann.title}</h4>
                  <p className="text-sm text-muted-foreground">{ann.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Adopt Preview ── */}
      <section className="p-8 md:p-16 border-b-2 border-foreground bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="font-mono text-xs mb-3 flex items-center gap-2 uppercase tracking-widest text-muted-foreground">
                <Heart size={12} /> [ Open Adopt ]
              </span>
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">Butuh Rumah Baru</h2>
              <p className="text-muted-foreground mt-3 max-w-xl">
                Kucing-kucing ini membutuhkan keluarga baru yang peduli. Adopsi adalah pilihan mulia.
              </p>
            </div>
            <Link
              to="/adopt"
              className="font-mono text-xs uppercase tracking-widest text-accent hover:underline shrink-0"
            >
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Midnight", location: "Telkom University", img: kucing1Img },
              { name: "Jeruk",    location: "PGA, Bandung",       img: kucing5Img },
              { name: "Salju",    location: "Telkom University",  img: kucing7Img },
              { name: "Dino",     location: "Telkom University",  img: kucing6Img },
            ].map((cat, i) => (
              <Link
                key={i}
                to="/adopt"
                className="border border-foreground overflow-hidden group hover:border-accent transition-colors hover:editorial-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold uppercase text-lg">{cat.name}</h4>
                  <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                    {cat.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Donasi CTA ── */}
      <section className="p-8 md:p-16 bg-secondary text-secondary-foreground">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-secondary-foreground/60">
                [ Dukung Kami ]
              </span>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 leading-tight">
                Jadilah bagian dari{" "}
                <span className="font-serif italic font-normal">perubahan.</span>
              </h2>
              <p className="text-secondary-foreground/70 leading-relaxed mb-8">
                Kontribusi Anda langsung digunakan untuk membeli pakan, membiayai perawatan, dan membangun
                titik feeding baru.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="border-2 border-secondary-foreground bg-transparent text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary font-bold uppercase tracking-tight h-14 px-10 text-lg transition-all editorial-shadow-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                  asChild
                >
                  <Link to="/donasi">Donasi via QRIS</Link>
                </Button>
                <Button
                  variant="link"
                  size="xl"
                  className="text-secondary-foreground/70 hover:text-secondary-foreground"
                  asChild
                >
                  <Link to="/forum">Gabung Komunitas →</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { emoji: "🔒", text: "QRIS Resmi & Aman" },
                { emoji: "📋", text: "Bukti Transfer Diverifikasi" },
                { emoji: "📊", text: "Ledger Publik & Transparan" },
                { emoji: "🐱", text: "100% untuk Kucing Jalanan" },
              ].map((item) => (
                <div key={item.text} className="border border-secondary-foreground/20 p-4 text-center">
                  <p className="text-2xl mb-2">{item.emoji}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-secondary-foreground/60">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-12 font-mono text-[10px] uppercase tracking-widest text-secondary-foreground/40 text-center">
            100% dana digunakan untuk program feeding & perawatan kucing jalanan · Transparan & Teraudit
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
