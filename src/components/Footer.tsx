import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t-2 border-foreground p-8 md:p-16">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-xs">
          <p className="font-mono text-xs mb-2 uppercase tracking-widest font-bold">Meong / Project</p>
          <p className="font-mono text-[10px] mb-4 uppercase tracking-widest text-muted-foreground">EST. 2024 // SDGs 17</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Inisiatif sosial berbasis teknologi untuk pemenuhan pangan kucing jalanan secara berkelanjutan melalui kolaborasi komunitas.
          </p>
          <p className="mt-4 text-sm font-serif italic text-accent">
            "Karena meong juga butuh makan."
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href="https://instagram.com/meong.project"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-foreground px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
            >
              Instagram
            </a>
            <a
              href="mailto:meong.project@gmail.com"
              className="border border-foreground px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
            >
              Email
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 md:gap-16">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">Navigasi</p>
            <ul className="space-y-3 text-xs font-bold uppercase tracking-widest">
              <li><Link to="/" className="hover:text-accent transition-colors">Beranda</Link></li>
              <li><Link to="/forum" className="hover:text-accent transition-colors">Forum</Link></li>
              <li><Link to="/pengumuman" className="hover:text-accent transition-colors">Pengumuman</Link></li>
              <li><Link to="/adopt" className="hover:text-accent transition-colors">Open Adopt</Link></li>
              <li><Link to="/donasi" className="hover:text-accent transition-colors">Donasi</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-4">SDGs</p>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li className="flex gap-2"><span className="font-bold text-accent">17</span> Partnership</li>
              <li className="flex gap-2"><span className="font-bold text-accent">9</span> Innovation</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl border-t border-foreground/20 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          © 2025–2026 MEONG Project · Hak Cipta Dilindungi
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
          Dibuat dengan <Heart size={10} className="text-accent" /> untuk kucing jalanan Indonesia
        </p>
      </div>
    </footer>
  );
};

export default Footer;
