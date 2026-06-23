import { Film } from "lucide-react";
import { Separator } from "@/components/ui/separator";

function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2 font-bold">
            <div className="rounded-lg bg-primary p-1.5">
              <Film className="h-4 w-4 text-primary-foreground" />
            </div>
            <span>
              Cine<span className="text-primary">SpoilerS</span>
            </span>
          </div>

          <div className="flex gap-6 text-sm text-muted-foreground">
            <span>Cartelera</span>
            <span>Promociones</span>
            <span>Nosotros</span>
            <span>Contacto</span>
          </div>
        </div>

        <Separator className="my-6 bg-border/50" />

        <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} CineSpoilerS. Todos los derechos reservados.</p>
          <p>Hecho con React + shadcn/ui + TanStack Query</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
