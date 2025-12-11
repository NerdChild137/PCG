import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "wouter";
import { ArrowLeft, Lock, Loader2, Save, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      toast({
        title: "Welcome back",
        description: "You have successfully logged in to the admin dashboard.",
      });
    }, 1500);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-none">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-primary">Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the editor</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="admin@pcgtransit.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <Link href="/">
              <a className="text-sm text-gray-500 hover:text-primary flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" /> Back to Website
              </a>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Admin Dashboard View (Mock)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-primary">PCG Admin</h1>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Live Mode</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => window.open("/", "_blank")}>View Site</Button>
          <Button variant="destructive" size="sm" onClick={() => setIsLoggedIn(false)}>Log Out</Button>
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
                  <Label>Hero Headline</Label>
                  <Input defaultValue="Advancing Access & Opportunity in Infrastructure" />
                </div>
                <div className="space-y-2">
                  <Label>Hero Subtext</Label>
                  <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" defaultValue="Specializing in Civil Rights Compliance, Small Business Outreach, and Workforce Development for major transit projects across the nation." />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-primary"><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Services List</CardTitle>
                <CardDescription>Manage your areas of expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Contract Compliance",
                    "EEO / Human Resources",
                    "Supplier Diversity",
                    "Workforce Diversity"
                  ].map((service, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input defaultValue={service} />
                      <Button variant="ghost" size="icon" className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-2"><Plus className="mr-2 h-4 w-4" /> Add Service</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="styles">
             <Card>
              <CardHeader>
                <CardTitle>Theme Settings</CardTitle>
                <CardDescription>Customize the look and feel of your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <Label>Primary Color (Navy)</Label>
                     <div className="flex gap-2">
                       <div className="w-10 h-10 rounded border bg-[#1f3a53]" />
                       <Input defaultValue="#1F3A53" />
                     </div>
                   </div>
                   <div className="space-y-2">
                     <Label>Accent Color (Cyan)</Label>
                     <div className="flex gap-2">
                       <div className="w-10 h-10 rounded border bg-[#00B2B2]" />
                       <Input defaultValue="#00B2B2" />
                     </div>
                   </div>
                 </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button className="bg-primary"><Save className="mr-2 h-4 w-4" /> Update Theme</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
