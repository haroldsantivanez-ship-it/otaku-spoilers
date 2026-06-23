import { useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Play,
  Star,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { posterUrl, backdropUrl } from "@/lib/tmdb";
import { getMovieById, getMovieVideos } from "@/services/movie-service";

function MovieDetailPage() {
  const { id } = useParams();
  const [trailerOpen, setTrailerOpen] = useState(false);

  const {
    data: movie,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(Number(id)),
    enabled: !!id,
  });

  const { data: videos } = useQuery({
    queryKey: ["movie-videos", id],
    queryFn: () => getMovieVideos(Number(id)),
    enabled: !!id,
  });

  const trailer = videos?.find(
    (v) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser"),
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Skeleton className="mb-6 h-8 w-32" />
        <div className="grid gap-8 md:grid-cols-[350px_1fr]">
          <Skeleton className="h-[520px] w-full rounded-xl" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-20">
        <h1 className="text-2xl font-bold">Película no encontrada</h1>
        <p className="text-muted-foreground">
          No pudimos encontrar la película que buscas.
        </p>
        <Button asChild>
          <Link to="/movies">Volver a cartelera</Link>
        </Button>
      </div>
    );
  }

  const year = movie.release_date?.split("-")[0];
  const hours = Math.floor((movie.runtime || 0) / 60);
  const minutes = (movie.runtime || 0) % 60;
  const duration = movie.runtime ? `${hours}h ${minutes}min` : "N/A";

  return (
    <>
      {/* Backdrop */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[500px] overflow-hidden">
        <img
          src={backdropUrl(movie.backdrop_path)}
          alt=""
          className="h-full w-full object-cover opacity-20 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Botón volver */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button variant="ghost" size="sm" asChild className="mb-6 gap-2">
            <Link to="/movies">
              <ArrowLeft className="h-4 w-4" />
              Volver a cartelera
            </Link>
          </Button>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-[350px_1fr]">
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src={posterUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full rounded-xl border border-border/50 shadow-2xl shadow-primary/10"
            />
            {trailer && (
              <button
                onClick={() => setTrailerOpen(true)}
                className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/0 transition-all hover:bg-black/50"
              >
                <div className="rounded-full bg-primary p-4 opacity-0 shadow-lg transition-all group-hover:opacity-100 hover:scale-110 [button:hover_&]:opacity-100">
                  <Play className="h-8 w-8 fill-current text-primary-foreground" />
                </div>
              </button>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div>
              {movie.tagline && (
                <p className="mb-2 text-sm italic text-muted-foreground">
                  "{movie.tagline}"
                </p>
              )}
              <h1 className="text-4xl font-bold md:text-5xl">{movie.title}</h1>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {movie.genres?.map((genre) => (
                  <Badge
                    key={genre.id}
                    variant="secondary"
                    className="gap-1"
                  >
                    <Tag className="h-3 w-3" />
                    {genre.name}
                  </Badge>
                ))}
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-semibold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {year}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {duration}
              </span>
            </div>

            <Separator className="bg-border/50" />

            <div>
              <h2 className="mb-3 text-lg font-semibold">Sinopsis</h2>
              <p className="leading-relaxed text-muted-foreground">
                {movie.overview || "Sin sinopsis disponible."}
              </p>
            </div>

            <Separator className="bg-border/50" />

            {/* Botones de acción */}
            <div className="flex flex-wrap gap-3">
              {trailer && (
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 text-base"
                  onClick={() => setTrailerOpen(true)}
                >
                  <Play className="h-5 w-5 fill-current" />
                  Ver Trailer
                </Button>
              )}
              <Button size="lg" className="gap-2 text-base">
                Comprar entrada
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal del Trailer */}
      {trailer && (
        <Dialog open={trailerOpen} onOpenChange={setTrailerOpen}>
          <DialogContent className="max-w-4xl border-border/50 bg-background/95 p-0 backdrop-blur-xl">
            <DialogHeader className="p-4 pb-0">
              <DialogTitle>{trailer.name}</DialogTitle>
            </DialogHeader>
            <div className="aspect-video w-full p-4 pt-2">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title={trailer.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full rounded-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default MovieDetailPage;
