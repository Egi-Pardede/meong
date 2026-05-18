import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationMap from "@/components/LocationMap";
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";
import { useState } from "react";

interface Announcement {
  date: string;
  title: string;
  content: string;
  priority: "urgent" | "normal" | "info";
  location?: string;
}

const announcements: Announcement[] = [
  {
    date: "18 MEI 2026",
    title: "Laporan Feeding 18 Mei 2026 — Semua Titik Terlayani",
    content:
      "Kegiatan feeding rutin Senin 18 Mei 2026 berjalan lancar di seluruh 9 sektor aktif. Relawan MeongSquad hadir lengkap dan tepat waktu. Total kucing terlayani hari ini: 68 ekor. Kondisi umum kucing di semua titik baik, tidak ada yang terlihat sakit. Pakan terdistribusi sebanyak ±8kg. Terima kasih untuk semua yang sudah berkontribusi!",
    priority: "urgent",
    location: "Semua Sektor",
  },
  {
    date: "13 MEI 2026",
    title: "Laporan Feeding 13 Mei 2026 — Berjalan Lancar di 5 Titik",
    content:
      "Kegiatan feeding rutin Selasa 13 Mei 2026 telah berhasil dilaksanakan di seluruh titik aktif. Relawan hadir tepat waktu di semua sektor. Total kucing yang terlayani hari ini mencapai 72 ekor. Kondisi kucing di semua titik terpantau sehat. Terima kasih kepada seluruh relawan dan donatur yang membuat kegiatan ini terus bisa berjalan!",
    priority: "normal",
    location: "Semua Sektor",
  },
  {
    date: "05 MEI 2026",
    title: "Jadwal Feeding Minggu Pertama Mei 2026",
    content:
      "Feeding rutin Mei 2026 dilaksanakan sesuai jadwal normal: Senin s.d. Jumat pukul 07:00 dan 17:00 WIB di seluruh titik aktif. Untuk Sektor 3, 7, dan 12 jadwal menyesuaikan hari operasional (lihat tab Jadwal). Relawan harap koordinasi via grup WhatsApp MeongSquad sebelum keberangkatan.",
    priority: "urgent",
    location: "Semua Sektor",
  },
  {
    date: "20 APR 2026",
    title: "Pembukaan Pendaftaran Relawan Batch 3",
    content:
      "Pendaftaran relawan MEONG Project Batch 3 resmi dibuka mulai 20 April 2026. Kuota: 20 relawan baru. Syarat: WNI, usia 17+, berdomisili di Bandung Raya. Komitmen feeding minimal 3x/minggu. Daftar melalui DM Instagram @meong.project atau isi form di halaman Forum.",
    priority: "normal",
  },
  {
    date: "15 APR 2026",
    title: "Rilis Panduan Edukasi Nutrisi & Kesehatan Kucing Jalanan",
    content:
      "MEONG Project merilis panduan edukasi terbaru yang dapat diakses oleh seluruh relawan dan masyarakat umum. Panduan mencakup: jenis pakan yang aman dan bergizi, porsi dan frekuensi pemberian makan, tanda-tanda kucing sakit yang perlu diwaspadai, serta langkah penanganan dasar sebelum dirujuk ke dokter hewan. Panduan dapat diakses melalui halaman Forum.",
    priority: "info",
  },
  {
    date: "10 APR 2026",
    title: "Donasi Mulai Mengalir — Program MEONG Resmi Berjalan",
    content:
      "Sejak program MEONG Project diluncurkan, donasi mulai masuk dari berbagai pihak. Total donasi yang masuk di bulan April 2026: Rp 147.000 dari 13 donatur. Dana seluruhnya digunakan untuk pembelian pakan (60%), kebutuhan operasional (25%), dan pengembangan program (15%). Laporan lengkap dapat dilihat di halaman Donasi. Terima kasih atas kepercayaan semua pihak!",
    priority: "info",
  },
  {
    date: "05 APR 2026",
    title: "Penambahan 2 Titik Feeding Baru — Sukabirus",
    content:
      "Berdasarkan hasil mapping bulan Maret 2026, ditemukan konsentrasi kucing jalanan di 2 area baru: Sektor 11 (Jl. Cihampelas area selatan) dan Sektor 12 (Taman Lansia) di kawasan Sukabirus. Kedua titik resmi dibuka mulai 5 April 2026 dan kini sudah ditangani oleh tim MeongSquad.",
    priority: "normal",
    location: "Sukabirus",
  },
  {
    date: "01 APR 2026",
    title: "Laporan Bulanan Maret 2026 — Bulan Perdana Program",
    content:
      "Ringkasan kegiatan Maret 2026 sebagai bulan perdana MEONG Project: Titik feeding aktif: 7 lokasi (awal). Kucing terlayani rutin: ±45 ekor. Pakan terdistribusi: ±18kg. Relawan yang bergabung: 6 orang. Program baru dimulai, sistem koordinasi dan pembagian tugas sedang dibangun. Terima kasih atas kepercayaan dan dukungan awal dari semua pihak yang percaya pada inisiatif ini.",
    priority: "info",
  },
];

