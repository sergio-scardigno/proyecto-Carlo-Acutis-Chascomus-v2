import { SurfaceCard } from "@/components/SurfaceCard";

type EmptyStateProps = {
  message: string;
};

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <SurfaceCard className="text-center text-primary-700">
      <p>{message}</p>
    </SurfaceCard>
  );
}

