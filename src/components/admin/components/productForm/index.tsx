'use client';
import Image from 'next/image';
import { SyntheticEvent,useEffect, useState } from 'react';

import { useMenu } from '@/context/menu/useMenu';
import { IProduct } from '@/interfaces/IProduct';
import IC from '@/utils/icons';

interface Props {
  product?: IProduct | null;
  onClose: () => void;
}

export default function ProductForm({ product, onClose }: Props) {
  const { categories, addProduct, updateProduct } = useMenu();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    categoryId: categories[0]?.id || '',
    available: true,
    showable: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image: product.image,
        categoryId: product.categoryId,
        available: product.available,
        showable: product.showable,
      });
    }
  }, [product]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nome é obrigatório';
    if (!form.description.trim()) e.description = 'Descrição é obrigatória';
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      e.price = 'Preço inválido';
    if (!form.categoryId) e.categoryId = 'Categoria é obrigatória';
    return e;
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const data = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      image:
        form.image.trim() ||
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
      categoryId: form.categoryId,
      available: form.available,
      showable: form.showable,
    };
    if (product) {
      updateProduct(product.id, data);
    } else {
      addProduct(data);
    }
    onClose();
  };

  const set = (key: string, value: string | boolean) =>
    setForm(prev => ({ ...prev, [key]: value }));

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center p-4'
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
      <div className='max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl transition-colors dark:bg-gray-900'>
        {/* Header */}
        <div className='flex items-center justify-between border-b border-gray-100 p-6 dark:border-gray-800'>
          <h2
            className='text-gray-800 dark:text-gray-100'
            style={{ fontFamily: 'Georgia, serif' }}>
            {product ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <button
            onClick={onClose}
            className='rounded-xl p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800'>
            <IC.X size={18} className='text-gray-500 dark:text-gray-400' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4 p-6'>
          {/* Image Preview */}
          {form.image && (
            <div className='h-40 w-full overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700'>
              <Image
                src={form.image}
                alt='preview'
                className='h-full w-full object-cover'
                width={400}
                height={300}
                loading="eager"
              />
            </div>
          )}

          {/* Name */}
          <div>
            <label className='mb-1 block text-sm text-gray-700 dark:text-gray-300'>
              Nome do produto *
            </label>
            <input
              type='text'
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder='Ex: Filé Mignon ao Molho Madeira'
              className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-amber-900/40'
            />
            {errors.name && (
              <p className='mt-1 text-xs text-red-500 dark:text-red-400'>
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className='mb-1 block text-sm text-gray-700 dark:text-gray-300'>
              Descrição *
            </label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder='Descreva os ingredientes e o preparo...'
              rows={3}
              className='w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-amber-900/40'
            />
            {errors.description && (
              <p className='mt-1 text-xs text-red-500 dark:text-red-400'>
                {errors.description}
              </p>
            )}
          </div>

          {/* Price + Category */}
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='mb-1 block text-sm text-gray-700 dark:text-gray-300'>
                Preço (R$) *
              </label>
              <input
                type='number'
                min='0'
                step='0.01'
                value={form.price}
                onChange={e => set('price', e.target.value)}
                placeholder='0,00'
                className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-amber-900/40'
              />
              {errors.price && (
                <p className='mt-1 text-xs text-red-500 dark:text-red-400'>
                  {errors.price}
                </p>
              )}
            </div>
            <div>
              <label className='mb-1 block text-sm text-gray-700 dark:text-gray-300'>
                Categoria *
              </label>
              <select
                value={form.categoryId}
                onChange={e => set('categoryId', e.target.value)}
                className='w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:focus:ring-amber-900/40'>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className='mt-1 text-xs text-red-500 dark:text-red-400'>
                  {errors.categoryId}
                </p>
              )}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className='mb-1 block text-sm text-gray-700 dark:text-gray-300'>
              URL da imagem
            </label>
            <div className='relative'>
              <IC.ImageIcon
                size={16}
                className='absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-400 dark:text-gray-500'
              />
              <input
                type='url'
                value={form.image}
                onChange={e => set('image', e.target.value)}
                placeholder='https://exemplo.com/imagem.jpg'
                className='w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pr-4 pl-10 transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-100 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:ring-amber-900/40'
              />
            </div>
            <p className='mt-1 text-xs text-gray-400 dark:text-gray-500'>
              Deixe em branco para usar imagem padrão
            </p>
          </div>

          {/* Availability */}
          <div className='flex items-center gap-3 pt-1'>
            <button
              type='button'
              onClick={() => set('available', !form.available)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                form.available ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}>
              <span
                className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  form.available ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <label className='text-sm text-gray-700 dark:text-gray-300'>
              {form.available
                ? 'Disponível no cardápio'
                : 'Indisponível (oculto)'}
            </label>
          </div>

          {/* Showability */}
          <div className='flex items-center gap-3 pt-1'>
            <button
              type='button'
              onClick={() => set('showable', !form.showable)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                form.showable ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}>
              <span
                className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  form.showable ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <label className='text-sm text-gray-700 dark:text-gray-300'>
              {form.showable ? 'Mostrar no cardápio' : 'Não Mostrar (oculto)'}
            </label>
          </div>

          {/* Actions */}
          <div className='flex gap-3 pt-2'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 rounded-xl border border-gray-200 py-2.5 text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800'>
              Cancelar
            </button>
            <button
              type='submit'
              className='flex-1 rounded-xl bg-amber-500 py-2.5 text-white shadow-md transition-colors hover:bg-amber-600'>
              {product ? 'Salvar alterações' : 'Adicionar produto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
