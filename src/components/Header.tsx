import { Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  // Determine current language
  const currentPath = location.pathname;
  const isMLPage = currentPath.includes('-ml');
  
  // Get the corresponding language path
  const getLanguagePath = (targetLang: 'en' | 'ml') => {
    if (targetLang === 'en') {
      // Remove -ml suffix
      return currentPath.replace(/-ml$/, '').replace(/-ml\//, '/') || '/';
    } else {
      // Add -ml suffix
      if (currentPath === '/') return '/home-ml';
      return currentPath + '-ml';
    }
  };
  
  // Navigation labels based on language
  const navLabels = isMLPage ? {
    home: 'ഹോം',
    catalog: 'പുസ്തക കാറ്റലോഗ്',
    about: 'ലൈബ്രറിയെ കുറിച്ച്',
    libraryName: 'നദീതീര പൊതു ലൈബ്രറി'
  } : {
    home: 'Home',
    catalog: 'Book Catalog',
    about: 'About Library',
    libraryName: 'Riverside Public Library'
  };

  return (
    <header className="bg-background border-b border-primary/10">
      <div className="max-w-[120rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to={isMLPage ? '/home-ml' : '/'} className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-heading text-xl font-bold text-primary">
              {navLabels.libraryName}
            </span>
          </Link>
          
          <nav className="flex items-center gap-3">
            <Link
              to={isMLPage ? '/home-ml' : '/'}
              className={`px-5 py-2 rounded-full font-paragraph text-sm transition-colors ${
                (isMLPage ? isActive('/home-ml') : isActive('/'))
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-primary hover:bg-secondary'
              }`}
            >
              {navLabels.home}
            </Link>
            <Link
              to={isMLPage ? '/catalog-ml' : '/catalog'}
              className={`px-5 py-2 rounded-full font-paragraph text-sm transition-colors ${
                (isMLPage ? isActive('/catalog-ml') : isActive('/catalog'))
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-primary hover:bg-secondary'
              }`}
            >
              {navLabels.catalog}
            </Link>
            <Link
              to={isMLPage ? '/about-ml' : '/about'}
              className={`px-5 py-2 rounded-full font-paragraph text-sm transition-colors ${
                (isMLPage ? isActive('/about-ml') : isActive('/about'))
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-primary hover:bg-secondary'
              }`}
            >
              {navLabels.about}
            </Link>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-1 ml-4 pl-4 border-l border-primary/20">
              <Link
                to={getLanguagePath('en')}
                className={`px-3 py-2 rounded-full font-paragraph text-sm transition-colors ${
                  !isMLPage
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-transparent text-primary hover:bg-secondary'
                }`}
              >
                EN
              </Link>
              <Link
                to={getLanguagePath('ml')}
                className={`px-3 py-2 rounded-full font-paragraph text-sm transition-colors ${
                  isMLPage
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-transparent text-primary hover:bg-secondary'
                }`}
              >
                ML
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
