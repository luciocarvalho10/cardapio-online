'use client';
import { SyntheticEvent, useEffect, useState } from 'react';

import { useMenu } from '@/context/menu/useMenu';
import { ICategory } from '@/interfaces/ICategory';
import categoryIcons from '@/utils/icons/categories';

import CategoryForm from './categoryForm';
import CategoryFormInfo from './categoryForm/categoryFormInfo';
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
    <>
      <div className='rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900'>
        {/* Header */}
        <CategoryFormInfo
          categories={categories}
          showForm={showForm}
          setShowForm={setShowForm}
        />

        {/* Add Form */}
        {showForm && (
          <CategoryForm
            handleAdd={handleAdd}
            form={form}
            setForm={setForm}
            setShowForm={setShowForm}
            categoryIcons={categoryIcons}
          />
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
  );
}
