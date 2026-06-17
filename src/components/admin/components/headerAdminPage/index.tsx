import Link from 'next/link';

import Logo from '@/components/logo';
import ThemeButton from '@/components/themeButton';
import IC from '@/utils/icons';

type HeaderProps = {
  handleLogout: () => void;
};

export default function HeaderAdminPage({ handleLogout }: HeaderProps) {
  return (
    <header className='sticky top-0 z-20 border-b border-gray-100 bg-white shadow-sm transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-900/50'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3'>
        <Logo.LogoBar />

        <div className='flex items-center gap-1'>
          {/* Dark mode toggle */}
          <ThemeButton.ThemeButtonBar />

          <Link
            href='/'
            className='flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-amber-50 hover:text-amber-600 dark:text-gray-400 dark:hover:bg-amber-900/20 dark:hover:text-amber-400'>
            <IC.ExternalLink size={15} /> Ver cardápio
          </Link>
          <button
            onClick={handleLogout}
            className='flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'>
            <IC.LogOut size={15} /> Sair
          </button>
        </div>
      </div>
    </header>
  );
}
