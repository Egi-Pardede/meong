/**
 * db.ts — Unified data layer
 * Uses Supabase when configured, falls back to localStorage for demo.
 */
import { supabase, isSupabaseConfigured } from "./supabase";
import kucing1Img from "../assets/kucing1.jpg";
import kucing2Img from "../assets/kucing2.jpg";
import kucing3Img from "../assets/kucing3.jpg";
import kucing4Img from "../assets/kucing4.jpg";
import kucing5Img from "../assets/kucing5.jpg";
import kucing6Img from "../assets/kucing6.jpg";
import kucing7Img from "../assets/kucing7.jpg";
import kucing8Img from "../assets/kucing8.jpg";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  created_at: string;
  replies_count: number;
}

export interface ForumReply {
  id: string;
  post_id: string;
  content: string;
  author: string;
  created_at: string;
}

export interface Donation {
  id: string;
  name: string;
  amount: number;
  message: string;
  created_at: string;
  proof_uploaded?: boolean;
}

export interface AdoptListing {
  id: string;
  cat_name: string;
  description: string;
  location: string;
  contact_name: string;
  contact_phone: string;
  image_url: string;
  created_at: string;
  status: "available" | "adopted";
}

// ─── localStorage helpers ─────────────────────────────────────────────────────

function getLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function setLS<T>(key: string, val: T) {
  localStorage.setItem(key, JSON.stringify(val));
}
function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
function now() {
  return new Date().toISOString();
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const seedPosts: ForumPost[] = [
  {
    id: "post_001",
    title: "Tips Memberi Makan Kucing Jalanan yang Benar",
    content:
      "Banyak orang memberi makan kucing dengan nasi saja, padahal kucing adalah karnivora obligat yang membutuhkan protein hewani tinggi. Berikut beberapa tips yang bisa diterapkan:\n\n1. **Hindari nasi putih** – Kucing tidak bisa mencerna karbohidrat dengan baik.\n2. **Gunakan makanan kering (dry food)** – Lebih tahan lama dan mengandung nutrisi lengkap.\n3. **Air bersih selalu tersedia** – Terutama jika memberi makanan kering.\n4. **Porsi yang tepat** – Rata-rata kucing dewasa butuh 60–80g dry food per hari.\n5. **Waktu feeding konsisten** – Pagi pukul 07:00 dan sore pukul 17:00.",
    author: "CatLover_ID",
    category: "Edukasi",
    created_at: "2026-04-20T08:00:00Z",
    replies_count: 12,
  },
  {
    id: "post_002",
    title: "Laporan: Kucing Baru di Sektor Kampus Timur",
    content:
      "Update dari patroli hari ini: ditemukan 3 kucing baru di area kampus timur dekat kantin utara. Kondisi cukup sehat, bulu bersih, sepertinya baru ditinggalkan oleh pemiliknya. Perlu feeding spot tambahan di area tersebut. Siapa yang bisa adopt spot baru ini?",
    author: "VolunteerAyu",
    category: "Laporan",
    created_at: "2026-04-22T09:30:00Z",
    replies_count: 8,
  },
  {
    id: "post_003",
    title: "Pengalaman Pertama Jadi Relawan MEONG",
    content:
      "Hai semua! Aku mau sharing pengalaman pertama ikut feeding bareng tim MEONG minggu lalu. Jujur aku sempat ragu karena takut nggak bisa handle kucing jalanan, tapi ternyata kucingnya udah kenal sama relawan dan langsung makan dengan tenang. Seru banget, dan rasanya menyenangkan bisa berkontribusi. Siapa yang mau ikut batch selanjutnya?",
    author: "MeongSquad",
    category: "Cerita",
    created_at: "2026-04-18T14:00:00Z",
    replies_count: 24,
  },
  {
    id: "post_004",
    title: "Diskusi: Makanan Kering vs Basah untuk Kucing Jalanan",
    content:
      "Sebagai dokter hewan yang juga peduli dengan kucing jalanan, saya ingin berbagi pandangan profesional:\n\n**Makanan kering (dry food):**\n- Lebih ekonomis\n- Tahan lebih lama di udara terbuka\n- Membantu kebersihan gigi\n\n**Makanan basah (wet food/kaleng):**\n- Kandungan air lebih tinggi, baik untuk hidrasi\n- Lebih mudah dimakan oleh kucing tua atau sakit\n- Harus segera dihabiskan\n\nUntuk kondisi lapangan, saya rekomendasikan kombinasi: dry food sebagai makanan utama + sesekali wet food sebagai suplemen.",
    author: "DrVetCat",
    category: "Edukasi",
    created_at: "2026-04-15T10:00:00Z",
    replies_count: 31,
  },
  {
    id: "post_005",
    title: "Adopt a Feeding Spot: Siapa Mau Ambil Titik Sektor 5?",
    content:
      "Titik feeding di Sektor 5 (dekat taman kota, pojok barat) sudah kosong relawan sejak minggu lalu karena volunteer sebelumnya harus pindah kota. Ada sekitar 5-7 kucing yang rutin datang ke titik ini. Butuh komitmen minimal 3x seminggu. Yang berminat silakan reply atau DM Instagram @meong.project.",
    author: "AdminMeong",
    category: "Koordinasi",
    created_at: "2026-04-25T11:00:00Z",
    replies_count: 15,
  },
  {
    id: "post_006",
    title: "Cara Mendekati Kucing Jalanan yang Takut Manusia",
    content:
      "Banyak kucing jalanan mengalami trauma dengan manusia. Berikut cara mendekati mereka dengan aman:\n\n1. **Jangan langsung menghampiri** – Duduk atau jongkok dari jarak 2-3 meter dulu.\n2. **Hindari kontak mata langsung** – Dianggap ancaman oleh kucing.\n3. **Gunakan makanan sebagai jembatan** – Lempar makanan perlahan ke arah mereka.\n4. **Biarkan kucing yang mendekat duluan** – Jangan memaksa.\n5. **Konsisten hadir** – Kucing akan mulai percaya setelah beberapa kali pertemuan.",
    author: "WhiskerFriend",
    category: "Edukasi",
    created_at: "2026-04-12T16:00:00Z",
    replies_count: 19,
  },
];

const seedDonations: Donation[] = [
  { id: "d1",  name: "Fabert V.",             amount: 100000,  message: "Semangat terus!",                         created_at: "2026-04-01T08:00:00Z" },
  { id: "d2",  name: "Anonim",                amount: 50000,   message: "",                                         created_at: "2026-04-02T14:30:00Z" },
  { id: "d3",  name: "Siti Rahayu",           amount: 250000,  message: "Untuk kucing-kucing di kampus timur",      created_at: "2026-04-03T09:00:00Z" },
  { id: "d4",  name: "Anonim",                amount: 25000,   message: "",                                         created_at: "2026-04-04T18:00:00Z" },
  { id: "d5",  name: "Komunitas Pet Lover",   amount: 500000,  message: "Kolaborasi untuk SDGs 17",                created_at: "2026-04-05T10:00:00Z" },
  { id: "d6",  name: "Anonim",                amount: 75000,   message: "Semoga bisa membantu",                    created_at: "2026-04-06T12:00:00Z" },
  { id: "d7",  name: "Ferdi S.",              amount: 150000,  message: "Tetap semangat tim MEONG!",               created_at: "2026-04-07T16:00:00Z" },
  { id: "d8",  name: "Anonim",                amount: 200000,  message: "",                                         created_at: "2026-04-08T11:00:00Z" },
  { id: "d9",  name: "Dewi Lestari",          amount: 300000,  message: "Kasihan kucing-kucingnya, semangat!",     created_at: "2026-04-09T13:00:00Z" },
  { id: "d10", name: "Anonim",                amount: 100000,  message: "",                                         created_at: "2026-04-10T07:30:00Z" },
  { id: "d11", name: "Reza Firmansyah",       amount: 500000,  message: "Dukung penuh program MEONG!",             created_at: "2026-04-11T15:00:00Z" },
  { id: "d12", name: "Anonim",                amount: 50000,   message: "Sedikit tapi semoga bermanfaat",          created_at: "2026-04-12T09:00:00Z" },
  { id: "d13", name: "Mahasiswa TU Batch 22", amount: 750000,  message: "Patungan dari teman-teman angkatan",      created_at: "2026-04-13T16:30:00Z" },
  { id: "d14", name: "Anonim",                amount: 100000,  message: "",                                         created_at: "2026-04-14T10:00:00Z" },
  { id: "d15", name: "Hendra Wijaya",         amount: 250000,  message: "Untuk pakan bulan ini",                   created_at: "2026-04-15T14:00:00Z" },
  { id: "d16", name: "Anonim",                amount: 75000,   message: "",                                         created_at: "2026-04-16T08:00:00Z" },
  { id: "d17", name: "Nadia Putri",           amount: 200000,  message: "Sukses terus!",                           created_at: "2026-04-17T11:00:00Z" },
  { id: "d18", name: "Anonim",                amount: 150000,  message: "",                                         created_at: "2026-04-18T17:00:00Z" },
  { id: "d19", name: "Alumni TU Peduli",      amount: 1000000, message: "Dari alumni, semoga bisa membantu lebih", created_at: "2026-04-19T09:00:00Z" },
  { id: "d20", name: "Anonim",                amount: 100000,  message: "",                                         created_at: "2026-04-20T13:00:00Z" },
  { id: "d21", name: "Toko Petshop Bandung",  amount: 500000,  message: "Dukungan dari komunitas pecinta hewan",   created_at: "2026-04-21T10:00:00Z" },
  { id: "d22", name: "Anonim",                amount: 50000,   message: "Sedikit semoga berarti",                  created_at: "2026-04-22T15:30:00Z" },
  { id: "d23", name: "Rizky Aditya",          amount: 200000,  message: "Tetap konsisten ya!",                     created_at: "2026-04-23T12:00:00Z" },
  { id: "d24", name: "Anonim",                amount: 100000,  message: "",                                         created_at: "2026-04-24T08:30:00Z" },
  { id: "d25", name: "Maya & Keluarga",       amount: 300000,  message: "Anak-anak di rumah suka kucing",          created_at: "2026-04-25T16:00:00Z" },
];

const ADOPT_SEED_VERSION = "v2";

const seedAdoptions: AdoptListing[] = [
  {
    id: "a1",
    cat_name: "Midnight",
    description: "Kucing jantan berbulu panjang warna hitam pekat dengan mata kuning-hijau. Usia ±2 tahun. Ditemukan di area rektorat Telkom University. Meski tampak serius, ia sebenarnya manja dan suka duduk di pangkuan jika sudah percaya.",
    location: "Telkom University, Bandung",
    contact_name: "Tim MEONG Project",
    contact_phone: "082285250331",
    image_url: kucing1Img,
    created_at: "2026-05-13T08:00:00Z",
    status: "available",
  },
  {
    id: "a2",
    cat_name: "Bonny",
    description: "Kucing betina tabby coklat-oranye bergaris dengan mata hijau cerah. Usia ±1.5 tahun. Ditemukan di area kampus, suka berbaring santai dan jinak terhadap manusia. Cocok untuk keluarga yang baru pertama kali memelihara kucing.",
    location: "Telkom University, Bandung",
    contact_name: "Tim MEONG Project",
    contact_phone: "082285250331",
    image_url: kucing2Img,
    created_at: "2026-05-13T08:10:00Z",
    status: "available",
  },
  {
    id: "a3",
    cat_name: "Ciko",
    description: "Kucing jantan abu-abu putih bergaris, bertubuh gemuk dan sehat. Usia ±2 tahun. Rajin datang ke titik feeding Ciganitri dan sangat tidak takut manusia. Aktif dan suka bermain bola.",
    location: "Ciganitri, Bandung",
    contact_name: "Tim MEONG Project",
    contact_phone: "082285250331",
    image_url: kucing3Img,
    created_at: "2026-05-13T08:20:00Z",
    status: "available",
  },
  {
    id: "a4",
    cat_name: "Kopi",
    description: "Kucing jantan warna coklat keabu-abuan. Usia ±3 tahun. Ditemukan di area parkiran kampus saat feeding rutin. Sudah mulai jinak dengan relawan dan tidak agresif. Cocok untuk pemilik yang sabar dan berpengalaman.",
    location: "Sukapura, Bandung",
    contact_name: "Tim MEONG Project",
    contact_phone: "082285250331",
    image_url: kucing4Img,
    created_at: "2026-05-13T08:30:00Z",
    status: "available",
  },
  {
    id: "a5",
    cat_name: "Jeruk",
    description: "Kucing jantan berbulu semi-panjang warna oranye cream dengan ekor lebat yang indah. Usia ±1 tahun. Ditemukan di area PGA. Sangat lincah, aktif, dan suka bermain. Akan membawa keceriaan di rumah Anda.",
    location: "PGA, Bandung",
    contact_name: "Tim MEONG Project",
    contact_phone: "082285250331",
    image_url: kucing5Img,
    created_at: "2026-05-13T08:40:00Z",
    status: "available",
  },
  {
    id: "a6",
    cat_name: "Dino",
    description: "Kucing jantan hitam putih (tuxedo) yang sehat dan berani. Usia ±2 tahun. Ditemukan di taman Telkom University. Mudah didekati, tidak takut manusia, dan sudah terbiasa hidup di dekat keramaian. Sangat ideal untuk adopsi pertama.",
    location: "Telkom University, Bandung",
    contact_name: "Tim MEONG Project",
    contact_phone: "082285250331",
    image_url: kucing6Img,
    created_at: "2026-05-13T08:50:00Z",
    status: "available",
  },
  {
    id: "a7",
    cat_name: "Salju",
    description: "Kucing betina putih bersih bermata biru, masih muda usia ±8 bulan. Ditemukan di area taman kampus saat feeding pagi. Sangat jinak, suka diajak bermain, dan penampilannya selalu menarik perhatian. Butuh rumah yang penuh kasih sayang.",
    location: "Telkom University, Bandung",
    contact_name: "Tim MEONG Project",
    contact_phone: "082285250331",
    image_url: kucing7Img,
    created_at: "2026-05-13T09:00:00Z",
    status: "available",
  },
  {
    id: "a8",
    cat_name: "Bule",
    description: "Kucing jantan abu-abu putih bicolor. Usia ±1.5 tahun. Ditemukan di koridor kampus area Sukabirus saat feeding sore. Tenang, tidak agresif, dan sudah terbiasa dengan kehadiran manusia. Cocok tinggal di apartemen maupun rumah.",
    location: "Sukabirus, Bandung",
    contact_name: "Tim MEONG Project",
    contact_phone: "082285250331",
    image_url: kucing8Img,
    created_at: "2026-05-13T09:10:00Z",
    status: "available",
  },
];

// ─── FORUM ─────────────────────────────────────────────────────────────────────

export async function getPosts(): Promise<ForumPost[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase
      .from("forum_posts")
      .select("*")
      .order("created_at", { ascending: false });
    return data || [];
  }
  const stored = getLS<ForumPost[]>("meong_posts", seedPosts);
  // Ensure seed is there on first load
  if (!localStorage.getItem("meong_posts")) setLS("meong_posts", seedPosts);
  return stored.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getPost(id: string): Promise<ForumPost | null> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase.from("forum_posts").select("*").eq("id", id).single();
    return data;
  }
  const posts = getLS<ForumPost[]>("meong_posts", seedPosts);
  return posts.find((p) => p.id === id) || null;
}

