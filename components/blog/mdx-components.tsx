import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";

export const blogMdxComponents: MDXComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-12 text-3xl font-semibold leading-tight text-[var(--color-ink)] first:mt-0" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 text-2xl font-semibold leading-tight text-[var(--color-ink)]" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-5 text-base leading-8 text-[var(--color-muted)]" {...props} />
  ),
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const className = "font-semibold text-cyan-700 underline-offset-4 hover:underline";

    if (href.startsWith("/")) {
      return <Link href={href} className={className} {...props} />;
    }

    return <a href={href} className={className} rel="noreferrer" {...props} />;
  },
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-5 list-disc space-y-2 pl-6 text-base leading-8 text-[var(--color-muted)]" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 text-base leading-8 text-[var(--color-muted)]" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote className="mt-8 border-l-4 border-cyan-500/40 bg-cyan-50/70 py-4 pl-5 pr-4 text-[var(--color-ink)]" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-sm text-cyan-700" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-[#07111f] p-5 text-sm leading-7 text-slate-100" {...props} />
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="mt-7 overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th className="border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-[var(--color-ink)]" {...props} />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border border-slate-200 px-4 py-3 text-[var(--color-muted)]" {...props} />
  ),
  img: ({ src, alt = "" }: ComponentPropsWithoutRef<"img">) => {
    if (typeof src !== "string") {
      return null;
    }

    return (
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={720}
        sizes="(min-width: 768px) 720px, 100vw"
        className="mt-8 rounded-lg border border-slate-200 bg-slate-50 object-contain"
      />
    );
  },
};
