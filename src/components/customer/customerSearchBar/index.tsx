import IC from '@/utils/icons';

type CustomerSearchBarProps = {
  search: string;
  setSearch: (search: string) => void;
};

export function CustomerSearchBar({
  search,
  setSearch,
}: CustomerSearchBarProps) {
  return (
    <div className='relative mb-3'>
      <IC.Search
        size={18}
        className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-500'
      />
      <input
        type='text'
        placeholder='Buscar pratos, ingredientes...'
        value={search}
        onChange={e => setSearch(e.target.value)}
        className='w-full rounded-full border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-amber-900/40'
      />
    </div>
  );
}
