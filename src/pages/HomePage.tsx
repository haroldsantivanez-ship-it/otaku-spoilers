import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Film, Popcorn, Sparkles, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieCard from "@/components/MovieCard";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import { getNowPlaying } from "@/services/movie-service";

const stats = [
  { icon: Film, label: "Películas", value: "50+" },
  { icon: Popcorn, label: "Salas", value: "12" },
  { icon: Ticket, label: "Entradas vendidas", value: "10K+" },
];

function HomePage() {
  const { data: movies, isLoading } = useQuery({
    queryKey: ["now-playing"],
    queryFn: getNowPlaying,
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto flex flex-col items-center justify-center gap-8 px-4 py-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="rounded-2xl border border-border/50 bg-card/30 p-4 backdrop-blur-sm"
          >
            <Ticket className="h-12 w-12 text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl text-center text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl"
          >
            Tu experiencia de cine{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              comienza aquí
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-lg text-center text-lg text-muted-foreground md:text-xl"
          >
            Explora las mejores películas, elige tu horario y compra tus
            entradas en segundos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-4"
          >
            <Button size="lg" asChild className="gap-2 text-base">
              <Link to="/movies">
                <Sparkles className="h-5 w-5" />
                Ver Cartelera
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="gap-2 text-base"
            >
              <Link to="/movies">
                <Film className="h-5 w-5" />
                Próximamente
              </Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex gap-8 md:gap-16"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2"
              >
                <stat.icon className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-xs text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Películas en cartelera */}
      <section className="container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center gap-3"
        >
          <div className="h-8 w-1 rounded-full bg-primary" />
          <h2 className="text-3xl font-bold">En cartelera</h2>
        </motion.div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {movies?.slice(0, 6).map((movie, index) => (
              <MovieCard key={movie.id} movie={movie} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Final */}
      <section className="relative overflow-hidden border-t border-border/50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto flex flex-col items-center gap-6 px-4 py-20 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            No te pierdas ningún estreno
          </h2>
          <p className="max-w-md text-muted-foreground">
            Las mejores películas te esperan. Compra tus entradas ahora y vive
            la experiencia del cine como nunca antes.
          </p>
          <Button size="lg" asChild className="gap-2">
            <Link to="/movies">
              <Ticket className="h-5 w-5" />
              Explorar películas
            </Link>
          </Button>
        </motion.div>
      </section>
    </>
  );
}

export default HomePage;
