import IC from '@/utils/icons';

export function LogoPage() {
  return (
    <div className='relative px-4 text-center text-white'>
      <div className='mb-3 flex items-center justify-center gap-3'>
        <IC.ChefHat size={36} className='text-amber-400' />
        <h1
          className='text-4xl md:text-5xl'
          style={{
            fontFamily: 'Georgia, serif',
            letterSpacing: '0.05em',
          }}>
          Bella Cucina
        </h1>
      </div>
      <p className='text-lg text-amber-200'>
        Cardápio Digital · Sabores que encantam
      </p>
    </div>
  );
}
