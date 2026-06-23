import { Link, useLocation } from "react-router";
import { Film, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/movies", label: "Cartelera" },
];

function Navbar() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/60 backdrop-blur-xl">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-bold text-lg transition-colors hover:text-primary"
        >
          <div className="rounded-lg bg-primary p-1.5">
            <Film className="h-5 w-5 text-primary-foreground" />
          </div>
          <span>
            Cine<span className="text-primary">SpoilerS</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Button
              key={link.to}
              variant="ghost"
              size="sm"
              asChild
              className={cn(
                "relative transition-all",
                pathname === link.to &&
                  "text-primary after:absolute after:bottom-0 after:left-1/4 after:h-0.5 after:w-1/2 after:rounded-full after:bg-primary",
              )}
            >
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}

          <div className="ml-2 h-6 w-px bg-border" />

          <Button variant="ghost" size="icon" className="relative ml-1">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              0
            </span>
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
