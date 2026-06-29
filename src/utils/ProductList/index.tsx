'use client';

import React, { useEffect, useState } from 'react';

import { useMenu } from '@/context/menu/useMenu';
import { IProduct } from '@/interfaces/IProduct'; // Ajuste o caminho

export default function ProductList() {
  const { products, addProduct, deleteProduct } = useMenu();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (products) setLoading(false);
  }, [products]);

  const handleAddProduct = async () => {
    try {
      setLoading(true);
      const newProduct: Omit<IProduct, 'id'> = {
        name: 'Bruschetta ao Tomate',
        description:
          'Pão italiano tostado com tomate fresco, alho, azeite e manjericão',
        price: 28.9,
        image:
          'https://images.unsplash.com/photo-1761315412580-08dd503b8d89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
        categoryId: 'cat-1',
        available: true,
        showable: true,
      };
      await addProduct(newProduct);
      setLoading(false);
      alert('Produto adicionado com sucesso!');
    } catch (err) {
      setError('Erro ao adicionar produto.');
      setLoading(false);
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      setLoading(false);
      alert('Produto deletado com sucesso!');
    } catch (err) {
      setError('Erro ao deletar produto.');
      setLoading(false);
      console.error(err);
    }
  };

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <button onClick={handleAddProduct} disabled={loading}>
        Adicionar Produto
      </button>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - R${product.price.toFixed(2)}
            <button
              onClick={() => handleDeleteProduct(product.id)}
              disabled={loading}>
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
