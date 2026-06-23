import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function MovieCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border/50">
      <CardHeader className="p-0">
        <Skeleton className="h-80 w-full rounded-none" />
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex gap-3">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border/50 p-4">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-9 w-28" />
      </CardFooter>
    </Card>
  );
}

export default MovieCardSkeleton;
