import IC from '@/components/icons';
import { ICategory } from '@/interfaces/ICategory';

type CategoryFormInfoProps = {
  categories: ICategory[];
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CategoryFormInfo({ categories, showForm, setShowForm }: CategoryFormInfoProps) {
  return (
    <div className='mb-6 flex items-center justify-between'>
      <div>
        <h3
          className='text-gray-800 dark:text-gray-100'
          style={{ fontFamily: 'Georgia, serif' }}>
          Categorias
        </h3>
        <p className='text-sm text-gray-500 dark:text-gray-400'>
          {categories.length} categorias cadastradas
        </p>
      </div>
      <button
        onClick={() => setShowForm(!showForm)}
        className='flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm text-white shadow-md transition-colors hover:bg-amber-600'>
        <IC.Plus size={16} /> Nova categoria
      </button>
    </div>
  );
}
