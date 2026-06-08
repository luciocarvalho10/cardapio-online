import Logo from '@/components/logo';
import ThemeButton from '@/components/themeButton';

export function Banner() {
  return (
    <div
      className='relative flex h-64 items-center justify-center overflow-hidden md:h-80'
      style={{
        background:
          'linear-gradient(135deg, #1a0a00 0%, #5c2a00 50%, #b85c00 100%)',
      }}>
      <div
        className='absolute inset-0 opacity-20'
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, #ff9500 0%, transparent 50%), radial-gradient(circle at 80% 20%, #ff6b00 0%, transparent 40%)',
        }}
      />
      <Logo.LogoPage />

      {/* Dark mode toggle */}
      <ThemeButton.ThemeButtonPage />
    </div>
  );
}
