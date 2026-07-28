import Link from "next/link";
import type { BusinessAsset } from "@/features/knowledge/domain/business-asset";

type BusinessAssetListProps = {
  assets: BusinessAsset[];
};

export function BusinessAssetList({ assets }: BusinessAssetListProps) {
  const groupedAssets = groupAssetsByCategory(assets);

  return (
    <div className="space-y-8">
      {groupedAssets.map(([category, categoryAssets]) => (
        <section key={category}>
          <h2 className="text-2xl font-semibold capitalize text-white">
            {category}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {categoryAssets.map((asset) => (
              <Link
                key={asset.id}
                href={`/docs/assets/${asset.id}`}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-300/35 hover:bg-white/[0.05]"
              >
                <h3 className="text-xl font-semibold text-white">
                  {asset.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {asset.description}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {asset.intendedAudience}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function groupAssetsByCategory(assets: BusinessAsset[]) {
  const groupedAssets = assets.reduce<Map<string, BusinessAsset[]>>(
    (groups, asset) => {
      const categoryAssets = groups.get(asset.category) ?? [];
      groups.set(asset.category, [...categoryAssets, asset]);

      return groups;
    },
    new Map(),
  );

  return Array.from(groupedAssets.entries());
}

