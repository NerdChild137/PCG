import { Link } from "wouter";
import { useState, useEffect } from "react";
import logo from "@assets/20251211_1108_PCG_Logo_PNG_remix_01kc7czf48fpqresdtpjd7vz6g_1765480589847.png";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Expertise", href: "#expertise" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-2">
             <div className="relative h-12 w-auto overflow-hidden rounded bg-slate-900/90 px-2 py-1">
               <img src={logo} alt="PCG Transit" className="h-full w-auto object-contain" />
             </div>
             <span className={`text-xl font-heading font-bold tracking-tight ${isScrolled ? "text-primary" : "text-white"}`}>
               PCG<span className="text-accent">transit</span>
             </span>
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                isScrolled ? "text-primary" : "text-white/90"
              }`}
            >
              {link.name}
            </button>
          ))}
          <Button 
            className="bg-accent hover:bg-accent/90 text-white font-bold"
            onClick={() => scrollToSection("#contact")}
          >
            Get in Touch
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isScrolled ? "text-primary" : "text-white"}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="text-lg font-medium text-left hover:text-accent"
                  >
                    {link.name}
                  </button>
                ))}
                <Button className="w-full bg-accent hover:bg-accent/90">Get in Touch</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
