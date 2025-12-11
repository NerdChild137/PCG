import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();

  if (user) {
    setLocation("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      await loginMutation.mutateAsync({ username, password });
    } else {
      await registerMutation.mutateAsync({ username, password });
    }
    setLocation("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(215,28%,17%)] to-[hsl(215,28%,10%)] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        <div className="text-white space-y-6">
          <h1 className="text-5xl font-bold">Peters Consulting Group</h1>
          <p className="text-xl text-cyan-200">
            Admin Dashboard - Manage your website content, services, and branding
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">✓</div>
              <div>
                <h3 className="font-semibold">Edit Website Content</h3>
                <p className="text-sm text-gray-300">Update hero text, about section, and services</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">✓</div>
              <div>
                <h3 className="font-semibold">Customize Theme Colors</h3>
                <p className="text-sm text-gray-300">Change primary and accent colors to match your brand</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center flex-shrink-0">✓</div>
              <div>
                <h3 className="font-semibold">Real-Time Updates</h3>
                <p className="text-sm text-gray-300">See changes instantly on your live website</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{isLogin ? "Admin Login" : "Create Admin Account"}</CardTitle>
            <CardDescription>
              {isLogin 
                ? "Enter your credentials to access the dashboard" 
                : "Create an admin account to manage your website"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" data-testid="label-username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  data-testid="input-username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" data-testid="label-password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  data-testid="input-password"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loginMutation.isPending || registerMutation.isPending}
                data-testid="button-submit"
              >
                {isLogin ? "Login" : "Create Account"}
              </Button>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-foreground"
                data-testid="button-toggle-mode"
              >
                {isLogin ? "Need to create an account?" : "Already have an account?"}
              </button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
