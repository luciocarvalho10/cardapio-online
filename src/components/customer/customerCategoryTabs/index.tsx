type CustomerCategoryTabsProps = {
  categories: { id: string; name: string; icon: string }[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
};

export function CustomerCategoryTabs({
  categories,
  activeCategory,
  setActiveCategory,
}: CustomerCategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <button
        onClick={() => setActiveCategory("all")}
        className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm transition-all ${
          activeCategory === "all"
            ? "bg-amber-500 text-white shadow-md"
            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-700 dark:hover:text-amber-400"
        }`}
      >
        🍴 Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setActiveCategory(cat.id)}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm transition-all ${
            activeCategory === cat.id
              ? "bg-amber-500 text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-amber-50 dark:hover:bg-amber-900/30 hover:text-amber-700 dark:hover:text-amber-400"
          }`}
        >
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  );
}
