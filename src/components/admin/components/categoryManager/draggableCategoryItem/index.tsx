import {
  Dispatch,
  SetStateAction,
  useRef,
} from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { ICategory } from '@/interfaces/ICategory'
import categoryIcons from '@/utils/categoryIcons';
import IC from '@/utils/icons';

interface DraggableCategoryItemProps {
  cat: ICategory;
  index: number;
  moveCategory: (dragIndex: number, hoverIndex: number) => void;
  editingId: string | null;
  editForm: { name: string; icon: string; order: number };
  setEditForm: Dispatch<
    SetStateAction<{ name: string; icon: string; order: number }>
  >;
  setEditingId: Dispatch<SetStateAction<string | null>>;
  startEdit: (cat: ICategory) => void;
  saveEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  deleteConfirm: string | null;
  getProductCount: (catId: string) => number;
}

export default function DraggableCategoryItem({
  cat,
  index,
  moveCategory,
  editingId,
  editForm,
  setEditForm,
  setEditingId,
  startEdit,
  saveEdit,
  handleDelete,
  deleteConfirm,
  getProductCount,
}: DraggableCategoryItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'CATEGORY',
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'CATEGORY',
    hover: (item: { index: number }) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveCategory(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className='dark:hover:bg-gray-750 group flex cursor-move items-center gap-3 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-800'>
      <IC.GripVertical
        size={16}
        className='shrink-0 text-gray-300 dark:text-gray-600'
      />

      {editingId === cat.id ? (
        <div className='flex flex-1 flex-wrap gap-2'>
          <select
            value={editForm.icon}
            onChange={e => setEditForm({ ...editForm, icon: e.target.value })}
            className='rounded-lg border border-gray-200 bg-white px-2 py-1 text-xl transition-colors focus:border-amber-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'>
            {categoryIcons.map(icon => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
          <input
            type='text'
            value={editForm.name}
            onChange={e => setEditForm({ ...editForm, name: e.target.value })}
            className='min-w-32 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-1 transition-colors focus:border-amber-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
            autoFocus
          />
          <input
            type='number'
            value={editForm.order}
            onChange={e =>
              setEditForm({ ...editForm, order: Number(e.target.value) })
            }
            className='w-16 rounded-lg border border-gray-200 bg-white px-2 py-1 transition-colors focus:border-amber-400 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100'
            min='1'
          />
          <button
            onClick={() => saveEdit(cat.id)}
            className='rounded-lg bg-green-500 p-1.5 text-white transition-colors hover:bg-green-600'>
            <IC.Check size={14} />
          </button>
          <button
            onClick={() => setEditingId(null)}
            className='rounded-lg border border-gray-200 p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800'>
            <IC.X size={14} />
          </button>
        </div>
      ) : (
        <>
          <span className='text-2xl'>{cat.icon}</span>
          <div className='flex-1'>
            <p className='text-sm text-gray-800 dark:text-gray-200'>
              {cat.name}
            </p>
            <p className='text-xs text-gray-400 dark:text-gray-500'>
              {getProductCount(cat.id)} produto(s) · ordem {cat.order}
            </p>
          </div>
          <div className='flex gap-1 opacity-0 transition-opacity group-hover:opacity-100'>
            <button
              onClick={() => startEdit(cat)}
              className='rounded-lg p-2 text-gray-400 transition-colors hover:bg-amber-50 hover:text-amber-500 dark:text-gray-500 dark:hover:bg-amber-900/20 dark:hover:text-amber-400'
              title='Editar'>
              <IC.Pencil size={15} />
            </button>
            <button
              onClick={() => handleDelete(cat.id)}
              className={`rounded-lg p-2 transition-colors ${
                deleteConfirm === cat.id
                  ? 'bg-red-500 text-white'
                  : 'text-gray-400 hover:bg-red-50 hover:text-red-500 dark:text-gray-500 dark:hover:bg-red-900/20 dark:hover:text-red-400'
              }`}
              title={
                deleteConfirm === cat.id
                  ? 'Clique novamente para confirmar'
                  : 'Excluir'
              }>
              <IC.Trash2 size={15} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}