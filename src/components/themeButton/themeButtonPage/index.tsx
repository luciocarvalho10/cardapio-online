import { useMenu } from '@/context/menu/useMenu';
import IC from '@/utils/icons';

export function ThemeButtonPage() {
  const { isDarkMode, toggleDarkMode } = useMenu();
  return (
    <button
      onClick={toggleDarkMode}
      className='absolute top-4 right-4 rounded-xl border border-white/20 bg-white/10 p-2.5 text-white backdrop-blur-sm transition-all hover:bg-white/20'
      title={isDarkMode ? 'Modo claro' : 'Modo escuro'}>
      {isDarkMode ? <IC.Sun size={18} /> : <IC.Moon size={18} />}
    </button>
  );
}
