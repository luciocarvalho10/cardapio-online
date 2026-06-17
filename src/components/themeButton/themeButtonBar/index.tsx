import { useMenu } from '@/context/menu/useMenu';
import IC from '@/utils/icons';

export function ThemeButtonBar() {
  const { isDarkMode, toggleDarkMode } = useMenu();
  return (
    <button
      onClick={toggleDarkMode}
      className='rounded-lg p-2 text-gray-500 transition-colors hover:bg-amber-50 hover:text-amber-500 dark:text-gray-400 dark:hover:bg-amber-900/20 dark:hover:text-amber-400'
      title={isDarkMode ? 'Modo claro' : 'Modo escuro'}>
      {isDarkMode ? <IC.Sun size={18} /> : <IC.Moon size={18} />}
    </button>
  );
}