const feedingSchedule = [
  { sector: "Sektor 1",  location: "Depan Gedung Rektorat",   area: "Telkom University", days: "Sen, Rab, Jum", time: "07:00 & 17:00", cats: 8,  guardian: "MeongSquad" },
  { sector: "Sektor 2",  location: "Kantin Utara",             area: "Telkom University", days: "Sen–Jum",       time: "07:00 & 17:00", cats: 12, guardian: "MeongSquad" },
  { sector: "Sektor 3",  location: "Taman Samping Lab",        area: "Telkom University", days: "Sel, Kam, Sab", time: "07:30 & 17:30", cats: 6,  guardian: "MeongSquad" },
  { sector: "Sektor 4",  location: "Jl. Sukapura",             area: "Sukapura",          days: "Sen, Rab, Jum", time: "07:00 & 17:00", cats: 8,  guardian: "MeongSquad" },
  { sector: "Sektor 5",  location: "Perumahan Ciganitri",      area: "Ciganitri",         days: "Sen, Rab, Jum", time: "07:00 & 17:00", cats: 9,  guardian: "MeongSquad" },
  { sector: "Sektor 7",  location: "Area Kos-kosan PGA",       area: "PGA",               days: "Sel, Kam",      time: "08:00 & 18:00", cats: 5,  guardian: "MeongSquad" },
  { sector: "Sektor 9",  location: "Parkiran Belakang",        area: "Telkom University", days: "Sen, Rab, Jum", time: "07:00 & 17:00", cats: 7,  guardian: "MeongSquad" },
  { sector: "Sektor 11", location: "Jl. Cihampelas Selatan",  area: "Sukabirus",         days: "Sen–Jum",       time: "07:00 & 17:00", cats: 10, guardian: "MeongSquad" },
  { sector: "Sektor 12", location: "Taman Lansia Sukabirus",  area: "Sukabirus",         days: "Sen, Rab, Sab", time: "07:30 & 17:30", cats: 7,  guardian: "MeongSquad" },
];

const priorityStyles = {
  urgent: "border-l-4 border-l-accent",
  normal: "border-l-4 border-l-foreground",
  info: "border-l-4 border-l-muted-foreground/40",
};
const priorityLabel = { urgent: "Penting", normal: "Umum", info: "Informasi" };
const priorityBadge = {
  urgent: "bg-accent text-accent-foreground",
  normal: "bg-foreground text-background",
  info: "bg-muted text-muted-foreground",
};

type Tab = "pengumuman" | "jadwal" | "peta";

