import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { SiteContent } from "@shared/schema";
import heroImage from "@assets/stock_images/modern_public_transi_6a152490.jpg";

export default function Hero() {
  const { data: content } = useQuery<SiteContent>({
    queryKey: ["/api/content"],
  });

  const headline = content?.heroHeadline || "Advancing Access & Opportunity in Infrastructure";
  const subtext = content?.heroSubtext || "Specializing in Civil Rights Compliance, Small Business Outreach, and Workforce Development for major transit projects across the nation.";

  return (
    <div className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-90" />
      </div>

      <div className="container relative z-10 h-full mx-auto px-4 flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent border border-accent/30 text-sm font-semibold mb-6 backdrop-blur-sm">
            Peters Consulting Group
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight" data-testid="text-hero-headline">
            {headline}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed" data-testid="text-hero-subtext">
            {subtext}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold text-lg h-14 px-8" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Contact Us
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:text-white font-semibold text-lg h-14 px-8" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
              Learn More <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
