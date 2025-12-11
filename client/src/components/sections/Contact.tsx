import { MapPin, Phone, Mail } from "lucide-react";
import laImage from "@assets/stock_images/modern_los_angeles_s_26ee99cb.jpg";

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Left: Contact Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-8">Get in Touch</h2>
            
            <div className="space-y-10">
              {/* California */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-accent mb-2">California (Corporate)</h3>
                  <address className="not-italic text-gray-600 leading-relaxed mb-3">
                    555 South Flower Street<br />
                    51st Floor<br />
                    Los Angeles, CA 90071
                  </address>
                  <a href="tel:2136346846" className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors">
                    <Phone className="h-4 w-4" /> 213.634.6846
                  </a>
                </div>
              </div>

              {/* Georgia */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-accent mb-2">Georgia</h3>
                  <address className="not-italic text-gray-600 leading-relaxed mb-3">
                    2141 Manchester Court<br />
                    Atlanta, GA 30122
                  </address>
                  <a href="tel:4048084950" className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors">
                    <Phone className="h-4 w-4" /> 404.808.4950
                  </a>
                </div>
              </div>

              {/* Email */}
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
            </div>
          </div>

          {/* Right: Map/Image */}
          <div className="h-full min-h-[400px] rounded-2xl overflow-hidden shadow-lg relative">
             <img src={laImage} alt="Los Angeles Skyline" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
             <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg">
               <p className="text-primary font-medium text-center">Serving clients nationwide with hubs in Los Angeles and Atlanta.</p>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
