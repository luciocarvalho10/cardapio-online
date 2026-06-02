'use client'

import React, { useEffect, useState } from 'react';

import { useFirebase } from '@/context/firebase/useFirebase';
import { IProduct } from '@/interfaces/IProduct'; // Ajuste o caminho

export default function ProductList() {
  const { productRepository } = useFirebase();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Exemplo de uso do método listen para updates em tempo real
    const unsubscribe = productRepository.listen(latestProducts => {
      setProducts(latestProducts);
      setLoading(false);
    });

    // Retorne a função de desinscrição para limpar o listener
    return () => unsubscribe();
  }, [productRepository]); // Re-execute se a instância do repositório mudar (improvável)

  const handleAddProduct = async () => {
    try {
      setLoading(true);
      const now = Date.now();
      const newProduct: IProduct = {
        id: 'product_' + now, // Gerar um ID único
        name: `Novo Produto ${now}`,
        price: Math.floor(Math.random() * 100) + 10,
        description: `Descrição de um novo produto ID: product_${now}.`,
      };
      await productRepository.create(newProduct);
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
      await productRepository.delete(id);
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
