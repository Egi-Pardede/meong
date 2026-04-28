import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Beranda", path: "/" },
  { label: "Forum", path: "/forum" },
  { label: "Pengumuman", path: "/pengumuman" },
  { label: "Open Adopt", path: "/adopt" },
  { label: "Donasi", path: "/donasi" },
];

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-foreground bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold uppercase tracking-tighter"
            onClick={() => setOpen(false)}
          >
            Meong <span className="text-accent">/</span> Project
          </Link>
          <span className="hidden font-mono text-[10px] border border-foreground px-2 py-0.5 rounded-full sm:inline-block">
            SDGs 17
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-widest">
          {navItems.filter((i) => i.path !== "/donasi").map((item) => (
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
          <Link
            to="/donasi"
            className={cn(
              "border border-foreground px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors hover:bg-accent hover:border-accent hover:text-accent-foreground",
              location.pathname === "/donasi" && "bg-accent text-accent-foreground border-accent"
            )}
          >
            Donasi
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 hover:text-accent transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t-2 border-foreground bg-background px-6 pb-6">
          <div className="flex flex-col gap-1 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-3 text-sm font-bold uppercase tracking-widest border-b border-foreground/10 transition-colors hover:text-accent",
                  location.pathname === item.path && "text-accent"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
