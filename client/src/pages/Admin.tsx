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
import { SiteContent, SiteTheme, Resource } from "@shared/schema";
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

  const { data: resourcesList = [], isLoading: resourcesLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  const [heroHeadline, setHeroHeadline] = useState("");
  const [heroSubtext, setHeroSubtext] = useState("");
  const [aboutText, setAboutText] = useState<string[]>([]);
  const [services, setServices] = useState<{ title: string; description: string }[]>([]);
  const [primaryColor, setPrimaryColor] = useState("");
  const [accentColor, setAccentColor] = useState("");
  const [newResource, setNewResource] = useState({ title: "", description: "", imageUrl: "", linkUrl: "", linkText: "Learn More" });
  const [leadershipTitle, setLeadershipTitle] = useState("");
  const [leadershipSubtitle, setLeadershipSubtitle] = useState("");
  const [leadershipRole, setLeadershipRole] = useState("");
  const [expertiseTitle, setExpertiseTitle] = useState("");
  const [expertiseDescription, setExpertiseDescription] = useState("");
  const [transitTitle, setTransitTitle] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [footerDescription, setFooterDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    if (content) {
      setHeroHeadline(content.heroHeadline);
      setHeroSubtext(content.heroSubtext);
      setAboutText(content.aboutText || []);
      setServices(content.services || []);
      setLeadershipTitle(content.leadershipTitle || "");
      setLeadershipSubtitle(content.leadershipSubtitle || "");
      setLeadershipRole(content.leadershipRole || "");
      setExpertiseTitle(content.expertiseTitle || "");
      setExpertiseDescription(content.expertiseDescription || "");
      setTransitTitle(content.transitTitle || "");
      setContactTitle(content.contactTitle || "");
      setFooterDescription(content.footerDescription || "");
      setLogoUrl(content.logoUrl || "");
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
      leadershipTitle,
      leadershipSubtitle,
      leadershipRole,
      expertiseTitle,
      expertiseDescription,
      transitTitle,
      contactTitle,
      footerDescription,
      logoUrl: logoUrl || null,
    });
  };

  const handleSaveTheme = () => {
    updateThemeMutation.mutate({
      primaryColor,
      accentColor,
    });
  };

  const createResourceMutation = useMutation({
    mutationFn: async (data: typeof newResource) => {
      const res = await apiRequest("POST", "/api/resources", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resources"] });
      setNewResource({ title: "", description: "", imageUrl: "", linkUrl: "", linkText: "Learn More" });
      toast({ title: "Resource added", description: "New resource has been created." });
    },
  });

  const deleteResourceMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/resources/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resources"] });
      toast({ title: "Resource deleted" });
    },
  });

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
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="styles">Styles & Colors</TabsTrigger>
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
                  <Label>Leadership Bio Paragraphs</Label>
                  <p className="text-xs text-gray-500 mb-2">These paragraphs appear under the Leadership section with Demarcus Peters' photo</p>
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
                    <Plus className="mr-2 h-4 w-4" /> Add Bio Paragraph
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
                <CardTitle>Section Titles</CardTitle>
                <CardDescription>Edit section headers and descriptions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-gray-700 border-b pb-2">Leadership Section</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Section Label</Label>
                      <Input 
                        value={leadershipTitle}
                        onChange={(e) => setLeadershipTitle(e.target.value)}
                        placeholder="Leadership"
                        data-testid="input-leadership-title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input 
                        value={leadershipSubtitle}
                        onChange={(e) => setLeadershipSubtitle(e.target.value)}
                        placeholder="Demarcus Peters"
                        data-testid="input-leadership-subtitle"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Role/Title</Label>
                    <Input 
                      value={leadershipRole}
                      onChange={(e) => setLeadershipRole(e.target.value)}
                      placeholder="Director of Civil Rights Compliance"
                      data-testid="input-leadership-role"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-gray-700 border-b pb-2">Areas of Expertise Section</h4>
                  <div className="space-y-2">
                    <Label>Section Title</Label>
                    <Input 
                      value={expertiseTitle}
                      onChange={(e) => setExpertiseTitle(e.target.value)}
                      placeholder="Areas of Expertise"
                      data-testid="input-expertise-title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Section Description</Label>
                    <Textarea 
                      value={expertiseDescription}
                      onChange={(e) => setExpertiseDescription(e.target.value)}
                      placeholder="We engage our core capabilities..."
                      data-testid="input-expertise-description"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-gray-700 border-b pb-2">Other Sections</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Transit Section Title</Label>
                      <Input 
                        value={transitTitle}
                        onChange={(e) => setTransitTitle(e.target.value)}
                        placeholder="Transit Specific Practice"
                        data-testid="input-transit-title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Contact Section Title</Label>
                      <Input 
                        value={contactTitle}
                        onChange={(e) => setContactTitle(e.target.value)}
                        placeholder="Get in Touch"
                        data-testid="input-contact-title"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-sm text-gray-700 border-b pb-2">Footer</h4>
                  <div className="space-y-2">
                    <Label>Footer Description</Label>
                    <Textarea 
                      value={footerDescription}
                      onChange={(e) => setFooterDescription(e.target.value)}
                      placeholder="Peters Consulting Group provides expert guidance..."
                      data-testid="input-footer-description"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Custom Logo URL (optional)</Label>
                    <Input 
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://example.com/logo.png"
                      data-testid="input-logo-url"
                    />
                    <p className="text-xs text-gray-500">Leave empty to use the default logo</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  className="bg-primary" 
                  onClick={handleSaveContent}
                  disabled={updateContentMutation.isPending}
                  data-testid="button-save-section-titles"
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
              <CardFooter className="flex justify-end">
                <Button 
                  className="bg-primary" 
                  onClick={handleSaveContent}
                  disabled={updateContentMutation.isPending}
                  data-testid="button-save-services"
                >
                  {updateContentMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Resource</CardTitle>
                <CardDescription>Add resources with title, description, image, and link</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input 
                      value={newResource.title}
                      onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                      placeholder="Resource title"
                      data-testid="input-new-resource-title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Link Text</Label>
                    <Input 
                      value={newResource.linkText}
                      onChange={(e) => setNewResource({...newResource, linkText: e.target.value})}
                      placeholder="Learn More"
                      data-testid="input-new-resource-link-text"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={newResource.description}
                    onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                    placeholder="Resource description"
                    data-testid="input-new-resource-description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Image URL</Label>
                    <Input 
                      value={newResource.imageUrl}
                      onChange={(e) => setNewResource({...newResource, imageUrl: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                      data-testid="input-new-resource-image"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Link URL</Label>
                    <Input 
                      value={newResource.linkUrl}
                      onChange={(e) => setNewResource({...newResource, linkUrl: e.target.value})}
                      placeholder="https://example.com"
                      data-testid="input-new-resource-link"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => createResourceMutation.mutate(newResource)}
                  disabled={!newResource.title || !newResource.description || createResourceMutation.isPending}
                  data-testid="button-add-resource"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Resource
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Resources</CardTitle>
                <CardDescription>Manage your resources</CardDescription>
              </CardHeader>
              <CardContent>
                {resourcesList.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No resources yet. Add one above!</p>
                ) : (
                  <div className="space-y-4">
                    {resourcesList.map((resource) => (
                      <div key={resource.id} className="flex items-start gap-4 p-4 border rounded-lg" data-testid={`resource-item-${resource.id}`}>
                        {resource.imageUrl && (
                          <img src={resource.imageUrl} alt={resource.title} className="w-20 h-20 object-cover rounded" />
                        )}
                        <div className="flex-1">
                          <h4 className="font-bold">{resource.title}</h4>
                          <p className="text-sm text-gray-600">{resource.description}</p>
                          {resource.linkUrl && (
                            <a href={resource.linkUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
                              {resource.linkText || "Learn More"}
                            </a>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-red-500"
                          onClick={() => deleteResourceMutation.mutate(resource.id)}
                          data-testid={`button-delete-resource-${resource.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
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
