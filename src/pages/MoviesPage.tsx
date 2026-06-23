import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import MovieCard from "@/components/MovieCard";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import { getPopular } from "@/services/movie-service";

function MoviesPage() {
  const { data: movies, isLoading } = useQuery({
    queryKey: ["popular"],
    queryFn: getPopular,
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex items-center gap-3"
      >
        <div className="h-8 w-1 rounded-full bg-primary" />
        <div>
          <h1 className="text-3xl font-bold">Cartelera</h1>
          <p className="text-sm text-muted-foreground">
            Todas las películas disponibles
          </p>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {movies?.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MoviesPage;
