import { ICategory } from "@/interfaces/ICategory";

type CustomerCategoryTabsProps = {
  categories: Pick<ICategory, 'id' | 'name' | 'icon'>[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
};

export function CustomerCategoryTabs({
  categories,
  activeCategory,
  setActiveCategory,
}: CustomerCategoryTabsProps) {
  return (
    <div className='scrollbar-hide flex gap-2 overflow-x-auto pb-1'>
      <button
        onClick={() => setActiveCategory('all')}
        className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-all ${
          activeCategory === 'all'
            ? 'bg-amber-500 text-white shadow-md'
            : 'bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-amber-900/30 dark:hover:text-amber-400'
        }`}>
        🍴 Todos
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => setActiveCategory(cat.id)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition-all ${
            activeCategory === cat.id
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-amber-50 hover:text-amber-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-amber-900/30 dark:hover:text-amber-400'
          }`}>
          {cat.icon} {cat.name}
        </button>
      ))}
    </div>
  );
}
