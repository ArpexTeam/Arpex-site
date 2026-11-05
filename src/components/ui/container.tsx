import { cn } from "@/lib/cn";

export default function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-[var(--gutter)]", className)} {...props} />;
}
