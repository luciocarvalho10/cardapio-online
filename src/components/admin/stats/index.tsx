type StatsProps = {
  products: { available: boolean }[];
  categories: {}[];
};

export default function Stats({ products, categories }: StatsProps) {
  const stats = {
    total: products.length,
    available: products.filter((p) => p.available).length,
    categories: categories.length,
  };

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {[
        {
          label: "Total de produtos",
          value: stats.total,
          light: "bg-blue-50 text-blue-700",
          dark: "dark:bg-blue-900/20 dark:text-blue-400",
          icon: "📦",
        },
        {
          label: "Disponíveis",
          value: stats.available,
          light: "bg-green-50 text-green-700",
          dark: "dark:bg-green-900/20 dark:text-green-400",
          icon: "✅",
        },
        {
          label: "Categorias",
          value: stats.categories,
          light: "bg-amber-50 text-amber-700",
          dark: "dark:bg-amber-900/20 dark:text-amber-400",
          icon: "🏷️",
        },
      ].map((s) => (
        <div
          key={s.label}
          className={`${s.light} ${s.dark} rounded-2xl p-4 transition-colors`}
        >
          <p className="text-2xl mb-1">{s.icon}</p>
          <p
            className="text-2xl"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {s.value}
          </p>
          <p className="text-xs opacity-70">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
