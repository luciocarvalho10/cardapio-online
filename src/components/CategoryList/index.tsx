'use client'

import React, { useEffect, useState } from 'react';

import { useMenu } from '@/context/menu/useMenu';
import { ICategory } from '@/interfaces/ICategory'; // Ajuste o caminho

export default function CategoryList() {
  const { CategoryRepository } = useMenu();
  const [categories, setCategory] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Exemplo de uso do método listen para updates em tempo real
    const unsubscribe = CategoryRepository.listen(latestCategory => {
      setCategory(latestCategory);
      setLoading(false);
    });

    // Retorne a função de desinscrição para limpar o listener
    return () => unsubscribe();
  }, [CategoryRepository]); // Re-execute se a instância do repositório mudar (improvável)

  const handleAddCategory = async () => {
    try {
      setLoading(true);
      const newCategory: ICategory = { id: "cat-1", name: "Entradas", icon: "🥗", order: 1 };
      await CategoryRepository.create(newCategory);
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
      await CategoryRepository.delete(id);
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
