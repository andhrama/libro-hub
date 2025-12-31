import { BookCatalog } from '@/entities';
import { Image } from '@/components/ui/image';
import { CheckCircle, XCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface BookDetailDialogProps {
  book: BookCatalog | null;
  open: boolean;
  onClose: () => void;
}

export default function BookDetailDialog({ book, open, onClose }: BookDetailDialogProps) {
  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle className="font-heading text-3xl font-bold text-primary">
            {book.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div>
            {book.coverImage && (
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-secondary/20">
                <Image
                  src={book.coverImage}
                  alt={book.title || 'Book cover'}
                  className="w-full h-full object-cover"
                  width={400}
                />
              </div>
            )}
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-lg font-bold text-primary mb-2">Author</h3>
              <p className="font-paragraph text-base text-primary">{book.author}</p>
            </div>
            
            {book.genre && (
              <div>
                <h3 className="font-heading text-lg font-bold text-primary mb-2">Genre</h3>
                <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-paragraph text-sm">
                  {book.genre}
                </span>
              </div>
            )}
            
            {book.isbn && (
              <div>
                <h3 className="font-heading text-lg font-bold text-primary mb-2">ISBN</h3>
                <p className="font-paragraph text-base text-primary">{book.isbn}</p>
              </div>
            )}
            
            <div>
              <h3 className="font-heading text-lg font-bold text-primary mb-2">Availability</h3>
              <div className="flex items-center gap-2">
                {book.isAvailable ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="font-paragraph text-base text-primary font-medium">Available for checkout</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-destructive" />
                    <span className="font-paragraph text-base text-destructive font-medium">Currently checked out</span>
                  </>
                )}
              </div>
            </div>
            
            {book.description && (
              <div>
                <h3 className="font-heading text-lg font-bold text-primary mb-2">Description</h3>
                <p className="font-paragraph text-base text-primary leading-relaxed">
                  {book.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
