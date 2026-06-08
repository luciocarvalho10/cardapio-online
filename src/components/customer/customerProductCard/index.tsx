import Image from "next/image";

import { IProduct } from "@/interfaces/IProduct";

type CustomerProductCardProps = {
  product: IProduct 
};

export function CustomerProductCard({ product }: CustomerProductCardProps) {
  return (
    <div className='group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-900/60 dark:hover:shadow-gray-900'>
      <div className='relative h-48 overflow-hidden'>
        <Image
          src={product.image}
          alt={product.name}
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
      </div>
      <div className='p-5'>
        <h3
          className='mb-1 text-gray-900 dark:text-gray-100'
          style={{ fontFamily: 'Georgia, serif' }}>
          {product.name}
        </h3>
        <p className='mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400'>
          {product.description}
        </p>
        <div className='flex items-center justify-between'>
          <span
            className='text-xl text-amber-600 dark:text-amber-400'
            style={{
              fontFamily: 'Georgia, serif',
            }}>
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          {product.showable ? (
            <span className='rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs text-green-600 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400'>
              Disponível
            </span>
          ) : (
            <span className='rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs text-red-600 dark:border-red-800 dark:bg-red-900/30 dark:text-red-400'>
              Indisponível
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
