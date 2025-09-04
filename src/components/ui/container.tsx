// components/ui/container.tsx
import { cn } from "@/lib/cn";

export default function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  // Mantive "container max-w-6xl mx-auto" pra não mexer 1px no que você já vê.
  return <div className={cn("container max-w-6xl mx-auto", className)} {...props} />;
}