export async function createPost(data: Omit<ForumPost, "id" | "created_at" | "replies_count">): Promise<ForumPost> {
  const post: ForumPost = { ...data, id: genId(), created_at: now(), replies_count: 0 };
  if (isSupabaseConfigured && supabase) {
    const { data: created } = await supabase.from("forum_posts").insert(post).select().single();
    return created!;
  }
  const posts = getLS<ForumPost[]>("meong_posts", seedPosts);
  setLS("meong_posts", [post, ...posts]);
  return post;
}

export async function getReplies(postId: string): Promise<ForumReply[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase
      .from("forum_replies")
      .select("*")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    return data || [];
  }
  return getLS<ForumReply[]>(`meong_replies_${postId}`, []);
}

export async function createReply(data: Omit<ForumReply, "id" | "created_at">): Promise<ForumReply> {
  const reply: ForumReply = { ...data, id: genId(), created_at: now() };
  if (isSupabaseConfigured && supabase) {
    await supabase.from("forum_replies").insert(reply);
    await supabase.rpc("increment_replies", { post_id: data.post_id });
    return reply;
  }
  const replies = getLS<ForumReply[]>(`meong_replies_${data.post_id}`, []);
  setLS(`meong_replies_${data.post_id}`, [...replies, reply]);
  // Update count
  const posts = getLS<ForumPost[]>("meong_posts", seedPosts);
  setLS(
    "meong_posts",
    posts.map((p) => (p.id === data.post_id ? { ...p, replies_count: p.replies_count + 1 } : p))
  );
  return reply;
}

