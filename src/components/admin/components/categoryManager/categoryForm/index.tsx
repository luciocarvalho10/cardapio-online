import IC from "@/utils/icons";

type CategoryFormProps = {
    handleAdd: (e: React.SyntheticEvent) => void;
    form: {
        name: string;
        icon: string;
        order: number;
    };
    setForm: React.Dispatch<React.SetStateAction<{
        name: string;
        icon: string;
        order: number;
    }>>;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    categoryIcons: string[];
};

export default function CategoryForm({ handleAdd, form, setForm, setShowForm, categoryIcons }: CategoryFormProps) {
  return (
    <form
      onSubmit={handleAdd}
      className='mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20'>
      <p className='mb-3 text-sm text-amber-800 dark:text-amber-300'>
        Nova categoria
      </p>
      <div className='flex flex-col gap-3 sm:flex-row'>
        <div className='flex-1'>
          <input
            type='text'
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            placeholder='Nome da categoria'
            className='w-full rounded-xl border border-amber-200 bg-white px-4 py-2 transition-colors focus:border-amber-400 focus:outline-none dark:border-amber-800 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500'
            autoFocus
          />
        </div>
        <div>
          <select
            value={form.icon}
            onChange={e => setForm({ ...form, icon: e.target.value })}
            className='rounded-xl border border-amber-200 bg-white px-3 py-2 text-xl transition-colors focus:border-amber-400 focus:outline-none dark:border-amber-800 dark:bg-gray-800 dark:text-gray-100'>
            {categoryIcons.map(icon => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type='number'
            value={form.order}
            onChange={e => setForm({ ...form, order: Number(e.target.value) })}
            placeholder='Ordem'
            min='1'
            className='w-20 rounded-xl border border-amber-200 bg-white px-3 py-2 transition-colors focus:border-amber-400 focus:outline-none dark:border-amber-800 dark:bg-gray-800 dark:text-gray-100'
          />
        </div>
        <div className='flex gap-2'>
          <button
            type='submit'
            className='rounded-xl bg-amber-500 px-4 py-2 text-sm text-white transition-colors hover:bg-amber-600'>
            Salvar
          </button>
          <button
            type='button'
            onClick={() => setShowForm(false)}
            className='rounded-xl border border-gray-200 px-3 py-2 text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800'>
            <IC.X size={16} />
          </button>
        </div>
      </div>
    </form>
  );
}
