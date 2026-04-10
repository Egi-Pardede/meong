import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Announcement {
  date: string;
  title: string;
  content: string;
  priority: "urgent" | "normal" | "info";
}

const announcements: Announcement[] = [
  {
    date: "10 APR 2024",
    title: "Jadwal Feeding Minggu Ini",
    content: "Feeding dilaksanakan setiap Senin, Rabu, Jumat pukul 07:00 dan 17:00 WIB di seluruh titik feeding aktif. Relawan diminta hadir tepat waktu.",
    priority: "urgent",
  },
  {
    date: "08 APR 2024",
    title: "Pembukaan Relawan Batch 2",
    content: "Pendaftaran relawan MEONG Project batch 2 dibuka mulai 15 April 2024. Terbuka untuk mahasiswa dan masyarakat umum. Informasi lebih lanjut akan diumumkan melalui media sosial.",
    priority: "normal",
  },
  {
    date: "05 APR 2024",
    title: "Website MEONG Project Resmi Diluncurkan",
    content: "Platform digital MEONG Project kini dapat diakses. Website ini berfungsi sebagai pusat informasi, koordinasi, dan edukasi terkait program feeding kucing jalanan.",
    priority: "info",
  },
  {
    date: "01 APR 2024",
    title: "Penambahan 3 Titik Feeding Baru",
    content: "Berdasarkan hasil mapping bulan Maret, kami menambahkan 3 titik feeding baru di Sektor 5, 7, dan 9. Dibutuhkan relawan untuk mengadopsi titik-titik tersebut.",
    priority: "normal",
  },
  {
    date: "28 MAR 2024",
    title: "Laporan Bulanan Maret 2024",
    content: "Total pakan yang didistribusikan: 45kg. Kucing terlayani: 89 ekor. Titik feeding aktif: 12 lokasi. Donasi terkumpul: Rp 2.450.000. Terima kasih atas partisipasi semua pihak.",
    priority: "info",
  },
  {
    date: "25 MAR 2024",
    title: "Kolaborasi dengan Komunitas Pet Lover Kota",
    content: "MEONG Project resmi berkolaborasi dengan komunitas Pet Lover Kota untuk program vaksinasi gratis bagi kucing jalanan. Program dimulai April 2024.",
    priority: "normal",
  },
];

const priorityStyles = {
  urgent: "border-l-4 border-l-accent",
  normal: "border-l-4 border-l-foreground",
  info: "border-l-4 border-l-muted-foreground",
};

const priorityLabel = {
  urgent: "Penting",
  normal: "Umum",
  info: "Informasi",
};

const Pengumuman = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="border-b-2 border-foreground p-8 md:p-16">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">
            [ Pengumuman Resmi ]
          </span>
          <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4">
            Bulletin <span className="font-serif italic font-normal text-accent">Board</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Pengumuman satu arah dari tim MEONG Project. Informasi jadwal, kegiatan, dan update terbaru.
          </p>
        </div>
      </section>

      {/* Announcements */}
      <section className="px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {announcements.map((ann, i) => (
            <div
              key={i}
              className={`border border-foreground p-6 md:p-8 transition-colors hover:bg-muted ${priorityStyles[ann.priority]}`}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {ann.date}
                </span>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 ${
                  ann.priority === "urgent" ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {priorityLabel[ann.priority]}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight mb-3">{ann.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{ann.content}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pengumuman;
