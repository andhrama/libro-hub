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
  
  return (
    <header className="bg-background border-b border-primary/10">
      <div className="max-w-[120rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <span className="font-heading text-xl font-bold text-primary">
              Riverside Public Library
            </span>
          </Link>
          
          <nav className="flex items-center gap-3">
            <Link
              to="/"
              className={`px-5 py-2 rounded-full font-paragraph text-sm transition-colors ${
                isActive('/')
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-primary hover:bg-secondary'
              }`}
            >
              Home
            </Link>
            <Link
              to="/catalog"
              className={`px-5 py-2 rounded-full font-paragraph text-sm transition-colors ${
                isActive('/catalog')
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-primary hover:bg-secondary'
              }`}
            >
              Book Catalog
            </Link>
            <Link
              to="/about"
              className={`px-5 py-2 rounded-full font-paragraph text-sm transition-colors ${
                isActive('/about')
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-primary hover:bg-secondary'
              }`}
            >
              About Library
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
