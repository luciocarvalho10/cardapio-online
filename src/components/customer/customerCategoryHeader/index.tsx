type CustomerCategoryHeaderProps = { category: { name: string; icon: string } };

export function CustomerCategoryHeader({
  category,
}: CustomerCategoryHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-3xl">{category.icon}</span>
      <div>
        <h2
          className="text-2xl text-gray-800 dark:text-gray-100"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {category.name}
        </h2>
        <div className="w-16 h-0.5 bg-amber-400 mt-1" />
      </div>
    </div>
  );
}
