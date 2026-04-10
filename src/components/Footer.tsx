import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t-2 border-foreground p-8 md:p-16">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start gap-12">
        <div>
          <p className="font-mono text-xs mb-4 uppercase tracking-widest">MEONG PROJECT // EST. 2024</p>
          <p className="text-sm text-muted-foreground max-w-xs">
            Inisiatif sosial untuk pemenuhan pangan kucing jalanan secara berkelanjutan melalui kolaborasi dan teknologi.
          </p>
          <p className="mt-4 text-sm font-serif italic text-accent">
            "Karena meong juga butuh makan."
          </p>
        </div>
        <div className="grid grid-cols-2 gap-16">
          <ul className="space-y-2 text-xs font-bold uppercase tracking-widest">
            <li><Link to="/" className="hover:text-accent transition-colors">Beranda</Link></li>
            <li><Link to="/forum" className="hover:text-accent transition-colors">Forum</Link></li>
            <li><Link to="/pengumuman" className="hover:text-accent transition-colors">Pengumuman</Link></li>
          </ul>
          <ul className="space-y-2 text-xs font-bold uppercase tracking-widest">
            <li><Link to="/donasi" className="hover:text-accent transition-colors">Donasi</Link></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Kontak</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-12 pt-6 border-t border-muted flex justify-between items-center text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>&copy; 2024 MEONG Project</span>
        <span>SDGs 17 — Partnership for the Goals</span>
      </div>
    </footer>
  );
};

export default Footer;
