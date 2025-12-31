import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="max-w-[120rem] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Location</h3>
            <div className="flex items-start gap-2 font-paragraph text-sm">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
              <p>
                425 Riverside Avenue<br />
                Springfield, ST 12345
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Contact</h3>
            <div className="space-y-2 font-paragraph text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <p>(555) 123-4567</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <p>info@riversidelibrary.org</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">Hours</h3>
            <div className="flex items-start gap-2 font-paragraph text-sm">
              <Clock className="w-4 h-4 mt-1 flex-shrink-0" />
              <div>
                <p>Monday - Friday: 9am - 8pm</p>
                <p>Saturday: 10am - 6pm</p>
                <p>Sunday: 12pm - 5pm</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading text-lg font-bold mb-4">About</h3>
            <p className="font-paragraph text-sm">
              Serving our community with knowledge, resources, and a passion for reading since 1952.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center font-paragraph text-sm">
          <p>&copy; {new Date().getFullYear()} Riverside Public Library. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
