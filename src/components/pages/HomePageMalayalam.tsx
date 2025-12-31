// HPI 1.6-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BaseCrudService } from '@/integrations';
import { BookCatalog, LibraryInformation } from '@/entities';
import { Image } from '@/components/ui/image';
import { Search, BookOpen, CheckCircle, XCircle, ArrowRight, Clock, MapPin, Calendar } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Types ---
type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: string;
};

// --- Utility Components for Motion ---

const AnimatedElement: React.FC<ScrollRevealProps> = ({ children, className, threshold = 0.1, delay = '0ms' }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible');
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-1000 ease-out ${className || ''}`}
      style={{ transitionDelay: delay }}
    >
      <style>{`
        .is-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}</style>
      {children}
    </div>
  );
};

const ParallaxImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollProgress = 1 - (rect.bottom / (window.innerHeight + rect.height));
      // Only animate when in view
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        container.style.setProperty('--parallax-y', `${scrollProgress * 10}%`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div 
        className="w-full h-[120%] -mt-[10%] transition-transform duration-75 ease-linear will-change-transform"
        style={{ transform: 'translateY(var(--parallax-y, 0))' }}
      >
        <Image
          src={src}
          alt={alt}
          width={1920}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

// --- Main Component ---

export default function HomePageMalayalam() {
  const [featuredBooks, setFeaturedBooks] = useState<BookCatalog[]>([]);
  const [libraryInfo, setLibraryInfo] = useState<LibraryInformation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { items: books } = await BaseCrudService.getAll<BookCatalog>('bookcatalog');
        setFeaturedBooks(books.slice(0, 6));
        
        const { items: info } = await BaseCrudService.getAll<LibraryInformation>('libraryinformation');
        if (info.length > 0) {
          setLibraryInfo(info[0]);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    
    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/catalog-ml?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-background text-primary font-paragraph selection:bg-secondary selection:text-primary overflow-clip">
      <Header />

      {/* --- Hero Section: Malayalam Version --- */}
      <section className="relative w-full pt-32 pb-0 md:pt-48">
        <div className="w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          
          {/* Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24">
            <div className="lg:col-span-10 lg:col-start-1 relative z-10">
              <AnimatedElement>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-white/50 backdrop-blur-sm mb-8 hover:bg-secondary/30 transition-colors cursor-default">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-xs font-medium uppercase tracking-wider">പൊതു ലൈബ്രറി സിസ്റ്റം</span>
                </div>
              </AnimatedElement>

              <AnimatedElement delay="100ms">
                <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight text-primary mb-12">
                  ജ്ഞാനം <br />
                  <span className="italic font-serif text-secondary-foreground/80">വിതരണം</span> ചെയ്യുന്ന <br />
                  സമൂഹം
                </h1>
              </AnimatedElement>

              <AnimatedElement delay="200ms">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <form onSubmit={handleSearch} className="relative w-full max-w-md group">
                    <input
                      type="text"
                      placeholder="കാറ്റലോഗ് തിരയുക..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-14 pl-6 pr-14 rounded-full bg-white border border-primary/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-paragraph text-sm placeholder:text-primary/40 shadow-sm group-hover:shadow-md"
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-2 h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                      aria-label="തിരയുക"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </form>
                  
                  <Link 
                    to="/catalog-ml" 
                    className="group flex items-center gap-3 px-6 py-4 rounded-full border border-primary/20 hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <span className="font-medium">ശേഖരം ബ്രൗസ് ചെയ്യുക</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </AnimatedElement>
            </div>
          </div>

          {/* Full Bleed Hero Image */}
          <AnimatedElement delay="300ms" className="w-full h-[60vh] md:h-[80vh] rounded-t-[3rem] overflow-hidden relative">
             {libraryInfo?.mainImage ? (
                <ParallaxImage 
                  src={libraryInfo.mainImage} 
                  alt="ലൈബ്രറി പ്രധാന ഹാൾ" 
                  className="w-full h-full"
                />
             ) : (
                <ParallaxImage 
                  src="https://static.wixstatic.com/media/c0577e_579b9a30273144d0ab07d28c3f363ac5~mv2.png?originWidth=1920&originHeight=704" 
                  alt="ലൈബ്രറി പ്രധാന ഹാൾ" 
                  className="w-full h-full"
                />
             )}
             
             {/* Overlay Gradient */}
             <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent pointer-events-none" />
          </AnimatedElement>
        </div>
      </section>

      {/* --- Section 2: Mission & Vision (Sticky Layout) --- */}
      {libraryInfo && (
        <section className="w-full py-32 bg-white rounded-b-[3rem] relative z-20 -mt-12">
          <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
              
              {/* Sticky Left Column */}
              <div className="lg:col-span-5 relative">
                <div className="lg:sticky lg:top-32">
                  <AnimatedElement>
                    <span className="block text-xs font-bold uppercase tracking-widest text-primary/60 mb-6">ഞങ്ങളുടെ ലക്ഷ്യം</span>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
                      <span className="text-secondary-foreground/70 italic">കൗതുകം</span> കൂടാതെ ബന്ധം.
                    </h2>
                    <div className="w-24 h-1 bg-secondary mb-8"></div>
                    <p className="font-paragraph text-lg leading-relaxed text-primary/80 mb-8">
                      ജ്ഞാനത്തിലേക്കുള്ള പ്രവേശനം വഴി നമ്മുടെ സമൂഹത്തെ ശക്തിപ്പെടുത്തുന്നു, ജീവിതകാലം പഠനം പ്രോത്സാഹിപ്പിക്കുന്നു, കൂടാതെ കണ്ടെത്തലിനും ബന്ധത്തിനുമായി സമാവേശനകരമായ സ്ഥലങ്ങൾ സൃഷ്ടിക്കുന്നു.
                    </p>
                    <Link 
                      to="/about-ml"
                      className="inline-flex items-center text-sm font-bold uppercase tracking-wider border-b border-primary pb-1 hover:text-secondary-foreground/70 hover:border-secondary-foreground/70 transition-colors"
                    >
                      ഞങ്ങളുടെ ചരിത്രം വായിക്കുക
                    </Link>
                  </AnimatedElement>
                </div>
              </div>

              {/* Scrolling Right Column */}
              <div className="lg:col-span-7 flex flex-col gap-16 lg:pt-24">
                {/* Vision Card */}
                {libraryInfo.visionStatement && (
                  <AnimatedElement delay="100ms">
                    <div className="bg-background p-10 md:p-14 rounded-[2rem] border border-primary/5 hover:border-primary/20 transition-colors duration-500">
                      <BookOpen className="w-10 h-10 text-primary mb-6" />
                      <h3 className="font-heading text-2xl font-bold mb-4">ഞങ്ങളുടെ ദൃഷ്ടി</h3>
                      <p className="font-paragraph text-primary/70 leading-relaxed">
                        ഞങ്ങളുടെ സമൂഹത്തിന്റെ ഭാവിയിൽ ഞങ്ങൾ വിശ്വാസ് നിർമ്മിക്കുന്നു, ഓരോ വ്യക്തിയുടെയും സാധ്യതകൾ അനുഭവിക്കാൻ സഹായിക്കുന്നു.
                      </p>
                    </div>
                  </AnimatedElement>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatedElement delay="200ms">
                    <div className="bg-secondary/30 p-10 rounded-[2rem] h-full flex flex-col justify-between min-h-[240px] group hover:bg-secondary/50 transition-colors duration-500">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="font-heading font-bold text-lg">50k</span>
                      </div>
                      <div>
                        <h4 className="font-heading text-xl font-bold mb-2">ലഭ്യമായ പുസ്തകങ്ങൾ</h4>
                        <p className="text-sm opacity-70">ഭൌതിക കൂടാതെ ഡിജിറ്റൽ പകർപ്പുകൾ പരിശോധനയ്ക്കായി തയ്യാറാണ്.</p>
                      </div>
                    </div>
                  </AnimatedElement>

                  <AnimatedElement delay="300ms">
                    <div className="bg-primary text-white p-10 rounded-[2rem] h-full flex flex-col justify-between min-h-[240px] group">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-heading text-xl font-bold mb-2">24/7 പ്രവേശനം</h4>
                        <p className="text-sm opacity-70">ഡിജിറ്റൽ വിഭവങ്ങൾ ഏത് സമയത്തും, എവിടെയും ലഭ്യമാണ്.</p>
                      </div>
                    </div>
                  </AnimatedElement>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* --- Section 3: Featured Collection (Magazine Style) --- */}
      <section className="w-full py-32 bg-background border-t border-primary/5">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <AnimatedElement>
              <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4">തിരഞ്ഞെടുത്ത സംഗ്രഹം</h2>
              <p className="font-paragraph text-primary/60 max-w-md">
                ഞങ്ങളുടെ ലൈബ്രേരിയൻമാരുടെ കൈയിൽ തിരഞ്ഞെടുത്ത, സമീപകാല വരവുകൾ കൂടാതെ കാലാതീത ക്ലാസിക്കുകൾ അവതരിപ്പിക്കുന്നു.
              </p>
            </AnimatedElement>
            
            <AnimatedElement delay="100ms">
              <Link 
                to="/catalog-ml"
                className="px-8 py-3 rounded-full border border-primary hover:bg-primary hover:text-white transition-all duration-300 font-medium text-sm"
              >
                പൂർണ്ണ കാറ്റലോഗ് കാണുക
              </Link>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {featuredBooks.map((book, index) => (
              <AnimatedElement key={book._id} delay={`${index * 100}ms`}>
                <Link to={`/catalog-ml?book=${book._id}`} className="group block h-full">
                  <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-2xl bg-white shadow-sm group-hover:shadow-xl transition-all duration-500">
                    {book.coverImage ? (
                      <Image
                        src={book.coverImage}
                        alt={book.title || 'പുസ്തക കവർ'}
                        width={600}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary/20 text-primary/20">
                        <BookOpen className="w-20 h-20" />
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-8 text-center text-white">
                      <p className="font-paragraph text-sm mb-4 line-clamp-4">
                        {book.description || 'വിവരണം ലഭ്യമല്ല.'}
                      </p>
                      <span className="inline-block px-4 py-2 border border-white/30 rounded-full text-xs uppercase tracking-wider hover:bg-white hover:text-primary transition-colors">
                        വിശദാംശങ്ങൾ കാണുക
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                      {book.isAvailable ? (
                        <>
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-xs font-bold text-primary">ലഭ്യം</span>
                        </>
                      ) : (
                        <>
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span className="text-xs font-bold text-primary">പരിശോധിച്ചു</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-primary/50">{book.genre || 'സാധാരണ'}</span>
                      {book.isbn && <span className="text-xs font-mono text-primary/40">ISBN: {book.isbn.slice(-4)}</span>}
                    </div>
                    <h3 className="font-heading text-2xl font-bold leading-tight group-hover:text-secondary-foreground/70 transition-colors">
                      {book.title}
                    </h3>
                    <p className="font-paragraph text-sm text-primary/70">ഗ്രന്ഥകാരൻ: {book.author}</p>
                  </div>
                </Link>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 4: Services Bento Grid --- */}
      <section className="w-full py-32 bg-white rounded-t-[3rem]">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <AnimatedElement>
              <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6">പര്യവേക്ഷണം കൂടാതെ കണ്ടെത്തൽ</h2>
              <p className="font-paragraph text-lg text-primary/60">
                പുസ്തകങ്ങൾ കൂടാതെ കൂടുതൽ. ഞങ്ങൾ വളരാൻ, പഠിക്കാൻ, കൂടാതെ ബന്ധിപ്പിക്കാൻ നിങ്ങളെ സഹായിക്കുന്ന ഉപകരണങ്ങൾ കൂടാതെ സ്ഥലങ്ങൾ നൽകുന്നു.
              </p>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
            {/* Large Card Left */}
            <AnimatedElement className="md:col-span-2 h-full">
              <div className="relative h-full min-h-[400px] rounded-[2rem] overflow-hidden group bg-secondary/20">
                <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-between z-10">
                  <div>
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-6">
                      <Search className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4">വിപുലമായ കാറ്റലോഗ് തിരയൽ</h3>
                    <p className="font-paragraph text-primary/70 max-w-md">
                      വിഭാഗം, ഗ്രന്ഥകാരൻ, ലഭ്യത, കൂടാതെ കൂടുതൽ വഴി ഫിൽട്ടർ ചെയ്യുക നിങ്ങൾ നിമിഷങ്ങളിൽ തിരയുന്നത് കണ്ടെത്താൻ.
                    </p>
                  </div>
                  <div>
                    <Link 
                      to="/catalog-ml" 
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                    >
                      തിരയൽ ആരംഭിക്കുക <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                {/* Decorative Circle */}
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/40 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
              </div>
            </AnimatedElement>

            {/* Right Column Stack */}
            <div className="flex flex-col gap-6 h-full">
              <AnimatedElement delay="100ms" className="flex-1">
                <div className="h-full min-h-[280px] bg-background rounded-[2rem] p-10 flex flex-col justify-center items-center text-center border border-primary/5 hover:border-primary/20 transition-colors group">
                  <MapPin className="w-10 h-10 text-primary mb-4 group-hover:-translate-y-2 transition-transform duration-300" />
                  <h4 className="font-heading text-xl font-bold mb-2">ഞങ്ങളെ സന്ദർശിക്കുക</h4>
                  <p className="text-sm text-primary/60 mb-6">123 ലൈബ്രറി ലെയ്ൻ, നോളജ് സിറ്റി</p>
                  <Link to="/about-ml" className="text-xs font-bold uppercase tracking-wider border-b border-primary/20 pb-1 hover:border-primary transition-colors">
                    ദിശാനിർദേശങ്ങൾ നേടുക
                  </Link>
                </div>
              </AnimatedElement>

              <AnimatedElement delay="200ms" className="flex-1">
                <div className="h-full min-h-[280px] bg-primary text-white rounded-[2rem] p-10 flex flex-col justify-center items-center text-center group relative overflow-hidden">
                  <div className="relative z-10">
                    <Calendar className="w-10 h-10 text-secondary mb-4 mx-auto group-hover:rotate-12 transition-transform duration-300" />
                    <h4 className="font-heading text-xl font-bold mb-2">ഇവന്റുകൾ കൂടാതെ വർക്കുഷോപ്പുകൾ</h4>
                    <p className="text-sm text-white/70 mb-6">ഞങ്ങളുടെ സാപ്താഹിക വായന ഗ്രൂപ്പുകളിൽ ചേരുക.</p>
                    <Link to="/about-ml" className="text-xs font-bold uppercase tracking-wider border-b border-white/20 pb-1 hover:border-white transition-colors">
                      കലണ്ടർ കാണുക
                    </Link>
                  </div>
                  {/* Hover Effect Background */}
                  <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* --- Section 5: Newsletter / CTA --- */}
      <section className="w-full py-24 bg-secondary/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedElement>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6">ലൂപ്പിൽ തുടരുക</h2>
            <p className="font-paragraph text-primary/70 mb-10">
              പുതിയ വരവുകൾ, ഇവന്റ് അപ്ഡേറ്റുകൾ, കൂടാതെ ലൈബ്രറി വാർത്തകൾക്കായി ഞങ്ങളുടെ വാർത്താപത്രത്തിന് സബ്സ്ക്രൈബ് ചെയ്യുക.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="നിങ്ങളുടെ ഇമെയിൽ വിലാസം നൽകുക" 
                className="flex-1 px-6 py-4 rounded-full bg-white border border-transparent focus:border-primary focus:ring-0 outline-none"
              />
              <button 
                type="submit"
                className="px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                സബ്സ്ക്രൈബ് ചെയ്യുക
              </button>
            </form>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
