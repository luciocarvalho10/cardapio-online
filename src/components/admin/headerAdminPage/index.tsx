import Logo from "../../logo";
import ThemeButton from "../../themeButton";
import { Link } from "react-router";
import IC from "../../icons";

type HeaderProps = {
  handleLogout: () => void;
};

export default function HeaderAdminPage({ handleLogout }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm dark:shadow-gray-900/50 sticky top-0 z-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Logo.LogoBar />

        <div className="flex items-center gap-1">
          {/* Dark mode toggle */}
          <ThemeButton.ThemeButtonBar />

          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
          >
            <IC.ExternalLink size={15} /> Ver cardápio
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <IC.LogOut size={15} /> Sair
          </button>
        </div>
      </div>
    </header>
  );
}
