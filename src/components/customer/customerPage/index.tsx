'use client';
import { useState } from "react";

import { Banner } from "@/components/banner";
import Customer from "@/components/customer";
import { Footer } from "@/components/footer";
import { NotProduct } from "@/components/notProduct";
import { useMenu } from "@/context/menu/useMenu";

export default function CustomerPage() {
  const { categories, products } = useMenu();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");

  const availableProducts = products.filter((p) => p.available);

  const filtered = availableProducts.filter((p) => {
    const matchCategory =
      activeCategory === "all" || p.categoryId === activeCategory;
    const matchSearch =
      search === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const grouped = categories.map((cat) => ({
    category: cat,
    items: filtered.filter((p) => p.categoryId === cat.id),
  }));

  const displayGroups =
    activeCategory === "all"
      ? grouped.filter((g) => g.items.length > 0)
      : grouped.filter(
          (g) => g.category.id === activeCategory && g.items.length > 0,
        );

  return (
    <div className=" flex flex-col justify-between min-h-screen bg-[#fdf8f3] dark:bg-gray-950 transition-colors duration-300">
      <div>
        {/* Hero */}
        <Banner />

        {/* Search + Filter Bar */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-900/50 transition-colors duration-300">
          <div className="max-w-6xl mx-auto px-4 py-3">
            {/* Search */}
            <Customer.CustomerSearchBar
              search={search}
              setSearch={setSearch}
            />

            {/* Category Tabs */}
            <Customer.CustomerCategoryTabs
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          </div>
        </div>

        {/* Menu Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {displayGroups.length === 0 ? (
            <NotProduct />
          ) : (
            displayGroups.map(({ category, items }) => (
              <div
                key={category.id}
                className="mb-12"
              >
                {/* Category Header */}
                <Customer.CustomerCategoryHeader category={category} />

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((product) => (
                    <Customer.CustomerProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
