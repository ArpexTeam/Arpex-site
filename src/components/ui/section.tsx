// components/ui/section.tsx
import Container from "./container";
import { cn } from "@/lib/cn";

export default function Section({
  id, className, classNameContainer, children,
}:{
  id?: string;
  className?: string;
  classNameContainer?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("cq", className)}>
      <Container className={classNameContainer}>{children}</Container>
    </section>
  );
}
