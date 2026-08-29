import { cn } from "@/lib/cn";

export default function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 md:px-8", className)} {...props} />;
}
