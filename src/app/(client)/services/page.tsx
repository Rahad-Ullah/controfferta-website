import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ServiceSearch from "@/components/client/services/service-search";
import { getCategories } from "@/actions/category";
import type { CategoryQuery } from "@/types/category.interface";

const PAGE_SIZE = 24;

function servicesHref({
  searchTerm,
  page,
  limit,
}: {
  searchTerm?: string;
  page?: number;
  limit: number;
}) {
  const params = new URLSearchParams();
  if (searchTerm) params.set("searchTerm", searchTerm);
  if (page && page > 1) params.set("page", String(page));
  params.set("limit", String(limit));
  return `/services?${params.toString()}`;
}

export const metadata = {
  title: "Service categories",
  description:
    "Browse service categories and submit a free request. Connect with qualified professionals in your area.",
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<CategoryQuery>;
}) {
  const params = await searchParams;
  const searchTerm = params.searchTerm?.trim() || undefined;
  const page = params.page ? String(params.page) : String(1);
  const limit = params.limit ? String(params.limit) : String(PAGE_SIZE);
  
  const result = await getCategories({ searchTerm, page, limit });
  const categories = result ? result.data : null;
  const currentPage = result?.pagination?.page ?? Number(page);
  const totalPage = result?.pagination?.totalPage ?? 0;
  const pageSize = result?.pagination?.limit ?? Number(limit);

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-[#00BC7D]/20 selection:text-[#00BC7D]">
      <section className="relative bg-[#0B131D] text-white py-20 sm:py-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=95"
            alt=""
            fill
            priority
            quality={95}
            className="object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B131D]/90 via-[#0B131D]/80 to-[#0B131D]" />
        </div>

        <div className="absolute top-1/2 left-8 -translate-y-1/2 hidden md:block text-xs font-semibold text-white/10 tracking-widest uppercase pointer-events-none">
          Professional Businesses
        </div>
        <div className="absolute top-1/2 right-8 -translate-y-1/2 hidden md:block text-xs font-semibold text-white/10 tracking-widest uppercase pointer-events-none">
          Logistics
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[300px] bg-[#00BC7D]/[0.10] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Service Categories
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Tell us what service you need and find the right professionals for your request.
          </p>
          <ServiceSearch searchTerm={searchTerm ?? ""} />
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories === null ? (
            <p className="text-sm text-slate-600">Categories could not be loaded.</p>
          ) : categories.length === 0 ? (
            <p className="text-sm text-slate-600">
              {searchTerm ? "No services match that search." : "No categories yet."}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
              {categories.map((service) => (
                <Link
                  key={service._id}
                  href={`/submit-request?category=${encodeURIComponent(service.name)}`}
                  className="group bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-[#00BC7D]/60 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer text-left"
                >
                  <div>
                    {service.iconUrl ? (
                      <Image
                        src={service.iconUrl}
                        alt=""
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#00BC7D] flex items-center justify-center font-semibold">
                        {service.name.slice(0, 1)}
                      </div>
                    )}
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-4 tracking-tight group-hover:text-[#00BC7D] transition-colors">
                      {service.name}
                    </h2>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-2 flex justify-end">
                    <span className="text-xs sm:text-sm font-semibold text-[#00BC7D] group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                      Submit a request
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {categories && totalPage > 1 ? (
            <div className="mt-10 flex items-center justify-center gap-4 text-sm">
              {currentPage > 1 ? (
                <Link
                  href={servicesHref({ searchTerm, page: currentPage - 1, limit: pageSize })}
                  className="font-semibold text-[#00BC7D]"
                >
                  Previous
                </Link>
              ) : (
                <span className="font-semibold text-slate-300">Previous</span>
              )}
              <span className="text-slate-600">
                Page {currentPage} of {totalPage}
              </span>
              {currentPage < totalPage ? (
                <Link
                  href={servicesHref({ searchTerm, page: currentPage + 1, limit: pageSize })}
                  className="font-semibold text-[#00BC7D]"
                >
                  Next
                </Link>
              ) : (
                <span className="font-semibold text-slate-300">Next</span>
              )}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
