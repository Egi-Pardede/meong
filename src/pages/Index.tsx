import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroCats from "@/assets/hero-cats.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-12 border-b-2 border-foreground">
        <div className="md:col-span-7 p-8 md:p-16 md:border-r-2 border-foreground">
          <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">
            [ Inisiatif Sosial 2024 ]
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8 text-balance">
            Karena{" "}
            <span className="font-serif italic font-normal text-accent">meong</span>{" "}
            juga butuh makan.
          </h1>
          <p className="text-lg md:text-xl max-w-[45ch] leading-relaxed mb-12 text-muted-foreground">
            Sistem kolaboratif berbasis teknologi untuk pemenuhan pangan kucing jalanan secara berkelanjutan.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="editorial" size="lg" asChild>
              <Link to="/donasi">Donasi Sekarang</Link>
            </Button>
            <Button variant="link" size="lg" asChild>
              <a href="#tentang">Baca Selengkapnya</a>
            </Button>
          </div>
        </div>
        <div className="md:col-span-5 relative bg-muted min-h-[300px] md:min-h-0">
          <img
            src={heroCats}
            alt="Kucing jalanan sedang makan bersama"
            className="w-full h-full object-cover grayscale contrast-125 mix-blend-multiply"
            loading="eager"
          />
          <div className="absolute bottom-6 right-6 bg-background border border-foreground p-4 editorial-shadow">
            <p className="font-mono text-[10px] leading-tight">
              SUBJECT: KUCING JALANAN<br />
              STATUS: FEEDING AKTIF<br />
              SDGs: 17 / 9 / 13
            </p>
          </div>
        </div>
      </section>

      {/* Tentang */}
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
              MEONG Project merupakan inisiatif sosial berbasis kolaborasi yang berfokus pada pemenuhan kebutuhan pangan kucing jalanan secara berkelanjutan. Program ini membangun sistem terstruktur melalui pemanfaatan teknologi digital, partisipasi masyarakat, serta pengelolaan data kucing jalanan.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Istilah "MEONG" digunakan sebagai simbol suara kucing jalanan yang sering dianggap sepele, namun merepresentasikan kebutuhan dasar yang kerap terabaikan.
            </p>
          </div>
          <div className="p-8 md:p-16">
            <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">
              [ Tujuan ]
            </span>
            <div className="space-y-6">
              {[
                "Memenuhi kebutuhan pangan kucing jalanan secara konsisten",
                "Meningkatkan kepedulian masyarakat terhadap kesejahteraan hewan",
                "Membangun sistem kolaboratif berbasis komunitas",
                "Mengembangkan platform digital sebagai media edukasi dan koordinasi",
                "Menciptakan program sosial yang berkelanjutan",
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="font-mono text-lg text-muted-foreground/30">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SDGs */}
      <section className="py-20 px-8 bg-secondary text-secondary-foreground">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="font-mono text-xs mb-4 block uppercase tracking-widest text-secondary-foreground/60">
              [ Landasan SDGs ]
            </span>
            <h2 className="text-4xl font-bold uppercase tracking-tighter">Keterkaitan dengan SDGs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="border-t border-secondary-foreground/30 pt-6">
              <span className="font-mono text-xs text-secondary-foreground/60">[ SDG 17 — Fokus Utama ]</span>
              <h3 className="text-2xl font-serif italic my-4">Partnership for the Goals</h3>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed">
                Kolaborasi mahasiswa, masyarakat, dan komunitas. Sistem donasi dan partisipasi publik.
              </p>
            </div>
            <div className="border-t border-secondary-foreground/30 pt-6">
              <span className="font-mono text-xs text-secondary-foreground/60">[ SDG 9 ]</span>
              <h3 className="text-2xl font-serif italic my-4">Innovation & Infrastructure</h3>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed">
                Platform digital untuk edukasi dan pengelolaan data kucing jalanan.
              </p>
            </div>
            <div className="border-t border-secondary-foreground/30 pt-6">
              <span className="font-mono text-xs text-secondary-foreground/60">[ SDG 13 ]</span>
              <h3 className="text-2xl font-serif italic my-4">Climate Action</h3>
              <p className="text-sm text-secondary-foreground/80 leading-relaxed">
                Pengurangan food waste melalui distribusi terorganisir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="border-b-2 border-foreground">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-16 md:border-r-2 border-foreground">
            <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">[ Visi ]</span>
            <p className="text-xl md:text-2xl font-serif italic leading-relaxed">
              "Mewujudkan ekosistem kepedulian terhadap kucing jalanan yang kolaboratif, terstruktur, dan berkelanjutan melalui pemanfaatan teknologi dan partisipasi masyarakat."
            </p>
          </div>
          <div className="p-8 md:p-16">
            <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">[ Misi ]</span>
            <ul className="space-y-4">
              {[
                "Menyediakan pakan bagi kucing jalanan secara rutin dan terorganisir",
                "Membangun kolaborasi antara mahasiswa, masyarakat, dan komunitas",
                "Mengembangkan platform digital untuk edukasi dan pengelolaan data",
                "Meningkatkan kesadaran sosial melalui kampanye digital",
                "Mendorong keberlanjutan melalui sistem adopsi dan donasi",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start text-sm leading-relaxed">
                  <span className="text-accent font-bold">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Nilai-Nilai */}
      <section className="border-b-2 border-foreground px-8 py-16">
        <div className="max-w-6xl mx-auto">
          <span className="font-mono text-xs mb-8 block uppercase tracking-widest text-muted-foreground">[ Nilai-Nilai ]</span>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { title: "Empati", desc: "Peduli terhadap makhluk hidup" },
              { title: "Kolaborasi", desc: "Kerja sama antar pihak" },
              { title: "Keberlanjutan", desc: "Tidak hanya aksi sesaat" },
              { title: "Inovasi", desc: "Memanfaatkan teknologi" },
              { title: "Tanggung Jawab", desc: "Transparansi & konsistensi" },
            ].map((val, i) => (
              <div key={i} className="border border-foreground p-6 hover:bg-muted transition-colors">
                <h4 className="font-bold uppercase text-sm mb-2">{val.title}</h4>
                <p className="text-[11px] text-muted-foreground">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Kerja */}
      <section className="border-b-2 border-foreground">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-16 md:border-r-2 border-foreground">
            <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">[ Program Kerja ]</span>
            <h2 className="text-4xl font-bold uppercase tracking-tighter mb-12">Operasi Saat Ini</h2>
            <div className="space-y-10">
              {[
                { num: "01", title: "Feeding Program", desc: "Pemberian pakan rutin di titik-titik feeding yang telah ditentukan." },
                { num: "02", title: "Adopt a Feeding Spot", desc: "Setiap individu mengadopsi 1 titik dan bertanggung jawab memberi makan." },
                { num: "03", title: "Stray Cat Mapping", desc: "Pendataan jumlah, lokasi, dan kondisi kucing jalanan." },
                { num: "04", title: "Digital Campaign", desc: "Edukasi melalui media sosial tentang kepedulian terhadap kucing." },
              ].map((prog) => (
                <div key={prog.num} className="flex gap-6 items-start">
                  <span className="font-mono text-xl text-muted-foreground/30">{prog.num}</span>
                  <div>
                    <h4 className="text-xl font-bold uppercase mb-2">{prog.title}</h4>
                    <p className="text-sm leading-relaxed text-muted-foreground max-w-[40ch]">{prog.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 md:p-16 bg-accent text-accent-foreground">
            <div className="h-full flex flex-col justify-between min-h-[400px]">
              <h2 className="text-4xl font-bold uppercase tracking-tighter">Keunggulan</h2>
              <div>
                <p className="text-2xl font-serif italic leading-tight mb-8">
                  "Berbasis sistem, bukan sekadar aksi. Kolaboratif, berkelanjutan, dan inovatif."
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Berbasis Sistem → Menggunakan data & platform digital",
                    "Kolaboratif → Melibatkan banyak pihak (SDGs 17)",
                    "Berkelanjutan → Melalui sistem adopsi & donasi",
                    "Inovatif → Website sebagai pusat koordinasi",
                  ].map((item, i) => (
                    <p key={i} className="text-sm">{item}</p>
                  ))}
                </div>
                <Button variant="outline" size="lg" className="bg-background text-foreground border-foreground hover:bg-foreground hover:text-background" asChild>
                  <Link to="/donasi">Dukung Program Ini</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Forum Preview */}
      <section className="p-8 md:p-16 border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">Forum Diskusi</h2>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Suara dari komunitas</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
            {[
              { id: "#POST_001", title: "Tips Memberi Makan Kucing Jalanan", desc: "Makanan apa yang aman dan bergizi untuk kucing jalanan?", author: "CatLover_ID" },
              { id: "#POST_002", title: "Kucing Baru di Sektor 3", desc: "Ada 3 kucing baru di area kampus timur. Perlu feeding spot tambahan.", author: "VolunteerAyu" },
              { id: "#POST_003", title: "Ajak Teman Gabung!", desc: "Sudah ada 5 teman yang bergabung jadi relawan minggu ini.", author: "MeongSquad" },
            ].map((post) => (
              <div key={post.id} className="border border-foreground p-6 hover:bg-muted transition-colors cursor-pointer group">
                <span className="font-mono text-[10px] block mb-4 text-muted-foreground">{post.id}</span>
                <h5 className="font-bold text-lg mb-2 group-hover:underline">{post.title}</h5>
                <p className="text-sm text-muted-foreground mb-4">{post.desc}</p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">@{post.author}</span>
              </div>
            ))}
            <Link to="/forum" className="border border-foreground bg-foreground text-background p-6 flex flex-col justify-center items-center text-center hover:bg-accent transition-colors">
              <h5 className="font-bold text-lg mb-2">Gabung Forum</h5>
              <p className="text-[10px] uppercase tracking-widest opacity-60">Diskusi & berbagi</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Pengumuman Preview */}
      <section className="p-8 md:p-16 border-b-2 border-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter">Pengumuman</h2>
            <Link to="/pengumuman" className="font-mono text-xs uppercase tracking-widest text-accent hover:underline">
              Lihat Semua →
            </Link>
          </div>
          <div className="space-y-4">
            {[
              { date: "10 APR 2024", title: "Jadwal Feeding Minggu Ini", desc: "Feeding dilaksanakan setiap Senin, Rabu, Jumat pukul 07:00 dan 17:00 WIB." },
              { date: "08 APR 2024", title: "Pembukaan Relawan Batch 2", desc: "Pendaftaran relawan batch 2 dibuka mulai 15 April 2024." },
              { date: "05 APR 2024", title: "Website MEONG Project Resmi Diluncurkan", desc: "Platform digital untuk koordinasi dan edukasi kini dapat diakses." },
            ].map((ann, i) => (
              <div key={i} className="border border-foreground p-6 flex flex-col md:flex-row gap-4 md:gap-8 items-start hover:bg-muted transition-colors">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground shrink-0 pt-1">{ann.date}</span>
                <div>
                  <h4 className="font-bold uppercase mb-1">{ann.title}</h4>
                  <p className="text-sm text-muted-foreground">{ann.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donasi CTA */}
      <section className="p-8 md:p-16">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">[ Dukung Kami ]</span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8">Jadilah bagian dari perubahan.</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Kontribusi Anda langsung digunakan untuk membeli pakan, membiayai perawatan, dan membangun titik feeding baru.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="editorial" size="xl" asChild>
              <Link to="/donasi">Donasi Sekarang</Link>
            </Button>
            <Button variant="link" size="xl" asChild>
              <Link to="/forum">Gabung Komunitas</Link>
            </Button>
          </div>
          <p className="mt-12 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            100% dana digunakan untuk program feeding & perawatan kucing jalanan
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
