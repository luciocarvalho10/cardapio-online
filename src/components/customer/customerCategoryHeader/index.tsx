import { ICategory } from "@/interfaces/ICategory";

type CustomerCategoryHeaderProps = { category: Pick<ICategory, 'name' | 'icon'> };

export function CustomerCategoryHeader({
  category,
}: CustomerCategoryHeaderProps) {
  return (
    <div className='mb-6 flex items-center gap-3'>
      <span className='text-3xl'>{category.icon}</span>
      <div>
        <h2
          className='text-2xl text-gray-800 dark:text-gray-100'
          style={{ fontFamily: 'Georgia, serif' }}>
          {category.name}
        </h2>
        <div className='mt-1 h-0.5 w-16 bg-amber-400' />
      </div>
    </div>
  );
}
