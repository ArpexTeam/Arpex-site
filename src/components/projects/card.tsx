// components/projects/card.tsx
export default function ProjectCard() {
  return (
    <div className="group relative aspect-[4/3] rounded-xl border border-white/10 bg-white/[0.06] overflow-hidden">
      {/* highlight sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent" />
      {/* hover leve */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-white/[0.03]" />
    </div>
  );
}
