import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getPosts, getPost, getReplies, createPost, createReply, type ForumPost, type ForumReply } from "@/lib/db";
import { MessageSquare, ArrowLeft, Send, Plus, X, ChevronRight } from "lucide-react";

const categories = ["Semua", "Edukasi", "Laporan", "Cerita", "Koordinasi"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function PostDetail({ postId, onBack }: { postId: string; onBack: () => void }) {
  const [post, setPost] = useState<ForumPost | null>(null);
  const [replies, setReplies] = useState<ForumReply[]>([]);
  const [replyAuthor, setReplyAuthor] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getPost(postId).then(setPost);
    getReplies(postId).then(setReplies);
  }, [postId]);

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    if (!replyContent.trim()) return;
    setSubmitting(true);
    const reply = await createReply({
      post_id: postId,
      author: replyAuthor.trim() || "Anonim",
      content: replyContent.trim(),
    });
    setReplies((prev) => [...prev, reply]);
    setReplyContent("");
    setReplyAuthor("");
    setSuccess(true);
    setSubmitting(false);
    setTimeout(() => setSuccess(false), 3000);
  }

  if (!post) return <div className="p-16 text-center text-muted-foreground font-mono text-sm">Memuat post...</div>;

  return (
    <div>
      <div className="border-b border-foreground/20 px-8 py-4 max-w-7xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft size={14} /> Kembali ke Forum
        </button>
      </div>
      <div className="max-w-3xl mx-auto px-8 py-10">
        <div className="border-2 border-foreground p-8 mb-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="font-mono text-[10px] text-muted-foreground">{post.id}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-muted px-2 py-0.5">{post.category}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-foreground/20">
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">@{post.author}</span>
            <span className="font-mono text-[10px] text-muted-foreground">{formatDate(post.created_at)}</span>
            <span className="font-mono text-[10px] text-muted-foreground ml-auto">{post.replies_count} Balasan</span>
          </div>
          <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{post.content}</div>
        </div>
        <div className="mb-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
            <MessageSquare size={12} /> {replies.length} Balasan
          </h2>
          {replies.length === 0 ? (
            <div className="border border-foreground/20 p-8 text-center text-muted-foreground text-sm">
              Belum ada balasan. Jadilah yang pertama!
            </div>
          ) : (
            <div className="space-y-3">
              {replies.map((r, i) => (
                <div key={r.id} className="border border-foreground/20 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent">@{r.author}</span>
                    <span className="font-mono text-[10px] text-muted-foreground ml-auto">{formatDate(r.created_at)}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{r.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="border-2 border-foreground p-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">[ Tulis Balasan ]</h3>
          {success && (
            <div className="mb-4 bg-accent/10 border border-accent text-accent text-sm px-4 py-2 font-mono">
              Balasan berhasil dikirim!
            </div>
          )}
          <form onSubmit={handleReply} className="space-y-4">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">Nama (opsional)</label>
              <input type="text" value={replyAuthor} onChange={(e) => setReplyAuthor(e.target.value)} placeholder="Anonim"
                className="w-full border border-foreground bg-transparent px-4 py-2 text-sm outline-none focus:ring-1 ring-accent" />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">Balasan *</label>
              <textarea rows={4} value={replyContent} onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Tulis balasanmu di sini..."
                className="w-full border border-foreground bg-transparent px-4 py-2 text-sm outline-none resize-none focus:ring-1 ring-accent" required />
            </div>
            <Button type="submit" variant="editorial" size="sm" disabled={submitting || !replyContent.trim()} className="flex items-center gap-2">
              <Send size={14} /> {submitting ? "Mengirim..." : "Kirim Balasan"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function NewPostModal({ onClose, onCreated }: { onClose: () => void; onCreated: (p: ForumPost) => void }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Cerita");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSubmitting(true);
    const post = await createPost({ title: title.trim(), content: content.trim(), author: author.trim() || "Anonim", category });
    setSubmitting(false);
    onCreated(post);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-background border-2 border-foreground w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b-2 border-foreground">
          <h2 className="font-bold uppercase tracking-tight text-lg">Buat Post Baru</h2>
          <button onClick={onClose} className="p-1 hover:text-accent transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">Nama (opsional)</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Anonim"
              className="w-full border border-foreground bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-1 ring-accent" />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">Kategori</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-foreground bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 ring-accent">
              {["Edukasi", "Laporan", "Cerita", "Koordinasi"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">Judul *</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Judul post kamu..."
              className="w-full border border-foreground bg-transparent px-4 py-2.5 text-sm outline-none focus:ring-1 ring-accent" required />
          </div>
          <div>
            <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1 block">Isi Post *</label>
            <textarea rows={6} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Ceritakan sesuatu kepada komunitas..."
              className="w-full border border-foreground bg-transparent px-4 py-2.5 text-sm outline-none resize-none focus:ring-1 ring-accent" required />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="editorial" disabled={submitting || !title.trim() || !content.trim()}>
              {submitting ? "Memposting..." : "Post Sekarang"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Forum = () => {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showNewPost, setShowNewPost] = useState(false);

  useEffect(() => {
    getPosts().then((data) => { setPosts(data); setLoading(false); });
  }, []);

  const filtered = activeCategory === "Semua" ? posts : posts.filter((p) => p.category === activeCategory);

  if (selectedPostId) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <PostDetail postId={selectedPostId} onBack={() => setSelectedPostId(null)} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="border-b-2 border-foreground p-8 md:p-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <span className="font-mono text-xs mb-6 block uppercase tracking-widest text-muted-foreground">[ Forum Diskusi ]</span>
            <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-4">
              Suara <span className="font-serif italic font-normal text-accent">Komunitas</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Ruang diskusi untuk berbagi pengetahuan, cerita, dan koordinasi antar relawan dan pecinta kucing.
            </p>
          </div>
          <div className="shrink-0">
            <Button variant="editorial" size="lg" onClick={() => setShowNewPost(true)} className="flex items-center gap-2">
              <Plus size={16} /> Buat Post Baru
            </Button>
          </div>
        </div>
      </section>
      <section className="border-b-2 border-foreground px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border border-foreground transition-colors ${
                activeCategory === cat ? "bg-foreground text-background" : "bg-background text-foreground hover:bg-muted"
              }`}>
              {cat}
            </button>
          ))}
        </div>
      </section>
      <section className="px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-1">
          {loading ? (
            <div className="text-center py-16 text-muted-foreground font-mono text-sm">Memuat diskusi...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="font-mono text-sm mb-4">Belum ada post di kategori ini.</p>
              <Button variant="outline" onClick={() => setShowNewPost(true)}>Buat Post Pertama</Button>
            </div>
          ) : (
            filtered.map((post) => (
              <button key={post.id} onClick={() => setSelectedPostId(post.id)}
                className="w-full border border-foreground p-6 hover:bg-muted transition-colors group text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-[10px] text-muted-foreground">{post.id}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-muted px-2 py-0.5">{post.category}</span>
                    </div>
                    <h3 className="text-xl font-bold group-hover:underline mb-1 flex items-center gap-2">
                      {post.title}
                      <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{post.content}</p>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-accent">@{post.author}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">{formatDate(post.created_at)}</p>
                    </div>
                    <div className="border border-foreground px-3 py-1 text-center min-w-[52px]">
                      <p className="font-bold text-lg">{post.replies_count}</p>
                      <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Balasan</p>
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </section>
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto bg-foreground text-background p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2">Punya pertanyaan atau cerita?</h3>
            <p className="text-sm opacity-70">Bagikan pengalaman dan pengetahuanmu dengan komunitas MEONG.</p>
          </div>
          <Button variant="outline" size="lg" className="border-background text-background hover:bg-background hover:text-foreground shrink-0"
            onClick={() => setShowNewPost(true)}>
            <Plus size={16} className="mr-2" /> Buat Post Baru
          </Button>
        </div>
      </section>
      <Footer />
      {showNewPost && <NewPostModal onClose={() => setShowNewPost(false)} onCreated={(post) => setPosts((prev) => [post, ...prev])} />}
    </div>
  );
};

export default Forum;
