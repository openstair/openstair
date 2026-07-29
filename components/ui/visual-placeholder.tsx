type VisualPlaceholderProps = {
  assetName: string;
  title: string;
  description?: string;
  className?: string;
  aspect?: "wide" | "square" | "portrait";
};

const aspectClass = {
  wide: "aspect-[16/10]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
};

export function VisualPlaceholder({
  assetName,
  title,
  description,
  className,
  aspect = "wide",
}: VisualPlaceholderProps) {
  return (
    <figure
      className={[
        "relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(135deg,#fafeff,#d9fbff_42%,#eef5fb)] shadow-[0_28px_90px_rgba(8,145,178,0.14)]",
        aspectClass[aspect],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-placeholder-asset={assetName}
    >
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.84),transparent_38%),radial-gradient(circle_at_18%_22%,rgba(103,232,249,0.38),transparent_28%),radial-gradient(circle_at_78%_68%,rgba(8,145,178,0.18),transparent_30%)]" />
      <div className="absolute left-[11%] top-[14%] h-[70%] w-[54%] rounded-[2rem] border border-white/70 bg-white/46 shadow-[0_24px_70px_rgba(8,145,178,0.12)] backdrop-blur-md" />
      <div className="absolute right-[10%] top-[20%] h-[46%] w-[28%] rounded-[1.5rem] border border-cyan-200/80 bg-cyan-100/70 shadow-[0_18px_54px_rgba(8,145,178,0.12)]" />
      <div className="absolute bottom-[20%] left-[18%] h-[12%] w-[42%] rounded-full border border-slate-200 bg-white/74" />
      <div className="absolute right-[18%] top-[14%] grid h-16 w-16 place-items-center rounded-2xl border border-white/80 bg-white/70 text-xl font-black text-cyan-700 shadow-[0_16px_44px_rgba(8,145,178,0.14)]">
        OS
      </div>
      <div className="absolute inset-x-5 bottom-5">
        <div className="max-w-md rounded-2xl border border-white/20 bg-[#07111f]/88 p-4 shadow-[0_18px_50px_rgba(7,17,31,0.22)] backdrop-blur-xl">
          <figcaption className="text-lg font-semibold leading-tight text-white">
            {title}
          </figcaption>
          {description ? (
            <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
          ) : null}
        </div>
      </div>
    </figure>
  );
}
