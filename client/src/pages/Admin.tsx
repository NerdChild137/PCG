import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Loader2, Save, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { SiteContent, SiteTheme } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Admin() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();

  const { data: content, isLoading: contentLoading } = useQuery<SiteContent>({
    queryKey: ["/api/content"],
  });

  const { data: theme, isLoading: themeLoading } = useQuery<SiteTheme>({
    queryKey: ["/api/theme"],
  });

  const [heroHeadline, setHeroHeadline] = useState("");
  const [heroSubtext, setHeroSubtext] = useState("");
  const [aboutText, setAboutText] = useState<string[]>([]);
  const [services, setServices] = useState<{ title: string; description: string }[]>([]);
  const [primaryColor, setPrimaryColor] = useState("");
  const [accentColor, setAccentColor] = useState("");

  useEffect(() => {
    if (content) {
      setHeroHeadline(content.heroHeadline);
      setHeroSubtext(content.heroSubtext);
      setAboutText(content.aboutText || []);
      setServices(content.services || []);
    }
  }, [content]);

  useEffect(() => {
    if (theme) {
      setPrimaryColor(theme.primaryColor);
      setAccentColor(theme.accentColor);
    }
  }, [theme]);

  const updateContentMutation = useMutation({
    mutationFn: async (data: Partial<SiteContent>) => {
      const res = await apiRequest("PUT", "/api/content", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      toast({
        title: "Content updated",
        description: "Your changes have been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update content. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateThemeMutation = useMutation({
    mutationFn: async (data: Partial<SiteTheme>) => {
      const res = await apiRequest("PUT", "/api/theme", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/theme"] });
      toast({
        title: "Theme updated",
        description: "Your color changes have been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update theme. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSaveContent = () => {
    updateContentMutation.mutate({
      heroHeadline,
      heroSubtext,
      aboutText,
      services,
    });
  };

  const handleSaveTheme = () => {
    updateThemeMutation.mutate({
      primaryColor,
      accentColor,
    });
  };

  if (contentLoading || themeLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-primary">PCG Admin</h1>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Live Mode</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => window.open("/", "_blank")} data-testid="button-view-site">View Site</Button>
          <Button variant="destructive" size="sm" onClick={() => logoutMutation.mutate()} data-testid="button-logout">Log Out</Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="content" className="max-w-4xl mx-auto">
          <TabsList className="mb-8">
            <TabsTrigger value="content">Content Editor</TabsTrigger>
            <TabsTrigger value="styles">Styles & Colors</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Homepage Content</CardTitle>
                <CardDescription>Edit text and images on the main page</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-headline">Hero Headline</Label>
                  <Input 
                    id="hero-headline"
                    value={heroHeadline}
                    onChange={(e) => setHeroHeadline(e.target.value)}
                    data-testid="input-hero-headline"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-subtext">Hero Subtext</Label>
                  <Textarea
                    id="hero-subtext"
                    value={heroSubtext}
                    onChange={(e) => setHeroSubtext(e.target.value)}
                    className="min-h-[80px]"
                    data-testid="input-hero-subtext"
                  />
                </div>
                <div className="space-y-2">
                  <Label>About Section Paragraphs</Label>
                  {aboutText.map((paragraph, i) => (
                    <div key={i} className="flex gap-2">
                      <Textarea
                        value={paragraph}
                        onChange={(e) => {
                          const newAboutText = [...aboutText];
                          newAboutText[i] = e.target.value;
                          setAboutText(newAboutText);
                        }}
                        className="min-h-[100px]"
                        data-testid={`input-about-${i}`}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500"
                        onClick={() => setAboutText(aboutText.filter((_, idx) => idx !== i))}
                        data-testid={`button-delete-about-${i}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => setAboutText([...aboutText, ""])}
                    data-testid="button-add-about"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Paragraph
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  className="bg-primary" 
                  onClick={handleSaveContent}
                  disabled={updateContentMutation.isPending}
                  data-testid="button-save-content"
                >
                  {updateContentMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Changes
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Services List</CardTitle>
                <CardDescription>Manage your areas of expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 space-y-2">
                          <Input 
                            placeholder="Service Title"
                            value={service.title}
                            onChange={(e) => {
                              const newServices = [...services];
                              newServices[i].title = e.target.value;
                              setServices(newServices);
                            }}
                            data-testid={`input-service-title-${i}`}
                          />
                          <Textarea
                            placeholder="Service Description"
                            value={service.description}
                            onChange={(e) => {
                              const newServices = [...services];
                              newServices[i].description = e.target.value;
                              setServices(newServices);
                            }}
                            className="min-h-[60px]"
                            data-testid={`input-service-description-${i}`}
                          />
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500"
                          onClick={() => setServices(services.filter((_, idx) => idx !== i))}
                          data-testid={`button-delete-service-${i}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={() => setServices([...services, { title: "", description: "" }])}
                    data-testid="button-add-service"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Service
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="styles">
             <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Customize the look and feel of your website (HSL format: hue saturation lightness)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="primary-color">Primary Color (Navy)</Label>
                     <div className="flex gap-2">
                       <div className="w-10 h-10 rounded border" style={{ backgroundColor: `hsl(${primaryColor})` }} />
                       <Input 
                         id="primary-color"
                         placeholder="215 28% 17%"
                         value={primaryColor}
                         onChange={(e) => setPrimaryColor(e.target.value)}
                         data-testid="input-primary-color"
                       />
                     </div>
                     <p className="text-xs text-gray-500">Example: 215 28% 17% for dark navy</p>
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="accent-color">Accent Color (Cyan)</Label>
                     <div className="flex gap-2">
                       <div className="w-10 h-10 rounded border" style={{ backgroundColor: `hsl(${accentColor})` }} />
                       <Input 
                         id="accent-color"
                         placeholder="180 100% 35%"
                         value={accentColor}
                         onChange={(e) => setAccentColor(e.target.value)}
                         data-testid="input-accent-color"
                       />
                     </div>
                     <p className="text-xs text-gray-500">Example: 180 100% 35% for cyan</p>
                   </div>
                 </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  className="bg-primary"
                  onClick={handleSaveTheme}
                  disabled={updateThemeMutation.isPending}
                  data-testid="button-save-theme"
                >
                  {updateThemeMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Update Theme
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