// ─── DONATIONS ────────────────────────────────────────────────────────────────

const SEED_VERSION = "v4"; // bump this whenever seed data changes

function initDonationStore() {
  const versionKey = "meong_donations_ver";
  if (localStorage.getItem(versionKey) !== SEED_VERSION) {
    localStorage.removeItem("meong_donations");
    localStorage.setItem(versionKey, SEED_VERSION);
  }
  if (!localStorage.getItem("meong_donations")) setLS("meong_donations", seedDonations);
}

export async function getDonations(): Promise<Donation[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase
      .from("donations")
      .select("*")
      .order("created_at", { ascending: false });
    return data || [];
  }
  initDonationStore();
  return getLS<Donation[]>("meong_donations", seedDonations).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function recordDonation(data: Omit<Donation, "id" | "created_at">): Promise<Donation> {
  const donation: Donation = { ...data, id: genId(), created_at: now() };
  if (isSupabaseConfigured && supabase) {
    await supabase.from("donations").insert(donation);
    return donation;
  }
  initDonationStore();
  const list = getLS<Donation[]>("meong_donations", seedDonations);
  setLS("meong_donations", [donation, ...list]);
  return donation;
}

export function saveProofImage(donationId: string, base64: string) {
  try {
    localStorage.setItem(`meong_proof_${donationId}`, base64);
  } catch {
    // localStorage quota exceeded — silently skip
  }
}

