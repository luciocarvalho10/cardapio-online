import Image from 'next/image';

import { ICategory } from '@/interfaces/ICategory';
import { IProduct } from '@/interfaces/IProduct';
import IC from '@/utils/icons';

import { ButtonTable } from '../buttonTable';

type ProductCardProps = {
  cat?: Omit<ICategory, 'order'> | undefined;
  productCard: IProduct;
  toggleShowable: (product: IProduct) => void;
  toggleAvailable: (product: IProduct) => void;
  openEdit: (product: IProduct) => void;
  handleDelete: (id: string) => void;
  deleteConfirm: boolean;
};

export function ProductCard({
  cat,
  productCard,
  toggleShowable,
  toggleAvailable,
  openEdit,
  handleDelete,
  deleteConfirm,
}: ProductCardProps) {
  return (
    <div className='group flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg md:hidden dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-900/60 dark:hover:shadow-gray-900'>
      <div className='flex flex-col items-center gap-3 p-2'>
        <div className='h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700'>
          <Image
            src={productCard.image}
            alt={productCard.name}
            className='h-full w-full object-cover'
            width={400}
            height={300}
            loading="eager"
          />
        </div>
        {cat && (
          <div className='flex items-center gap-1'>
            <span className='text-sm text-gray-600 dark:text-gray-400'>
              {cat.icon}
            </span>
            <span className='text-sm text-gray-600 dark:text-gray-400'>
              {cat.name}
            </span>
          </div>
        )}
        <div
          className='text-sm text-amber-600 dark:text-amber-400'
          style={{
            fontFamily: 'Georgia, serif',
          }}>
          R$ {productCard.price.toFixed(2).replace('.', ',')}
        </div>
      </div>
      <div className='flex w-full flex-col items-center'>
        <div className='items-center'>
          <h3
            className='mb-1 text-center text-gray-900 dark:text-gray-100'
            style={{ fontFamily: 'Georgia, serif' }}>
            {productCard.name}
          </h3>
          <p className='mb-4 line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400'>
            {productCard.description}
          </p>
        </div>
        <div className='m-auto mb-0 flex w-full items-center justify-around'>
          <div className='mr-2 flex not-sm:flex-col'>
            <ButtonTable
              active={productCard.showable}
              onClick={() => toggleShowable(productCard)}
              activeLabel='Disponível'
              inactiveLabel='Indisponível'
              className='mr-2 mb-2'
            />

            <ButtonTable
              active={productCard.available}
              onClick={() => toggleAvailable(productCard)}
              activeLabel='Visível'
              inactiveLabel='Oculto'
              className='mb-2'
            />
          </div>

          <div className='flex items-center justify-end gap-1'>
            <button
              onClick={() => openEdit(productCard)}
              className='rounded-lg p-2 text-gray-400 transition-colors hover:bg-amber-50 hover:text-amber-500 dark:text-gray-500 dark:hover:bg-amber-900/20 dark:hover:text-amber-400'
              title='Editar'>
              <IC.Pencil size={15} />
            </button>
            <button
              onClick={() => handleDelete(productCard.id)}
              className={`rounded-lg p-2 transition-colors ${
                deleteConfirm
                  ? 'bg-red-500 text-white'
                  : 'text-gray-400 hover:bg-red-50 hover:text-red-500 dark:text-gray-500 dark:hover:bg-red-900/20 dark:hover:text-red-400'
              }`}
              title={deleteConfirm ? 'Confirmar exclusão' : 'Excluir'}>
              <IC.Trash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
