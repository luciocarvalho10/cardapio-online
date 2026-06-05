import IC from "../../icons";

type ToolbarProps = {
  categories: { id: string; name: string; icon: string }[];
  openAdd: () => void;
  search: string;
  setSearch: (value: string) => void;
  filterCat: string;
  setFilterCat: (value: string) => void;
};

export default function Toolbar({
  categories,
  openAdd,
  search,
  setSearch,
  filterCat,
  setFilterCat,
}: ToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="relative flex-1">
        <IC.Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar produto..."
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 dark:focus:ring-amber-900/40 transition-all"
        />
      </div>
      <select
        value={filterCat}
        onChange={(e) => setFilterCat(e.target.value)}
        className="px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 dark:text-gray-300 text-gray-700 focus:outline-none focus:border-amber-400 transition-colors"
      >
        <option value="all">Todas as categorias</option>
        {categories.map((c) => (
          <option
            key={c.id}
            value={c.id}
          >
            {c.icon} {c.name}
          </option>
        ))}
      </select>
      <button
        onClick={openAdd}
        className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors shadow-md text-sm whitespace-nowrap"
      >
        <IC.Plus size={16} /> Novo produto
      </button>
    </div>
  );
}
