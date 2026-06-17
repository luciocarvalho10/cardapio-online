import IC from '@/utils/icons';

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
    <div className='mb-4 flex flex-col gap-3 sm:flex-row'>
      <div className='relative flex-1'>
        <IC.Search
          size={16}
          className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-500'
        />
        <input
          type='text'
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder='Buscar produto...'
          className='w-full rounded-xl border border-gray-200 bg-white py-2.5 pr-4 pl-9 transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-amber-900/40'
        />
      </div>
      <select
        value={filterCat}
        onChange={e => setFilterCat(e.target.value)}
        className='rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-gray-700 transition-colors focus:border-amber-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300'>
        <option value='all'>Todas as categorias</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>
            {c.icon} {c.name}
          </option>
        ))}
      </select>
      <button
        onClick={openAdd}
        className='flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-sm whitespace-nowrap text-white shadow-md transition-colors hover:bg-amber-600'>
        <IC.Plus size={16} /> Novo produto
      </button>
    </div>
  );
}
