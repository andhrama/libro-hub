import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { BookCatalog } from '@/entities';
import { Image } from '@/components/ui/image';
import { Search, Filter, CheckCircle, XCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookDetailDialog from '@/components/BookDetailDialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CatalogPageMalayalam() {
  const [books, setBooks] = useState<BookCatalog[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BookCatalog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [selectedBook, setSelectedBook] = useState<BookCatalog | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const { items } = await BaseCrudService.getAll<BookCatalog>('bookcatalog');
      setBooks(items);
      setFilteredBooks(items);
      
      // Extract unique genres
      const uniqueGenres = Array.from(new Set(items.map(book => book.genre).filter(Boolean))) as string[];
      setGenres(uniqueGenres);
    };
    
    fetchBooks();
    
    // Check for URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    const bookParam = urlParams.get('book');
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    if (bookParam) {
      // Open book detail dialog
      setTimeout(async () => {
        const book = await BaseCrudService.getById<BookCatalog>('bookcatalog', bookParam);
        if (book) {
          setSelectedBook(book);
          setIsDialogOpen(true);
        }
      }, 500);
    }
  }, []);

  useEffect(() => {
    let filtered = books;
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(book => 
        book.title?.toLowerCase().includes(query) ||
        book.author?.toLowerCase().includes(query) ||
        book.genre?.toLowerCase().includes(query) ||
        book.description?.toLowerCase().includes(query)
      );
    }
    
    // Filter by genre
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(book => book.genre === selectedGenre);
    }
    
    // Filter by availability
    if (selectedAvailability === 'available') {
      filtered = filtered.filter(book => book.isAvailable === true);
    } else if (selectedAvailability === 'unavailable') {
      filtered = filtered.filter(book => book.isAvailable === false);
    }
    
    setFilteredBooks(filtered);
  }, [searchQuery, selectedGenre, selectedAvailability, books]);

  const handleBookClick = (book: BookCatalog) => {
    setSelectedBook(book);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    // Clear URL parameter
    const url = new URL(window.location.href);
    url.searchParams.delete('book');
    window.history.replaceState({}, '', url.toString());
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="max-w-[100rem] mx-auto px-6 mt-12">
        <h1 className="font-heading text-5xl font-bold text-primary mb-4">
          പുസ്തക കാറ്റലോഗ്
        </h1>
        <p className="font-paragraph text-lg text-primary">
          ഞങ്ങളുടെ പൂർണ്ണ പുസ്തക സംഗ്രഹം ബ്രൗസ് ചെയ്യുക
        </p>
      </section>

      {/* Search and Filters */}
      <section className="max-w-[100rem] mx-auto px-6 mt-8">
        <div className="bg-secondary/30 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <input
                  type="text"
                  placeholder="പേര്, ഗ്രന്ഥകാരൻ, അല്ലെങ്കിൽ വിഭാഗം വഴി തിരയുക..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-full font-paragraph text-base text-primary bg-background border-2 border-transparent focus:border-secondary focus:outline-none"
                />
              </div>
            </div>
            
            {/* Genre Filter */}
            <div>
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="w-full rounded-full bg-background border-2 border-transparent focus:border-secondary font-paragraph">
                  <SelectValue placeholder="എല്ലാ വിഭാഗങ്ങൾ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">എല്ലാ വിഭാഗങ്ങൾ</SelectItem>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Availability Filter */}
            <div>
              <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                <SelectTrigger className="w-full rounded-full bg-background border-2 border-transparent focus:border-secondary font-paragraph">
                  <SelectValue placeholder="എല്ലാ പുസ്തകങ്ങൾ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">എല്ലാ പുസ്തകങ്ങൾ</SelectItem>
                  <SelectItem value="available">ലഭ്യമായ മാത്രം</SelectItem>
                  <SelectItem value="unavailable">പരിശോധിച്ചു</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2 font-paragraph text-sm text-primary">
            <Filter className="w-4 h-4" />
            <span>{filteredBooks.length} പുസ്തകങ്ങൾ കാണിക്കുന്നു {books.length} ൽ നിന്ന്</span>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="max-w-[100rem] mx-auto px-6 mt-8 mb-20">
        {filteredBooks.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-paragraph text-lg text-primary">
              നിങ്ങളുടെ മാനദണ്ഡങ്ങൾ പൂരിപ്പിക്കുന്ന പുസ്തകങ്ങൾ കണ്ടെത്തിയില്ല.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                onClick={() => handleBookClick(book)}
                className="group cursor-pointer bg-background rounded-2xl overflow-hidden border-2 border-transparent hover:border-secondary transition-all hover:shadow-lg"
              >
                <div className="aspect-[3/4] overflow-hidden bg-secondary/20">
                  {book.coverImage && (
                    <Image
                      src={book.coverImage}
                      alt={book.title || 'പുസ്തക കവർ'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      width={300}
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-base font-bold text-primary mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="font-paragraph text-sm text-primary mb-2 line-clamp-1">
                    {book.author}
                  </p>
                  {book.genre && (
                    <span className="inline-block px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-paragraph text-xs mb-2">
                      {book.genre}
                    </span>
                  )}
                  <div className="flex items-center gap-1 mt-2">
                    {book.isAvailable ? (
                      <>
                        <CheckCircle className="w-3 h-3 text-primary" />
                        <span className="font-paragraph text-xs text-primary">ലഭ്യം</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 text-destructive" />
                        <span className="font-paragraph text-xs text-destructive">പരിശോധിച്ചു</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <BookDetailDialog
        book={selectedBook}
        open={isDialogOpen}
        onClose={handleCloseDialog}
      />

      <Footer />
    </div>
  );
}
