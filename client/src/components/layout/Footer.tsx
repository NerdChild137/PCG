import { Link } from "wouter";
import { Lock, Linkedin } from "lucide-react";
import defaultLogo from "@assets/20251211_1108_PCG_Logo_PNG_remix_01kc7czf48fpqresdtpjd7vz6g_1765482517059.png";
import { useQuery } from "@tanstack/react-query";
import { SiteContent } from "@shared/schema";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: content } = useQuery<SiteContent>({
    queryKey: ["/api/content"],
  });

  const logoSrc = content?.logoUrl || defaultLogo;
  const footerDesc = content?.footerDescription || "Peters Consulting Group provides expert guidance in Small Business Outreach, Workforce Development, and Transit Consulting Services.";

  return (
    <footer className="bg-primary text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
               <img src={logoSrc} alt="PCG Transit" className="h-20 w-auto object-contain scale-110 origin-left" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {footerDesc}
            </p>
            <a href="https://www.linkedin.com/in/demarcuspeters" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-accent hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" /> LinkedIn
            </a>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-accent">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-accent">Pacific Northwest</h4>
            <address className="not-italic text-sm text-gray-400 leading-relaxed">
              3439 SE Hawthorne Blvd<br />
              #956<br />
              Portland, OR 97214<br />
              United States
            </address>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-accent">California</h4>
            <address className="not-italic text-sm text-gray-400 leading-relaxed">
              960 - W 7th St.<br />
              Suite 611<br />
              Los Angeles, CA 90017
            </address>
            <a href="tel:+13232445247" className="block mt-2 text-sm text-gray-400 hover:text-white transition-colors">
              +1 (323) 244-5247
            </a>
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
