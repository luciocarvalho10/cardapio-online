'use client';

import React, { useState } from 'react';

import { useMenu } from '@/context/menu/useMenu';
import { ICategory } from '@/interfaces/ICategory'; // Ajuste o caminho

export default function CategoryList() {
  const { categories, addCategory, deleteCategory } = useMenu();
  const [error, setError] = useState<string | null>(null);
  const loading = categories.length === 0;

  const handleAddCategory = async () => {
    try {
      const newCategory: Omit<ICategory, 'id'> = {
        name: 'Entradas',
        icon: '🥗',
        order: (categories[categories.length - 1]?.order ?? 0) + 1,
      };
      await addCategory(newCategory);
      alert('Categoria adicionada com sucesso!');
    } catch (err) {
      setError('Erro ao adicionar categoria.');
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategory(id);
      alert('Categoria deletada com sucesso!');
    } catch (err) {
      setError('Erro ao deletar categoria.');
      console.error(err);
    }
  };

  if (loading) return <p>Carregando categorias...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1>Lista de Categorias</h1>
      <button onClick={handleAddCategory}>
        Adicionar Categoria
      </button>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name} - {category.icon}
            <button
              onClick={() => handleDeleteCategory(category.id)}>
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
