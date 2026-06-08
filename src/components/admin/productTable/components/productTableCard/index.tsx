import Image from "next/image";

import { IProduct } from "@/interfaces/IProduct";

type ProductTableCardProps = {
  product: Pick<IProduct, 'name' | 'description' | 'price' | 'image'> 
};

export function ProductTableCard({ product }: ProductTableCardProps) {
  return (
    <div className='flex items-center gap-3 [640px]:hidden'>
      <div className='h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700'>
        <Image
          src={product.image}
          alt={product.name}
          className='h-full w-full object-cover'
        />
      </div>
      <div>
        <p className='text-sm text-gray-800 dark:text-gray-200'>
          {product.name}
        </p>
        <p className='line-clamp-1 max-w-48 text-xs text-gray-400 dark:text-gray-500'>
          {product.description}
        </p>
      </div>
    </div>
  );
}
