import { useEffect, useState } from 'react';
import { BaseCrudService } from '@/integrations';
import { LibraryInformation, LibraryPhotos } from '@/entities';
import { Image } from '@/components/ui/image';
import { Calendar, MapPin, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

export default function AboutPageMalayalam() {
  const [libraryInfo, setLibraryInfo] = useState<LibraryInformation | null>(null);
  const [photos, setPhotos] = useState<LibraryPhotos[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { items: info } = await BaseCrudService.getAll<LibraryInformation>('libraryinformation');
      if (info.length > 0) {
        setLibraryInfo(info[0]);
      }
      
      const { items: photoItems } = await BaseCrudService.getAll<LibraryPhotos>('libraryphotos');
      setPhotos(photoItems);
    };
    
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="max-w-[100rem] mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-heading text-5xl font-bold text-primary mb-6">
              ഞങ്ങളുടെ ലൈബ്രറിയെ കുറിച്ച്
            </h1>
            <p className="font-paragraph text-lg text-primary mb-6">
              {libraryInfo?.content || 'ഞങ്ങളുടെ സമൂഹത്തിന്റെ ഒരു മൂലക്കല്ല്, ജ്ഞാനത്തിലേക്കുള്ള പ്രവേശനം നൽകാൻ, പഠനം പ്രോത്സാഹിപ്പിക്കാൻ, കൂടാതെ പുസ്തകങ്ങളുടെ ശക്തിയിലൂടെ ബന്ധങ്ങൾ സൃഷ്ടിക്കാൻ സമർപ്പിതമാണ്.'}
            </p>
            {libraryInfo?.dateEstablished && (
              <div className="flex items-center gap-2 font-paragraph text-base text-primary mb-4">
                <Calendar className="w-5 h-5" />
                <span>സ്ഥാപിതം: {format(new Date(libraryInfo.dateEstablished), 'MMMM d, yyyy')}</span>
              </div>
            )}
          </div>
          
          {libraryInfo?.mainImage && (
            <div className="rounded-3xl overflow-hidden">
              <Image
                src={libraryInfo.mainImage}
                alt="ലൈബ്രറി കെട്ടിടം"
                className="w-full h-full object-cover"
                width={800}
              />
            </div>
          )}
        </div>
      </section>

      {/* Mission and Vision */}
      {libraryInfo && (
        <section className="max-w-[100rem] mx-auto px-6 mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {libraryInfo.missionStatement && (
              <div className="bg-secondary rounded-3xl p-8">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  ഞങ്ങളുടെ ലക്ഷ്യം
                </h2>
                <p className="font-paragraph text-base text-primary leading-relaxed">
                  {libraryInfo.missionStatement}
                </p>
              </div>
            )}
            
            {libraryInfo.visionStatement && (
              <div className="bg-secondary rounded-3xl p-8">
                <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                  ഞങ്ങളുടെ ദൃഷ്ടി
                </h2>
                <p className="font-paragraph text-base text-primary leading-relaxed">
                  {libraryInfo.visionStatement}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Library Stats */}
      <section className="max-w-[100rem] mx-auto px-6 mt-20">
        <h2 className="font-heading text-4xl font-bold text-primary text-center mb-12">
          സംഖ്യകൾ വഴി
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-background rounded-2xl p-8 border-2 border-secondary">
            <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <p className="font-heading text-4xl font-bold text-primary mb-2">15,000+</p>
            <p className="font-paragraph text-base text-primary">സജീവ അംഗങ്ങൾ</p>
          </div>
          
          <div className="text-center bg-background rounded-2xl p-8 border-2 border-secondary">
            <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <p className="font-heading text-4xl font-bold text-primary mb-2">70+</p>
            <p className="font-paragraph text-base text-primary">സേവനത്തിന്റെ വർഷങ്ങൾ</p>
          </div>
          
          <div className="text-center bg-background rounded-2xl p-8 border-2 border-secondary">
            <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <p className="font-heading text-4xl font-bold text-primary mb-2">3</p>
            <p className="font-paragraph text-base text-primary">ശാഖ സ്ഥാനങ്ങൾ</p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {photos.length > 0 && (
        <section className="max-w-[100rem] mx-auto px-6 mt-20 mb-20">
          <h2 className="font-heading text-4xl font-bold text-primary mb-8">
            ഞങ്ങളുടെ സ്ഥലങ്ങൾ
          </h2>
          <p className="font-paragraph text-lg text-primary mb-8">
            ഞങ്ങളുടെ സുന്ദരമായ ലൈബ്രറി സൗകര്യങ്ങൾ കൂടാതെ സമൂഹ സ്ഥലങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <div
                key={photo._id}
                className="group rounded-2xl overflow-hidden bg-secondary/20 hover:shadow-lg transition-all"
              >
                {photo.photo && (
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={photo.photo}
                      alt={photo.photoTitle || 'ലൈബ്രറി ഫോട്ടോ'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      width={600}
                    />
                  </div>
                )}
                <div className="p-4">
                  {photo.photoTitle && (
                    <h3 className="font-heading text-lg font-bold text-primary mb-2">
                      {photo.photoTitle}
                    </h3>
                  )}
                  {photo.photoDescription && (
                    <p className="font-paragraph text-sm text-primary mb-2">
                      {photo.photoDescription}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 text-xs font-paragraph text-primary">
                    {photo.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {photo.location}
                      </span>
                    )}
                    {photo.dateTaken && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(photo.dateTaken), 'MMM yyyy')}
                      </span>
                    )}
                  </div>
                  {photo.photographer && (
                    <p className="font-paragraph text-xs text-primary mt-2 italic">
                      ഫോട്ടോ {photo.photographer} വഴി
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="max-w-[100rem] mx-auto px-6 mb-20">
        <div className="bg-primary rounded-3xl p-12 text-center">
          <h2 className="font-heading text-4xl font-bold text-primary-foreground mb-4">
            ഇന്ന് ഞങ്ങളെ സന്ദർശിക്കുക
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground mb-8 max-w-2xl mx-auto">
            ഞങ്ങളുടെ സമൂഹത്തിന്റെ ഊഷ്മത അനുഭവിക്കുക കൂടാതെ നിങ്ങൾക്കായി കാത്തിരിക്കുന്ന വിഭവങ്ങൾ കണ്ടെത്തുക
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-paragraph text-sm font-medium hover:bg-secondary/90 transition-colors"
            >
              ദിശാനിർദേശങ്ങൾ നേടുക
            </a>
            <a
              href="/catalog-ml"
              className="px-8 py-3 rounded-full bg-primary-foreground text-primary font-paragraph text-sm font-medium hover:bg-primary-foreground/90 transition-colors"
            >
              കാറ്റലോഗ് ബ്രൗസ് ചെയ്യുക
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
