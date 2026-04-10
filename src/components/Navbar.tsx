import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Beranda", path: "/" },
  { label: "Forum", path: "/forum" },
  { label: "Pengumuman", path: "/pengumuman" },
  { label: "Donasi", path: "/donasi" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-foreground bg-background px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-2xl font-bold uppercase tracking-tighter">
            Meong / Project
          </Link>
          <span className="hidden font-mono text-[10px] border border-foreground px-2 py-0.5 rounded-full sm:inline-block">
            SDGs 17
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "transition-colors hover:text-accent",
                location.pathname === item.path && "line-through text-accent"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          to="/donasi"
          className="bg-foreground text-background px-5 py-2 text-xs font-bold uppercase tracking-tight hover:bg-accent transition-colors"
        >
          Donasi
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
