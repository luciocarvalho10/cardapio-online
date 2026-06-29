'use client';

import React, { useEffect, useState } from 'react';

import { useMenu } from '@/context/menu/useMenu';
import { ICategory } from '@/interfaces/ICategory'; // Ajuste o caminho

export default function CategoryList() {
  const { categories, addCategory, deleteCategory } = useMenu();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (categories) setLoading(false);
  }, [categories]);

  const handleAddCategory = async () => {
    try {
      setLoading(true);
      const newCategory: Omit<ICategory, 'id'> = {
        name: 'Entradas',
        icon: '🥗',
        order: (categories[categories.length - 1]?.order ?? 0) + 1,
      };
      await addCategory(newCategory);
      setLoading(false);
      alert('Categoria adicionada com sucesso!');
    } catch (err) {
      setError('Erro ao adicionar categoria.');
      setLoading(false);
      console.error(err);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      setLoading(true);
      await deleteCategory(id);
      setLoading(false);
      alert('Categoria deletada com sucesso!');
    } catch (err) {
      setError('Erro ao deletar categoria.');
      setLoading(false);
      console.error(err);
    }
  };

  if (loading) return <p>Carregando categorias...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1>Lista de Categorias</h1>
      <button onClick={handleAddCategory} disabled={loading}>
        Adicionar Categoria
      </button>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name} - {category.icon}
            <button
              onClick={() => handleDeleteCategory(category.id)}
              disabled={loading}>
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
