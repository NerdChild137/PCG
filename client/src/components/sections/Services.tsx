import { motion } from "framer-motion";
import { 
  Scale, 
  Users, 
  Briefcase, 
  RefreshCcw, 
  Megaphone, 
  TrainFront,
  FileCheck,
  Building2,
  Gavel
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Contract Compliance",
    icon: FileCheck,
    description: "Ensuring adherence to regulatory requirements and contract stipulations."
  },
  {
    title: "EEO / HR Investigations",
    icon: Users,
    description: "Conducting thorough investigations and training for human resources and equal opportunity."
  },
  {
    title: "Supplier Diversity",
    icon: Briefcase,
    description: "Creating meaningful opportunities for small, disadvantaged, and women-owned businesses."
  },
  {
    title: "Workforce Diversity",
    icon: Users,
    description: "Strategies to increase minority participation in federal contracting programs."
  },
  {
    title: "Change Management",
    icon: RefreshCcw,
    description: "Guiding organizations through structural and cultural transitions."
  },
  {
    title: "PR / Media Relations",
    icon: Megaphone,
    description: "Managing public perception and communication strategies for major projects."
  }
];

const transitPractice = [
  { title: "Sub-Recipient Monitoring", icon: Scale },
  { title: "Civil Rights Policy", icon: Gavel },
  { title: "Consultative Process", icon: Users },
  { title: "49 CFR § 21 (Title VI)", icon: Scale },
  { title: "49 CFR § 26 (DBE)", icon: Building2 },
  { title: "Title VII (EEO)", icon: Users },
  { title: "Airport Concessions", icon: TrainFront }, // using TrainFront as generic transit/transport icon
];

export default function Services() {
  return (
    <section id="expertise" className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Areas of Expertise</h2>
          <p className="text-gray-600">
            We engage our core capabilities to deliver equitable outcomes for local communities and businesses.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 text-accent">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Transit Specific Section */}
        <div className="bg-primary rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <TrainFront className="h-8 w-8 text-accent" />
              <h3 className="text-2xl md:text-3xl font-bold">Transit Specific Practice</h3>
            </div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {transitPractice.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3 hover:bg-white/20 transition-colors"
                >
                  <item.icon className="h-5 w-5 text-accent shrink-0" />
                  <span className="font-medium text-sm">{item.title}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

      </div>
    </section>
  );
}
