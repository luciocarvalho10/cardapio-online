'use client';
import { SyntheticEvent, useEffect, useState } from 'react';

import IC from '@/components/icons';
import { useMenu } from '@/context/menu/useMenu';
import { ICategory } from '@/interfaces/ICategory';
import categoryIcons from '@/utils/categoryIcons';

import DraggableCategoryItem from './draggableCategoryItem';

export default function CategoryManager() {
  const { categories, products, addCategory, updateCategory, deleteCategory } =
    useMenu();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', icon: '🍽️', order: categories.length + 1 });
  const [editForm, setEditForm] = useState({ name: '', icon: '', order: 0 });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [orderedCategories, setOrderedCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    setOrderedCategories([...categories]);
  }, [categories]);

  const getProductCount = (catId: string) =>
    products.filter(p => p.categoryId === catId).length;

  const moveCategory = (dragIndex: number, hoverIndex: number) => {
    const draggedCategory = orderedCategories[dragIndex];
    const newCategories = [...orderedCategories];
    newCategories.splice(dragIndex, 1);
    newCategories.splice(hoverIndex, 0, draggedCategory);

    // Update order values
    const updatedCategories = newCategories.map((cat, idx) => ({
      ...cat,
      order: idx + 1,
    }));

    setOrderedCategories(updatedCategories);

    // Persist the new order
    updatedCategories.forEach(cat => {
      updateCategory(cat.id, {
        name: cat.name,
        icon: cat.icon,
        order: cat.order,
      });
    });
  };

  const handleAdd = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    addCategory({ name: form.name.trim(), icon: form.icon, order: form.order });
    setForm({ name: '', icon: '🍽️', order: categories.length + 2 });
    setShowForm(false);
  };

  const startEdit = (cat: ICategory) => {
    setEditingId(cat.id);
    setEditForm({ name: cat.name, icon: cat.icon, order: cat.order });
  };

  const saveEdit = (id: string) => {
    if (!editForm.name.trim()) return;
    updateCategory(id, editForm);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      deleteCategory(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  return (
    // <DndProvider backend={HTML5Backend}>
    <>
      <div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900'>
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

        {/* Add Form */}
        {showForm && (
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
        )}

        {/* Categories List */}
        <div className='space-y-2'>
          {orderedCategories.map((cat, index) => (
            <DraggableCategoryItem
              key={cat.id}
              cat={cat}
              index={index}
              moveCategory={moveCategory}
              editingId={editingId}
              editForm={editForm}
              setEditForm={setEditForm}
              setEditingId={setEditingId}
              startEdit={startEdit}
              saveEdit={saveEdit}
              handleDelete={handleDelete}
              deleteConfirm={deleteConfirm}
              getProductCount={getProductCount}
            />
          ))}
        </div>

        {deleteConfirm && (
          <p className='mt-3 animate-pulse text-center text-xs text-red-500 dark:text-red-400'>
            ⚠️ Clique novamente no ícone de lixeira para confirmar a exclusão
          </p>
        )}
      </div>
    </>
    //</DndProvider>
  );
}
