import { Link } from "wouter";
import { Lock } from "lucide-react";
import logo from "@assets/20251211_1108_PCG_Logo_PNG_remix_01kc7czf48fpqresdtpjd7vz6g_1765482517059.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
               <img src={logo} alt="PCG Transit" className="h-20 w-auto object-contain scale-110 origin-left" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Peters Consulting Group provides expert guidance in Civil Rights Compliance, 
              Small Business Outreach, and Transit Consulting Services.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#expertise" className="hover:text-white transition-colors">Expertise</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-accent">Locations</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Los Angeles, CA</li>
              <li>Atlanta, GA</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Peters Consulting Group. All rights reserved.
          </p>
          
          <Link href="/admin">
            <span className="flex items-center gap-2 text-xs text-gray-600 hover:text-accent transition-colors cursor-pointer">
              <Lock className="h-3 w-3" />
              Admin Login
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
