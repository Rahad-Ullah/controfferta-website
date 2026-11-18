import Image from "next/image";
import Link from "next/link";
import {
  Hammer,
  LayoutGrid,
  Paintbrush,
  Snowflake,
  Sprout,
  Square,
  Sun,
  Truck,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Category } from "@/types/category.interface";

function iconFor(name: string): LucideIcon {
  const value = name.toLowerCase();
  if (value.includes("solar")) return Sun;
  if (value.includes("energy")) return Zap;
  if (value.includes("window") || value.includes("door")) return Square;
  if (value.includes("construct")) return Hammer;
  if (value.includes("mov")) return Truck;
  if (value.includes("renovat")) return Wrench;
  if (value.includes("garden")) return Sprout;
  if (value.includes("air") || value.includes("condition")) return Snowflake;
  if (value.includes("paint")) return Paintbrush;
  return LayoutGrid;
}

function chipClass(active: boolean) {
  return active
    ? "rounded-full bg-[#00BC7D] px-4 py-1.5 text-sm font-medium text-white"
    : "rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-600 transition-colors hover:border-slate-300";
}

export default function ProviderServiceCategories({
  categories,
  activeId,
}: {
  categories: Category[] | null;
  activeId?: string;
}) {
  const visible = categories?.filter((category) => !activeId || category._id === activeId) ?? [];

  return (
    <section className="bg-white py-14 text-slate-900 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {categories === null ? (
          <p className="text-sm text-slate-500">Categories could not be loaded.</p>
        ) : categories.length === 0 ? (
          <p className="text-sm text-slate-500">No categories yet.</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              <Link href="/provider/services" className={chipClass(!activeId)}>
                All
              </Link>
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/provider/services?filter=${category._id}`}
                  className={chipClass(activeId === category._id)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            {visible.length === 0 ? (
              <p className="mt-10 text-sm text-slate-500">No categories match that filter.</p>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {visible.map((category) => {
                  const Icon = iconFor(category.name);
                  return (
                    <article
                      key={category._id}
                      className="flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_16px_-6px_rgba(15,23,42,0.08)]"
                    >
                      {category.iconUrl ? (
                        <Image src={category.iconUrl} alt="" width={48} height={48} className="size-12 object-contain" />
                      ) : (
                        <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#E7F8F1] text-[#12a37a]">
                          <Icon className="size-5" />
                        </span>
                      )}
                      <h2 className="mt-5 text-base font-bold text-slate-900">{category.name}</h2>
                      {category.description ? (
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{category.description}</p>
                      ) : (
                        <div className="flex-1" />
                      )}
                      <Link
                        href={`/provider/services?category=${category._id}`}
                        className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#00BC7D] hover:text-[#009966]"
                      >
                        Browse requests
                        <span aria-hidden>→</span>
                      </Link>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
