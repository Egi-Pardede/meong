import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ForumPost {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  replies: number;
  category: string;
}

const forumPosts: ForumPost[] = [
  {
    id: "#POST_001",
    title: "Tips Memberi Makan Kucing Jalanan yang Benar",
    author: "CatLover_ID",
    date: "10 APR 2024",
    content: "Banyak orang memberi makan kucing dengan nasi saja, padahal kucing butuh protein tinggi. Berikut tips yang bisa diterapkan...",
    replies: 12,
    category: "Edukasi",
  },
  {
    id: "#POST_002",
    title: "Laporan: Kucing Baru di Sektor Kampus Timur",
    author: "VolunteerAyu",
    date: "09 APR 2024",
    content: "Ditemukan 3 kucing baru di area kampus timur dekat kantin. Kondisi cukup sehat, perlu feeding spot tambahan di area tersebut.",
    replies: 8,
    category: "Laporan",
  },
  {
    id: "#POST_003",
    title: "Pengalaman Pertama Jadi Relawan MEONG",
    author: "MeongSquad",
    date: "08 APR 2024",
    content: "Sharing pengalaman pertama ikut feeding bareng tim MEONG. Ternyata seru banget dan kucing-kucingnya lucu semua!",
    replies: 24,
    category: "Cerita",
  },
  {
    id: "#POST_004",
    title: "Diskusi: Makanan Kering vs Basah untuk Kucing Jalanan",
    author: "DrVetCat",
    date: "07 APR 2024",
    content: "Sebagai dokter hewan, saya ingin membahas kelebihan dan kekurangan masing-masing jenis makanan untuk kucing jalanan...",
    replies: 31,
    category: "Edukasi",
  },
  {
    id: "#POST_005",
    title: "Adopt a Feeding Spot: Siapa Mau Ambil Titik Sektor 5?",
    author: "AdminMeong",
    date: "06 APR 2024",
    content: "Titik feeding di Sektor 5 (dekat taman kota) masih belum ada yang mengadopsi. Ada yang berminat jadi guardian?",
    replies: 15,
    category: "Koordinasi",
  },
  {
    id: "#POST_006",
    title: "Cara Mendekati Kucing Jalanan yang Takut Manusia",
    author: "WhiskerFriend",
    date: "05 APR 2024",
    content: "Beberapa kucing jalanan sangat waspada terhadap manusia. Berikut cara mendekati mereka dengan aman dan nyaman...",
    replies: 19,
    category: "Edukasi",
  },
];

const categories = ["Semua", "Edukasi", "Laporan", "Cerita", "Koordinasi"];

const Forum = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered = activeCategory === "Semua"
    ? forumPosts
    : forumPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Header */}
      <section className="border-b-2 border-foreground p-8 md:p-16">
        <div className="max-w-7xl mx-auto">
          <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">
            [ Forum Diskusi ]
          </span>
          <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4">
            Suara <span className="font-serif italic font-normal text-accent">Komunitas</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Ruang diskusi untuk berbagi pengetahuan, cerita, dan koordinasi antar relawan dan pecinta kucing.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="border-b-2 border-foreground px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border border-foreground transition-colors ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section className="px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-1">
          {filtered.map((post) => (
            <div
              key={post.id}
              className="border border-foreground p-6 hover:bg-muted transition-colors cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] text-muted-foreground">{post.id}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-muted px-2 py-0.5">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:underline mb-1">{post.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{post.content}</p>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-accent">@{post.author}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{post.date}</p>
                  </div>
                  <div className="border border-foreground px-3 py-1 text-center">
                    <p className="font-bold text-lg">{post.replies}</p>
                    <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Balasan</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto bg-foreground text-background p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2">Punya pertanyaan atau cerita?</h3>
            <p className="text-sm opacity-70">Bagikan pengalaman dan pengetahuanmu dengan komunitas MEONG.</p>
          </div>
          <Button variant="outline" size="lg" className="border-background text-background hover:bg-background hover:text-foreground shrink-0">
            Buat Post Baru
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Forum;
