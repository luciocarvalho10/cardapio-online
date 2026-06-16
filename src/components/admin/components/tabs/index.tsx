import { SetStateAction } from 'react';

import { Tab } from '@/components/admin/pages/dashboard'
import IC from '@/components/icons';

type TabsProps = {
  tab: Tab;
  setTab: (value: SetStateAction<Tab>) => void;
};

export default function Tabs({ tab, setTab }: TabsProps) {
  const classButton = (el: Tab) =>
    tab === el
      ? 'bg-white dark:bg-gray-700 shadow text-gray-800 dark:text-gray-100'
      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200';

  return (
    <div className='mb-6 flex w-fit gap-1 rounded-xl bg-gray-100 p-1 transition-colors dark:bg-gray-800'>
      <button
        onClick={() => setTab('products')}
        className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm transition-all ${classButton('products')}`}>
        <IC.LayoutGrid size={16} /> Produtos
      </button>
      <button
        onClick={() => setTab('categories')}
        className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm transition-all ${classButton('categories')}`}>
        <IC.Tags size={16} /> Categorias
      </button>
      <button
        onClick={() => setTab('users')}
        className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm transition-all ${classButton('users')}`}>
        <IC.Users size={16} /> Usuários
      </button>
    </div>
  );
}
