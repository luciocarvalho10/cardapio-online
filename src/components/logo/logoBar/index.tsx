import IC from '@/utils/icons';

export function LogoBar() {
  return (
    <div className='flex items-center gap-3'>
      <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500'>
        <IC.ChefHat size={20} className='text-white' />
      </div>
      <div>
        <h1
          className='text-base leading-none text-gray-900 dark:text-gray-100'
          style={{ fontFamily: 'Georgia, serif' }}>
          Bella Cucina
        </h1>
        <p className='text-xs text-gray-400 dark:text-gray-500'>Painel Admin</p>
      </div>
    </div>
  );
}
