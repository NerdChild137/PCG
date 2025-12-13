import { MapPin, Phone, Mail, Linkedin } from "lucide-react";
import laImage from "@assets/stock_images/modern_los_angeles_s_26ee99cb.jpg";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left: Contact Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-8" data-testid="text-contact-title">Get in Touch</h2>
            
            <div className="space-y-10">
              {/* Pacific Northwest */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-accent mb-2">Pacific Northwest</h3>
                  <address className="not-italic text-gray-600 leading-relaxed mb-3">
                    3439 SE Hawthorne Blvd<br />
                    #956<br />
                    Portland, OR 97214<br />
                    United States
                  </address>
                </div>
              </div>

              {/* California */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-accent mb-2">California</h3>
                  <address className="not-italic text-gray-600 leading-relaxed mb-3">
                    960 - W 7th St.<br />
                    Suite 611<br />
                    Los Angeles, CA 90017
                  </address>
                  <a href="tel:+13232445247" className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors">
                    <Phone className="h-4 w-4" /> +1 (323) 244-5247
                  </a>
                </div>
              </div>

              {/* Email & LinkedIn */}
              <div className="flex gap-4 items-start pt-6 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-1">Email Us</h3>
                  <a href="mailto:Demarcus.Peters@pcgtransit.com" className="text-lg text-gray-600 hover:text-accent transition-colors">
                    Demarcus.Peters@pcgtransit.com
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Linkedin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-1">Connect on LinkedIn</h3>
                  <a href="https://www.linkedin.com/in/demarcuspeters" target="_blank" rel="noopener noreferrer" className="text-lg text-gray-600 hover:text-accent transition-colors" data-testid="link-linkedin">
                    Demarcus Peters
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map/Image */}
          <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg relative">
             <img src={laImage} alt="Los Angeles Skyline" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
             <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
               <p className="text-primary font-medium text-center">Serving clients nationwide with offices in Portland and Los Angeles.</p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