export function getProofImage(donationId: string): string | null {
  return localStorage.getItem(`meong_proof_${donationId}`);
}

// ─── ADOPTIONS ────────────────────────────────────────────────────────────────

function initAdoptionStore() {
  const versionKey = "meong_adoptions_ver";
  if (localStorage.getItem(versionKey) !== ADOPT_SEED_VERSION) {
    localStorage.removeItem("meong_adoptions");
    localStorage.setItem(versionKey, ADOPT_SEED_VERSION);
  }
  if (!localStorage.getItem("meong_adoptions")) setLS("meong_adoptions", seedAdoptions);
}

export async function getAdoptions(): Promise<AdoptListing[]> {
  if (isSupabaseConfigured && supabase) {
    const { data } = await supabase
      .from("adopt_listings")
      .select("*")
      .eq("status", "available")
      .order("created_at", { ascending: false });
    return data || [];
  }
  initAdoptionStore();
  return getLS<AdoptListing[]>("meong_adoptions", seedAdoptions).filter((a) => a.status === "available");
}

export async function createAdoption(data: Omit<AdoptListing, "id" | "created_at" | "status">): Promise<AdoptListing> {
  const listing: AdoptListing = { ...data, id: genId(), created_at: now(), status: "available" };
  if (isSupabaseConfigured && supabase) {
    await supabase.from("adopt_listings").insert(listing);
    return listing;

  }
  initAdoptionStore();
  const list = getLS<AdoptListing[]>("meong_adoptions", seedAdoptions);
  setLS("meong_adoptions", [listing, ...list]);
  return listing;
}
