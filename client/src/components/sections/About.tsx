import { motion } from "framer-motion";
import photo from "@assets/Peters_Demarcus_edited.jpg_1765482002517.avif";
import { CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-accent font-bold tracking-wider uppercase mb-2 text-sm">Leadership</h4>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">Demarcus Peters</h2>
            <h3 className="text-xl text-primary/80 font-medium mb-8">Director of Civil Rights Compliance & Small Business Outreach</h3>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                Demarcus Peters leads the Civil Rights Compliance and Small Business Outreach team at Peters Consulting Group, bringing more than two decades of experience advancing access and opportunity in public infrastructure. He is a nationally respected expert in workforce development, supplier diversity, and compliance for megaprojects.
              </p>
              <p>
                Prior to founding Peters Consulting Group, Demarcus held senior leadership roles across the country, including with the City and County of Denver, LA Metro, MARTA, and Cincinnati Metro. He provided compliance oversight on major infrastructure projects totaling more than $1.6 billion.
              </p>
              <p>
                Demarcus holds a J.D. from Texas Southern University and a B.J. in Public Relations from the University of Texas at Austin. He is a SHRM-Certified Professional and longtime member of COMTO and APTA.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Contract Compliance",
                "Supplier Diversity",
                "Workforce Development",
                "Strategic Advisory"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-primary font-medium">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-sm mx-auto lg:mx-0"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              {/* Using the screenshot directly but styled nicely - in real app would crop the face */}
              <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                <img 
                  src={photo} 
                  alt="Demarcus Peters" 
                  className="w-full h-full object-cover object-top" 
                />
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-accent/20 rounded-2xl z-0" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary rounded-full blur-3xl opacity-50 z-0" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
