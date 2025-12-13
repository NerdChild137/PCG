import { useQuery } from "@tanstack/react-query";
import { Resource } from "@shared/schema";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Resources() {
  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4" data-testid="text-resources-title">
              Resources
            </h1>
            <p className="text-gray-600 text-lg">
              Explore our collection of resources, guides, and helpful links.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No resources available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <Card key={resource.id} className="h-full flex flex-col" data-testid={`card-resource-${resource.id}`}>
                  {resource.imageUrl && (
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={resource.imageUrl} 
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <CardDescription className="text-gray-600 flex-1">
                      {resource.description}
                    </CardDescription>
                    {resource.linkUrl && (
                      <a 
                        href={resource.linkUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-4"
                      >
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          {resource.linkText || "Learn More"}
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
