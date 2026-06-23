import { Link } from "react-router";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { posterUrl } from "@/lib/tmdb";
import type { Movie } from "@/lib/types";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

function MovieCard({ movie, index = 0 }: MovieCardProps) {
  const year = movie.release_date?.split("-")[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className="relative p-0">
          <div className="overflow-hidden">
            <img
              src={posterUrl(movie.poster_path)}
              alt={movie.title}
              className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
              {year}
            </Badge>
            <div className="flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-sm font-medium text-yellow-400 backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-current" />
              {movie.vote_average.toFixed(1)}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 p-4">
          <h3 className="text-lg font-bold leading-tight transition-colors group-hover:text-primary">
            {movie.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {movie.overview}
          </p>
        </CardContent>

        <CardFooter className="flex items-center justify-end border-t border-border/50 p-4">
          <Button
            size="sm"
            asChild
            className="transition-transform hover:scale-105"
          >
            <Link to={`/movies/${movie.id}`}>Ver detalle</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default MovieCard;
