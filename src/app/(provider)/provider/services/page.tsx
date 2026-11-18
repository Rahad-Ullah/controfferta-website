import { getCategories } from "@/actions/category";
import { getCategoryLeads } from "@/actions/lead";
import ProviderServiceCategories from "@/components/provider/services/category-grid";
import ProviderServicesHero from "@/components/provider/services/hero";
import ProviderServiceLeads from "@/components/provider/services/lead-grid";

export const metadata = {
  title: "Service categories for companies",
  description:
    "Browse the service categories where companies can find customer requests, from solar panels and renovation to moving and air conditioning.",
};

function objectId(value?: string) {
  if (!value || !/^[a-f\d]{24}$/i.test(value)) return undefined;
  return value;
}

export default async function ProviderServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; filter?: string }>;
}) {
  const params = await searchParams;
  const categoryId = objectId(params.category);
  const filterId = objectId(params.filter);
  const categoriesResult = await getCategories({ limit: "60", sort: "name" });
  const categories = categoriesResult ? categoriesResult.data : null;
  const selected = categories?.find((category) => category._id === categoryId) ?? null;
  const leads = selected ? await getCategoryLeads(selected._id) : null;

  return (
    <main className="bg-white">
      <ProviderServicesHero />
      {selected ? (
        <ProviderServiceLeads category={selected} result={leads} />
      ) : (
        <ProviderServiceCategories categories={categories} activeId={filterId} />
      )}
    </main>
  );
}