const Pengumuman = () => {
  const [tab, setTab] = useState<Tab>("pengumuman");
  const [expanded, setExpanded] = useState<number | null>(0);

  const tabs: { id: Tab; label: string }[] = [
    { id: "pengumuman", label: "Pengumuman" },
    { id: "jadwal", label: "Jadwal Feeding" },
    { id: "peta", label: "Peta Lokasi" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="border-b-2 border-foreground p-8 md:p-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/40 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto relative">
          <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">
            [ Pengumuman Resmi ]
          </span>
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4 leading-[0.9]">
            Bulletin{" "}
            <span className="font-serif italic font-normal text-accent">Board</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mt-6">
            Pengumuman resmi, jadwal feeding, dan peta area operasi MEONG Project — selalu diperbarui.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span className="flex items-center gap-1.5"><Calendar size={11} /> Apr–Mei 2026</span>
            <span className="flex items-center gap-1.5"><MapPin size={11} /> 5 Area — Bandung Selatan</span>
            <span className="flex items-center gap-1.5"><Clock size={11} /> Update setiap hari</span>
          </div>
        </div>
      </section>

      {/* Tab navigation */}
      <section className="border-b-2 border-foreground px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto flex">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors ${
                tab === t.id
                  ? "border-accent text-accent"
                  : "border-transparent hover:text-accent hover:border-accent/30"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── TAB: Pengumuman ── */}
      {tab === "pengumuman" && (
        <section className="px-8 py-8">
          <div className="max-w-4xl mx-auto space-y-3">
            {announcements.map((ann, i) => (
              <div
                key={i}
                className={`border border-foreground transition-colors ${priorityStyles[ann.priority]} ${
                  expanded === i ? "bg-muted/40" : "hover:bg-muted/20"
                }`}
              >
                <button
                  className="w-full text-left p-6 md:p-8"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  <div className="flex flex-wrap items-start gap-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {ann.date}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${
                            priorityBadge[ann.priority]
                          }`}
                        >
                          {priorityLabel[ann.priority]}
                        </span>
                        {ann.location && (
                          <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                            <MapPin size={9} /> {ann.location}
                          </span>
                        )}
                      </div>
                      <h3
                        className={`text-lg md:text-xl font-bold uppercase tracking-tight ${
                          expanded === i ? "text-accent" : ""
                        }`}
                      >
                        {ann.title}
                      </h3>
                    </div>
                    <ChevronRight
                      size={18}
                      className={`shrink-0 mt-1 transition-transform ${
                        expanded === i ? "rotate-90 text-accent" : ""
                      }`}
                    />
                  </div>
                  {expanded === i && (
                    <p className="text-sm leading-relaxed text-muted-foreground mt-4 pt-4 border-t border-foreground/20">
                      {ann.content}
                    </p>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── TAB: Jadwal ── */}
      {tab === "jadwal" && (
        <section className="px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 p-4 border border-foreground/20 bg-muted/30 flex flex-wrap gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock size={12} /> Jam: WIB
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={12} /> 5 area — Telkom Univ., Ciganitri, PGA, Sukapura, Sukabirus
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={12} /> Jadwal aktif Apr–Mei 2026
              </div>
            </div>

            <div className="overflow-x-auto border border-foreground">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-foreground bg-secondary text-secondary-foreground">
                    {["Sektor", "Area", "Lokasi Detail", "Hari", "Jam", "🐱", "Guardian"].map((h) => (
                      <th
                        key={h}
                        className="text-left p-4 font-mono text-[10px] uppercase tracking-widest text-secondary-foreground/70"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {feedingSchedule.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-foreground/20 hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4 font-bold">{row.sector}</td>
                      <td className="p-4">
                        <span className="font-mono text-[10px] uppercase tracking-widest bg-muted px-2 py-0.5 border border-foreground/20">
                          {row.area}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground text-xs">{row.location}</td>
                      <td className="p-4 font-mono text-[11px]">{row.days}</td>
                      <td className="p-4 font-mono text-[11px] font-bold">{row.time}</td>
                      <td className="p-4">
                        <span className="border border-foreground px-2 py-0.5 text-[10px] font-bold">
                          {row.cats}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                          @{row.guardian}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 border border-foreground/20 bg-muted/20 p-6">
              <h4 className="font-bold uppercase text-sm mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full" />
                Semua Sektor Sudah Memiliki Guardian
              </h4>
              <p className="text-sm text-muted-foreground">
                Seluruh 9 sektor feeding kini sudah ditangani oleh tim <span className="font-bold text-foreground">@MeongSquad</span>.
                Ingin bergabung sebagai relawan? Hubungi kami via Instagram{" "}
                <a href="https://instagram.com/meong.project" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">
                  @meong.project
                </a>{" "}
                atau daftarkan diri di{" "}
                <a href="/forum" className="text-accent hover:underline">Forum</a>.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── TAB: Peta ── */}
      {tab === "peta" && (
        <section className="px-8 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <span className="font-mono text-[10px] mb-2 block uppercase tracking-widest text-muted-foreground">
                [ Peta Interaktif ]
              </span>
              <h2 className="text-2xl font-bold uppercase tracking-tight mb-2">
                Area Operasi MEONG Project
              </h2>
              <p className="text-sm text-muted-foreground">
                Klik marker untuk detail jumlah kucing dan lokasi. Klik & drag untuk panning, scroll untuk zoom.
              </p>
            </div>

            <LocationMap />

            {/* Area cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  area: "Telkom University",
                  sectors: "Sektor 1, 2, 3, 9",
                  cats: 33,
                  desc: "Kampus utama — area rektorat, kantin, lab, parkiran",
                  active: true,
                },
                {
                  area: "Ciganitri",
                  sectors: "Sektor 5",
                  cats: 9,
                  desc: "Area perumahan Ciganitri, dekat pintu gerbang utama TU",
                  active: true,
                },
                {
                  area: "PGA",
                  sectors: "Sektor 7",
                  cats: 5,
                  desc: "Kawasan PGA — area kos-kosan padat",
                  active: true,
                },
                {
                  area: "Sukapura",
                  sectors: "Sektor 4",
                  cats: 8,
                  desc: "Jl. Sukapura, jalur menuju kampus dari arah Dayeuhkolot",
                  active: true,
                },
                {
                  area: "Sukabirus",
                  sectors: "Sektor 11, 12",
                  cats: 17,
                  desc: "Jl. Cihampelas Selatan & Taman Lansia — butuh relawan!",
                  active: false,
                },
              ].map((loc) => (
                <div
                  key={loc.area}
                  className={`border p-5 hover:bg-muted transition-colors ${
                    loc.active ? "border-foreground" : "border-accent/50 bg-accent/5"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold uppercase tracking-tight">{loc.area}</h4>
                      <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">
                        {loc.sectors}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">{loc.cats}</p>
                      <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                        kucing
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{loc.desc}</p>
                  {!loc.active && (
                    <div className="mt-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-accent">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                      Butuh relawan
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Pengumuman;
